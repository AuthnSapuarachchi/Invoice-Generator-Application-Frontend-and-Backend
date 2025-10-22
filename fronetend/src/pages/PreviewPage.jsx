import React, { useState, useContext, useRef, useEffect } from 'react'
import { templates } from '../assets/assets';
import { AppContext } from '../context/AppContext.jsx';
import InvoicePreview from '../components/InvoicePreview.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { deleteInvoice, saveInvoice, sendInvoiceEmail } from '../service/invoiceService.js';
import html2canvas from 'html2canvas';
import { Loader2 } from 'lucide-react';
import { uploadInvoiceThumbnail } from '../service/cloudinaryService.js';
import { generatePDFElement } from '../utils/PDFUtils.js';
import { useUser, useAuth } from '@clerk/clerk-react';


const PreviewPage = () => {
    const previewRef = useRef();
    const {selectedTemplate, invoiceData,setSelectedTemplate, baseUrl} = useContext(AppContext);
    
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const [downloading, setDownloading] = useState(false);

    const [showModel, setShowModel] = useState(false);

    const [customerEmail, setCustomerEmail] = useState("");

    const [emailing, setEmailing] = useState(false);

    const {getToken} = useAuth();

    const {user} = useUser();


    const handleSaveAndExit = async () => {
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
            }

            const token = await getToken();

            const response = await saveInvoice(baseUrl, payload, token);
        
            if (response.status === 200) {
                toast.success("Invoice saved successfully!");
                navigate('/dashboard');
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to save invoice.", error.message);
        } finally {
            setLoader(false);
        }
    }

    const handleDelete = async () => {
        if (!invoiceData.id){
            toast.success("Invoice deleted succesfully");
            navigate("/dashboard");
            return;
        }

        try {
            const token = await getToken();
            const response = await deleteInvoice(baseUrl, invoiceData.id, token);
            if (response.status === 204) {
                toast.success("Invoice deleted succesfully");
                navigate("/dashboard");
            } else {
                toast.error("Failed to delete invoice. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to delete invoice: " + error.message);
        }
    } 

    const handleDownloadPDF = async () => {
        if(!previewRef.current) return;

        try {
            setDownloading(true);
            await generatePDFElement(previewRef.current, `invoice-${Date.now()}.pdf`);
        } catch (error) {
            toast.error("Failed to download PDF: " + error.message);
        } finally {
            setDownloading(false);
        }

    }

    const handleSendEmail = async () => {
        if (!previewRef.current || !customerEmail) { 
            return toast.error("Please enter valid email and try again");;
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
            toast.error("Failed to send email: " + error.message);
        } finally {
            setEmailing(false);
        }

    }

    useEffect(() => {
        if (!invoiceData || !invoiceData.items?.length) {
            toast.error("Invoice data is missing");
            navigate("/dashboard");
        }
    }, [invoiceData, navigate]);

    
    return (
        <div className='previewpage container-fluid d-flex flex-column p-3 min-vh-100'>
            
            {/*Action buttons*/}
            <div className="d-flex flex-column align-items-center mb-4 gap-3">

                {/*List of templates button*/}
                <div className='d-flex gap-2 flex-wrap justify-content-center'>
                    {templates.map(({id, label}) => (
                        <button
                            key={id}
                            style={{minWidth: '100px', height: '38px'}}
                            onClick={() => setSelectedTemplate(id)}
                            className={`btn btn-sm rounded-pill p-2 ${selectedTemplate === id ? 'btn-warning' : 'btn-outline-secondary'}`}>
                            {label}
                        </button>
                    ))}
                </div>

                {/*list of action buttons*/}
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={handleSaveAndExit} disabled={loader}>
                        {loader && <span className="spinner-border spinner-animation me-2" size={18} role="status" aria-hidden="true"></span>}
                        {loader ? "Saving..." : "Save & Exit"}
                    </button>
                    {invoiceData.id && <button className="btn btn-danger " onClick={handleDelete}>Delete Invoice</button>}
                    <button className="btn btn-secondary " onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
                    <button className="btn btn-info " onClick={() => setShowModel(true)}>Send Email</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center" disabled={loader} onClick={handleDownloadPDF} >
                        {downloading && 
                            <Loader2 className="spinner-border spinner-animation me-2" size={18} role="status" aria-hidden="true" />}
                        {downloading ? "Downloading..." : "Download PDF"}
                    </button>
                </div>

                {/*Display the invoice Preview*/}
                <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-center bg-light">
                    
                    <div ref={previewRef} className="invoice-preview p-3" >
                        <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
                    </div>

                </div>

                {showModel && (
                    <div className="modal d-block" tabIndex="1" role='dialog' style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <div className="modal-dialog" role='document'>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Send Invoice</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModel(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <input type='email' className='form-control' placeholder='Enter recipient email' onChange={(e) => setCustomerEmail(e.target.value)} value={customerEmail} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleSendEmail} disabled={emailing}>
                                        {emailing ? "Sending..." : "Send"}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModel(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                            
                    </div>
                )}

            </div>

        </div>
    )
}

export default PreviewPage