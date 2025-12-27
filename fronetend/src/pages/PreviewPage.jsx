import React, { useState, useContext, useRef, useEffect, useCallback } from 'react'
import { templates } from '../assets/assets';
import { AppContext } from '../context/AppContext.jsx';
import InvoicePreview from '../components/InvoicePreview.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { deleteInvoice, saveInvoice, sendInvoiceEmail } from '../service/invoiceService.js';
import html2canvas from 'html2canvas';
import { Loader2, Save, Trash2, ArrowLeft, Mail, Download, FileText, Check } from 'lucide-react';
import { uploadInvoiceThumbnail } from '../service/cloudinaryService.js';
import { generatePDFElement } from '../utils/PDFUtils.js';
import { useUser, useAuth } from '@clerk/clerk-react';

// Action Button Component
const ActionButton = ({ onClick, disabled, loading, icon: Icon, variant = 'primary', children }) => {
    const variants = {
        primary: 'btn-primary',
        danger: 'btn-danger',
        secondary: 'btn-outline-secondary',
        success: 'btn-success',
        info: 'btn-info'
    };

    return (
        <button
            className={`btn ${variants[variant]} d-flex align-items-center gap-2 px-4 py-2 shadow-sm`}
            style={{ 
                borderRadius: '10px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
            }}
            onClick={onClick}
            disabled={disabled || loading}
            onMouseEnter={(e) => {
                if (!disabled && !loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>{children}</span>
                </>
            ) : (
                <>
                    {Icon && <Icon size={18} />}
                    <span>{children}</span>
                </>
            )}
        </button>
    );
};

// Template Selector Component
const TemplateSelector = ({ templates, selectedTemplate, onSelect }) => (
    <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
        <div className="card-body p-3">
            <div className="d-flex align-items-center gap-2 mb-2">
                <FileText size={18} className="text-primary" />
                <h6 className="mb-0 fw-semibold">Choose Template</h6>
            </div>
            <div className="d-flex gap-2 flex-wrap">
                {templates.map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => onSelect(id)}
                        className={`btn btn-sm ${selectedTemplate === id ? 'btn-primary' : 'btn-outline-secondary'}`}
                        style={{
                            minWidth: '100px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {selectedTemplate === id && <Check size={14} className="me-1" />}
                        {label}
                    </button>
                ))}
            </div>
        </div>
    </div>
);


