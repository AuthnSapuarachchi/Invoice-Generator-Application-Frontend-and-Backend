import './Template02.css';

const Template02 = ({ data }) => {
    return (
        <div className="template2 border rounded shadow-sm mx-auto my-4 px-4 py-4 bg-light" style={{maxWidth: '900px'}}>
            {/* Header Section - horizontal layout */}
            <div className="row align-items-center mb-4">
                <div className="col-md-8 d-flex align-items-center">
                    {data.companyLogo && (
                        <img src={data.companyLogo} alt="Company Logo" className="img-fluid me-3" style={{ maxWidth: '100px', maxHeight: '70px', objectFit: 'contain' }} />
                    )}
                    <div>
                        <h2 className="mb-1 company-title text-primary fw-bold">{data.companyName}</h2>
                        <p className="mb-1 text-muted">{data.companyAddress}</p>
                        <p className="mb-0 text-muted">Phone: {data.companyPhone}</p>
                    </div>
                </div>
                <div className="col-md-4 text-end">
                    <h1 className="invoice-title mb-2 text-dark">INVOICE</h1>
                    <div className="bg-white rounded p-2 shadow-sm d-inline-block">
                        <p className='mb-1'><strong>Invoice #:</strong> {data.invoiceNumber}</p>
                        <p className='mb-1'><strong>Invoice Date:</strong> {data.invoiceDate}</p>
                        <p className='mb-0'><strong>Due Date:</strong> {data.paymentDate}</p>
                    </div>
                </div>
            </div>

            <hr className='my-3 border-primary' />

            {/* Billing & Shipping Section - side by side cards */}
            <div className="row g-3 mb-4">
                {data.shippingName && data.shippingAddress && data.shippingPhone && (
                    <div className="col-md-6">
                        <div className="p-3 rounded bg-white shadow-sm h-100">
                            <h4 className="mb-2 text-secondary">Shipping To</h4>
                            <p className="mb-1 fw-semibold">{data.shippingName}</p>
                            <p className="mb-1">{data.shippingAddress}</p>
                            <p className="mb-0">Phone: {data.shippingPhone}</p>
                        </div>
                    </div>
                )}
                <div className="col-md-6">
                    <div className="p-3 rounded bg-white shadow-sm h-100">
                        <h4 className="mb-2 text-secondary">Billing To</h4>
                        <p className='mb-1 fw-semibold'>{data.billingName}</p>
                        <p className="mb-1">{data.billingAddress}</p>
                        <p className="mb-0">Phone: {data.billingPhone}</p>
                    </div>
                </div>
            </div>

            {/* Items Section - striped table */}
            <div className="mb-4">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered mb-0">
                        <thead className="table-primary">
                            <tr>
                                <th className='p-2'>Item #/Description</th>
                                <th className='p-2 text-center' style={{width: '15%'}}>Qty</th>
                                <th className='p-2 text-end' style={{width: '15%'}}>Rate</th>
                                <th className='p-2 text-end' style={{width: '15%'}}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, index) => (
                                <tr key={index}>
                                    <td className='p-2'>{item.name}</td>
                                    <td className='p-2 text-center'>{item.qty}</td>
                                    <td className='p-2 text-end'>${Number(item.rate)?.toFixed(2)}</td>
                                    <td className='p-2 text-end fw-semibold'>${(Number(item.qty) * Number(item.rate)).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Totals Section - right aligned card */}
            <div className="mb-4">
                <div className="d-flex justify-content-end">
                    <div className="p-3 bg-white rounded shadow-sm" style={{maxWidth: '350px'}}>
                        <div className="d-flex justify-content-between mb-2 pb-2">
                            <span>Subtotal:</span>
                            <span className="fw-semibold">${data.subtotal.toFixed(2)}</span>
                        </div>
                        {data.tax > 0 && (
                            <div className="d-flex justify-content-between mb-2 pb-2">
                                <span>Tax ({data.tax}%):</span>
                                <span className="fw-semibold">${data.taxAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between fw-bold pt-2">
                            <span className="fs-5">Total:</span>
                            <span className="fs-5 text-success">${data.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bank Account Section - horizontal info */}
            {(data.accountName || data.accountNumber || data.accountIfsccoed) && (
                <div className="mt-4 pt-3 border-top">
                    <h4 className="mb-3 text-secondary">Bank Account Details</h4>
                    <div className="row">
                        {data.accountName && (
                            <div className="col-md-4 mb-2">
                                <strong>Account Name:</strong><br />
                                <span>{data.accountName}</span>
                            </div>
                        )}
                        {data.accountNumber && (
                            <div className="col-md-4 mb-2">
                                <strong>Account Number:</strong><br />
                                <span>{data.accountNumber}</span>
                            </div>
                        )}
                        {data.accountIfsccoed && (
                            <div className="col-md-4 mb-2">
                                <strong>IFSC Code:</strong><br />
                                <span>{data.accountIfsccoed}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Notes Section - muted card */}
            {data.notes && (
                <div className="mt-4 pt-3 border-top">
                    <h4 className="mb-3 text-secondary">Additional Notes</h4>
                    <p className='mb-0 text-muted'>{data.notes}</p>
                </div>
            )}
        </div>
    );
};

export default Template02;
