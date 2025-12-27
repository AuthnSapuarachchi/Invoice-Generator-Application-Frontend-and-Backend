import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { AppContext, initialInvoiceData } from '../context/AppContext.jsx';
import { getAllInvoices } from '../service/invoiceService.js'; 
import { Plus, FileText, Clock, Search, LayoutGrid, List, Filter } from "lucide-react";
import toast from 'react-hot-toast';
import { formatDate } from '../utils/formatInvoiceData.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

// Invoice Card Component
const InvoiceCard = ({ invoice, onClick }) => (
    <div 
        className="card h-100 border-0 shadow-sm overflow-hidden"
        style={{ 
            borderRadius: '16px', 
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minHeight: '280px'
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
    >
        {invoice.thumbnailUrl ? (
            <div 
                style={{ 
                    height: '180px', 
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <img 
                    src={invoice.thumbnailUrl} 
                    alt='Invoice thumbnail' 
                    className='w-100 h-100'
                    style={{ objectFit: 'cover' }}
                />
                <div 
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.05) 100%)'
                    }}
                />
            </div>
        ) : (
            <div 
                className="d-flex align-items-center justify-content-center bg-light"
                style={{ height: '180px' }}
            >
                <FileText size={48} className="text-muted opacity-50" />
            </div>
        )}
        <div className='card-body p-3'>
            <h6 className='card-title mb-2 fw-semibold text-truncate'>{invoice.title}</h6>
            <div className="d-flex align-items-center gap-1 text-muted small">
                <Clock size={14} />
                <span>{formatDate(invoice.lastUpdatedAt)}</span>
            </div>
            <div className="mt-2">
                <span className="badge bg-light text-dark border" style={{ fontSize: '0.7rem' }}>
                    {invoice.invoice?.number || 'N/A'}
                </span>
            </div>
        </div>
    </div>
);