const PreviewPage = () => {
    const previewRef = useRef();
    const { selectedTemplate, invoiceData, setSelectedTemplate, baseUrl } = useContext(AppContext);
    
    const [loader, setLoader] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [emailing, setEmailing] = useState(false);
    
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { user } = useUser();

    const handleSaveAndExit = useCallback(async () => {
        try {
            setLoader(true);

            const canvas = await html2canvas(previewRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#fff",
                scrollY: -window.scrollY,
            });

            const imageData = canvas.toDataURL("image/png");
            const thumbnailUrl = await uploadInvoiceThumbnail(imageData);
            
            const payload = {
                ...invoiceData,
                clerkId: user.id,
                thumbnailUrl,
                template: selectedTemplate,
            };

            const token = await getToken();
            const response = await saveInvoice(baseUrl, payload, token);
        
            if (response.status === 200) {
                toast.success("Invoice saved successfully!");
                navigate('/dashboard');
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to save invoice.");
            console.error(error);
        } finally {
            setLoader(false);
        }
    }, [invoiceData, user, selectedTemplate, getToken, baseUrl, navigate]);

    const handleDelete = useCallback(async () => {
        if (!invoiceData.id) {
            toast.success("Invoice deleted successfully");
            navigate("/dashboard");
            return;
        }

        try {
            const token = await getToken();
            const response = await deleteInvoice(baseUrl, invoiceData.id, token);
            if (response.status === 204) {
                toast.success("Invoice deleted successfully");
                navigate("/dashboard");
            } else {
                toast.error("Failed to delete invoice. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to delete invoice");
            console.error(error);
        }
    }, [invoiceData.id, getToken, baseUrl, navigate]); 

    const handleDownloadPDF = useCallback(async () => {
        if (!previewRef.current) return;

        try {
            setDownloading(true);
            await generatePDFElement(previewRef.current, `invoice-${Date.now()}.pdf`);
            toast.success("PDF downloaded successfully!");
        } catch (error) {
            toast.error("Failed to download PDF");
            console.error(error);
        } finally {
            setDownloading(false);
        }
    }, []);

    const handleSendEmail = useCallback(async () => {
        if (!previewRef.current || !customerEmail) { 
            return toast.error("Please enter valid email and try again");
        }

        try {
            setEmailing(true);
            const pdfBlob = await generatePDFElement(previewRef.current, `invoice-${Date.now()}.pdf`, true);
            const formData = new FormData();
            formData.append("file", pdfBlob);
            formData.append("to", customerEmail);

            const token = await getToken();
            const response = await sendInvoiceEmail(baseUrl, formData, token);
            
            if (response.status === 200) {
                toast.success("Email sent successfully!");
                setShowModel(false);
                setCustomerEmail("");
            } else {
                toast.error("Failed to send email. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to send email");
            console.error(error);
        } finally {
            setEmailing(false);
        }
    }, [customerEmail, getToken, baseUrl]);

    useEffect(() => {
        if (!invoiceData || !invoiceData.items?.length) {
            toast.error("Invoice data is missing");
            navigate("/dashboard");
        }
    }, [invoiceData, navigate]);

    return (
        <div className="previewpage bg-light min-vh-100">
            <div className="container-fluid py-4" style={{ maxWidth: '1600px' }}>
                {/* Header Section */}
                <div className="mb-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
                        <div>
                            <h2 className="fw-bold mb-1">Invoice Preview</h2>
                            <p className="text-muted mb-0">Review and customize your invoice</p>
                        </div>
                        <ActionButton
                            onClick={() => navigate("/dashboard")}
                            icon={ArrowLeft}
                            variant="secondary"
                        >
                            Back to Dashboard
                        </ActionButton>
                    </div>
                </div>

                {/* Template Selector */}
                <div className="mb-4">
                    <TemplateSelector
                        templates={templates}
                        selectedTemplate={selectedTemplate}
                        onSelect={setSelectedTemplate}
                    />
                </div>

                {/* Action Buttons */}
                <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-3">
                        <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                            <ActionButton
                                onClick={handleSaveAndExit}
                                loading={loader}
                                icon={Save}
                                variant="primary"
                            >
                                {loader ? 'Saving...' : 'Save & Exit'}
                            </ActionButton>

                            <ActionButton
                                onClick={handleDownloadPDF}
                                loading={downloading}
                                icon={Download}
                                variant="success"
                            >
                                {downloading ? 'Downloading...' : 'Download PDF'}
                            </ActionButton>

                            <ActionButton
                                onClick={() => setShowModel(true)}
                                icon={Mail}
                                variant="info"
                            >
                                Send Email
                            </ActionButton>

                            {invoiceData.id && (
                                <ActionButton
                                    onClick={handleDelete}
                                    icon={Trash2}
                                    variant="danger"
                                >
                                    Delete
                                </ActionButton>
                            )}
                        </div>
                    </div>
                </div>

                {/* Invoice Preview */}
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div 
                            className="card border-0 shadow-sm p-4 bg-white"
                            style={{ 
                                borderRadius: '16px',
                                minHeight: '800px'
                            }}
                        >
                            <div 
                                ref={previewRef} 
                                className="invoice-preview d-flex justify-content-center"
                                style={{
                                    background: '#fff',
                                    minHeight: '1056px' // A4 aspect ratio
                                }}
                            >
                                <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Modal */}
                {showModel && (
                    <div 
                        className="modal d-block" 
                        tabIndex="-1" 
                        role="dialog" 
                        style={{ 
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(4px)'
                        }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowModel(false);
                            }
                        }}
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div 
                                className="modal-content border-0 shadow-lg" 
                                style={{ borderRadius: '16px' }}
                            >
                                <div className="modal-header border-0 pb-0">
                                    <div>
                                        <h5 className="modal-title fw-bold mb-1">Send Invoice via Email</h5>
                                        <p className="text-muted small mb-0">Enter recipient's email address</p>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setShowModel(false)}
                                    />
                                </div>
                                <div className="modal-body pt-3">
                                    <div className="mb-3">
                                        <label htmlFor="recipientEmail" className="form-label fw-medium small">
                                            Recipient Email
                                        </label>
                                        <input 
                                            type="email" 
                                            id="recipientEmail"
                                            className="form-control border-0 bg-light"
                                            style={{ 
                                                borderRadius: '10px',
                                                padding: '12px 16px'
                                            }}
                                            placeholder="customer@example.com" 
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer border-0 pt-0">
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary"
                                        style={{ borderRadius: '10px' }}
                                        onClick={() => setShowModel(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary d-flex align-items-center gap-2"
                                        style={{ borderRadius: '10px' }}
                                        onClick={handleSendEmail} 
                                        disabled={emailing || !customerEmail}
                                    >
                                        {emailing ? (
                                            <>
                                                <Loader2 className="animate-spin" size={18} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Mail size={18} />
                                                Send Invoice
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PreviewPage