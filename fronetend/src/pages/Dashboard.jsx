import React, { useContext, useEffect, useState } from 'react'
import { AppContext, initialInvoiceData } from '../context/AppContext.jsx';
import { getAllInvoices } from '../service/invoiceService.js'; 
import { Plus } from "lucide-react";

import toast from 'react-hot-toast';
import { formatDate } from '../utils/formatInvoiceData.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const Dashboard = () => {

    const [invoices, setInvoices] = useState([]);
    const { baseUrl, setInvoiceData, setSelectedTemplate, setInvoiceTitle } = useContext(AppContext);
    const navigate = useNavigate();
    const {getToken} = useAuth();


    useEffect(() => {  
        const fetchInvoices = async () => {
            try {
                const token = await getToken();
                const response = await getAllInvoices(baseUrl, token);
                setInvoices(response.data);
            } catch (error) {
                toast.error("Failed to fetch invoices", error);
            }
        }
        fetchInvoices();
     }, [baseUrl]);

     const handleViewClick = (invoice) => {
        setInvoiceData(invoice);
        setSelectedTemplate(invoice.template || 'Template01');
        setInvoiceTitle(invoice.title || 'New Invoice');
        navigate('/preview');
     }

     const handleCreateNew = () => {
        //reset to initial state from context
        setInvoiceTitle("New Invoice");
        setSelectedTemplate("Template01");
        setInvoiceData(initialInvoiceData);
        navigate('/generate');
     }


    return (
        <div className="container py-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {/* Create new invoice card */}
                <div className="col">
                    <div onClick={handleCreateNew} className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm cursor-pointer" style={{minHeight: "270px"}}>
                        <Plus size={48} />
                        <p className="mt-3 fw-median">Create New Invoice</p>
                    </div>
                </div>

                {/* Create new invoice card */}
                {invoices.map((invoice, idx) => (
                    <div className="col" key={idx}>
                        <div className="card h-100 shadow-sm cursor-pointer" style={{minHeight: '270px'}}
                            onClick={() => handleViewClick(invoice)}
                        >
                            {invoice.thumbnailUrl && (
                                <img src={invoice.thumbnailUrl} alt='Invoice thumbnail' className='card-img-top' style={{height: "200px", objectFit: "cover" }}/>
                            )}
                            <div className='card-body'>
                                <h6 className='card-title mb-1'>{invoice.title}</h6>
                                <small className='tetxt-muted'>
                                    Last Updated: {formatDate(invoice.lastUpdatedAt)}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create new invoice card */}
            </div>
        </div>
    )
}

export default Dashboard