// Create New Card Component
const CreateNewCard = ({ onClick }) => (
    <div 
        className="card h-100 border-0 shadow-sm d-flex justify-content-center align-items-center"
        style={{ 
            borderRadius: '16px',
            cursor: 'pointer',
            minHeight: '280px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transition: 'all 0.3s ease'
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(102,126,234,0.4)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
    >
        <div className="text-center text-white p-4">
            <div 
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Plus size={40} strokeWidth={2.5} />
            </div>
            <h5 className="fw-bold mb-2">Create Invoice</h5>
            <p className="small mb-0 opacity-75">Start a new invoice</p>
        </div>
    </div>
);

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    
    const { baseUrl, setInvoiceData, setSelectedTemplate, setInvoiceTitle } = useContext(AppContext);
    const navigate = useNavigate();
    const { getToken } = useAuth();

    useEffect(() => {  
        const fetchInvoices = async () => {
            try {
                setIsLoading(true);
                const token = await getToken();
                const response = await getAllInvoices(baseUrl, token);
                setInvoices(response.data);
            } catch (error) {
                toast.error("Failed to fetch invoices");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchInvoices();
    }, [baseUrl, getToken]);

    const handleViewClick = useCallback((invoice) => {
        setInvoiceData(invoice);
        setSelectedTemplate(invoice.template || 'Template01');
        setInvoiceTitle(invoice.title || 'New Invoice');
        navigate('/preview');
    }, [setInvoiceData, setSelectedTemplate, setInvoiceTitle, navigate]);

    const handleCreateNew = useCallback(() => {
        setInvoiceTitle("New Invoice");
        setSelectedTemplate("Template01");
        setInvoiceData(initialInvoiceData);
        navigate('/generate');
    }, [setInvoiceTitle, setSelectedTemplate, setInvoiceData, navigate]);

    // Filter invoices based on search query
    const filteredInvoices = useMemo(() => {
        if (!searchQuery.trim()) return invoices;
        
        const query = searchQuery.toLowerCase();
        return invoices.filter(invoice => 
            invoice.title?.toLowerCase().includes(query) ||
            invoice.invoice?.number?.toLowerCase().includes(query) ||
            invoice.billing?.name?.toLowerCase().includes(query)
        );
    }, [invoices, searchQuery]);


    return (
        <div className="min-vh-100 bg-light">
            <div className="container-fluid py-4" style={{ maxWidth: '1400px' }}>
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                            <div>
                                <h2 className="fw-bold mb-1">Invoice Dashboard</h2>
                                <p className="text-muted mb-0">
                                    {isLoading ? 'Loading...' : `${filteredInvoices.length} invoice${filteredInvoices.length !== 1 ? 's' : ''} found`}
                                </p>
                            </div>
                            <button 
                                className="btn btn-primary px-4 py-2 shadow-sm"
                                style={{ borderRadius: '10px' }}
                                onClick={handleCreateNew}
                            >
                                <Plus size={20} className="me-2" />
                                Create New Invoice
                            </button>
                        </div>

                        {/* Search and Filter Bar */}
                        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
                            <div className="card-body p-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-6 col-lg-8">
                                        <div className="position-relative">
                                            <Search 
                                                className="position-absolute text-muted"
                                                style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                                                size={18}
                                            />
                                            <input
                                                type="text"
                                                className="form-control border-0 bg-light ps-5"
                                                style={{ borderRadius: '8px', padding: '10px 12px 10px 40px' }}
                                                placeholder="Search by invoice number, title, or client name..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="d-flex gap-2 justify-content-end">
                                            <button 
                                                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-light'} px-3`}
                                                style={{ borderRadius: '8px' }}
                                                onClick={() => setViewMode('grid')}
                                            >
                                                <LayoutGrid size={18} />
                                            </button>
                                            <button 
                                                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-light'} px-3`}
                                                style={{ borderRadius: '8px' }}
                                                onClick={() => setViewMode('list')}
                                            >
                                                <List size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted mt-3">Loading your invoices...</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredInvoices.length === 0 && invoices.length === 0 && (
                    <div className="text-center py-5">
                        <FileText size={64} className="text-muted opacity-50 mb-3" />
                        <h4 className="fw-semibold mb-2">No Invoices Yet</h4>
                        <p className="text-muted mb-4">Create your first invoice to get started</p>
                        <button 
                            className="btn btn-primary px-4 py-2"
                            style={{ borderRadius: '10px' }}
                            onClick={handleCreateNew}
                        >
                            <Plus size={20} className="me-2" />
                            Create Invoice
                        </button>
                    </div>
                )}

                {/* No Search Results */}
                {!isLoading && filteredInvoices.length === 0 && invoices.length > 0 && (
                    <div className="text-center py-5">
                        <Search size={64} className="text-muted opacity-50 mb-3" />
                        <h4 className="fw-semibold mb-2">No Results Found</h4>
                        <p className="text-muted mb-4">Try adjusting your search terms</p>
                        <button 
                            className="btn btn-outline-secondary"
                            style={{ borderRadius: '10px' }}
                            onClick={() => setSearchQuery('')}
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Grid View */}
                {!isLoading && filteredInvoices.length > 0 && viewMode === 'grid' && (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        <div className="col">
                            <CreateNewCard onClick={handleCreateNew} />
                        </div>
                        {filteredInvoices.map((invoice) => (
                            <div className="col" key={invoice.id}>
                                <InvoiceCard 
                                    invoice={invoice} 
                                    onClick={() => handleViewClick(invoice)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* List View */}
                {!isLoading && filteredInvoices.length > 0 && viewMode === 'list' && (
                    <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                        <div className="list-group list-group-flush">
                            {filteredInvoices.map((invoice, idx) => (
                                <div
                                    key={invoice.id}
                                    className="list-group-item list-group-item-action border-0 py-3"
                                    style={{ 
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                        borderRadius: idx === 0 ? '12px 12px 0 0' : idx === filteredInvoices.length - 1 ? '0 0 12px 12px' : '0'
                                    }}
                                    onClick={() => handleViewClick(invoice)}
                                >
                                    <div className="row align-items-center">
                                        <div className="col-md-1 text-center">
                                            {invoice.thumbnailUrl ? (
                                                <img 
                                                    src={invoice.thumbnailUrl} 
                                                    alt="Thumbnail"
                                                    style={{ 
                                                        width: '50px', 
                                                        height: '50px', 
                                                        objectFit: 'cover',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                            ) : (
                                                <div 
                                                    className="bg-light d-inline-flex align-items-center justify-content-center"
                                                    style={{ 
                                                        width: '50px', 
                                                        height: '50px',
                                                        borderRadius: '8px'
                                                    }}
                                                >
                                                    <FileText size={24} className="text-muted" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                            <h6 className="mb-1 fw-semibold">{invoice.title}</h6>
                                            <small className="text-muted">{invoice.billing?.name || 'No client'}</small>
                                        </div>
                                        <div className="col-md-3">
                                            <span className="badge bg-light text-dark border">
                                                {invoice.invoice?.number || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="d-flex align-items-center gap-1 text-muted small">
                                                <Clock size={14} />
                                                <span>{formatDate(invoice.lastUpdatedAt)}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-1 text-end">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-muted">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard