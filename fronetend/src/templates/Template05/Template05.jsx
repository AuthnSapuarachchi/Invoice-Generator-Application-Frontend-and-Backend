import './Template05.css';

const Template05 = ({ data }) => {
    return (
        <div className="template5 border rounded-5 shadow-lg mx-auto my-5 p-4 bg-white" style={{maxWidth: '1000px'}}>
            {/* Header Section - logo left, info right, bold accent */}
            <div className="row mb-4 align-items-center">
                <div className="col-md-4 text-center text-md-start">
                    {data.companyLogo && (
                        <img src={data.companyLogo} alt="Company Logo" className="img-fluid mb-2" style={{ maxWidth: '130px', maxHeight: '90px', objectFit: 'contain' }} />
                    )}
                </div>
                <div className="col-md-8 text-end">
                    <h2 className="mb-1 company-title text-danger fw-bold">{data.companyName}</h2>
                    <p className="mb-1 text-muted">{data.companyAddress}</p>
                    <p className="mb-0 text-muted">Phone: {data.companyPhone}</p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h1 className="invoice-title mb-2 text-danger">INVOICE</h1>
                    <div className="d-inline-block bg-light rounded px-4 py-2 shadow-sm border border-danger">
                        <p className='mb-1'><strong>Invoice #:</strong> {data.invoiceNumber}</p>
                        <p className='mb-1'><strong>Invoice Date:</strong> {data.invoiceDate}</p>
                        <p className='mb-0'><strong>Due Date:</strong> {data.paymentDate}</p>
                    </div>
                </div>
            </div>

            <hr className='my-3 border-danger' />

            {/* Billing & Shipping Section - red accent cards */}
            <div className="row g-3 mb-4">
                {data.shippingName && data.shippingAddress && data.shippingPhone && (
                    <div className="col-md-6">
                        <div className="p-3 rounded-4 bg-danger bg-opacity-10 shadow-sm h-100">
                            <h5 className="mb-2 text-danger">Shipping To</h5>
                            <p className="mb-1 fw-semibold">{data.shippingName}</p>
                            <p className="mb-1">{data.shippingAddress}</p>
                            <p className="mb-0">Phone: {data.shippingPhone}</p>
                        </div>
                    </div>
                )}
                <div className="col-md-6">
                    <div className="p-3 rounded-4 bg-danger bg-opacity-10 shadow-sm h-100">
                        <h5 className="mb-2 text-danger">Billing To</h5>
                        <p className='mb-1 fw-semibold'>{data.billingName}</p>
                        <p className="mb-1">{data.billingAddress}</p>
                        <p className="mb-0">Phone: {data.billingPhone}</p>
                    </div>
                </div>
            </div>

            {/* Items Section - red striped table */}
            <div className="mb-4">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered mb-0">
                        <thead className="table-danger">
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
                    <div className="p-3 bg-light rounded-4 shadow-sm border border-danger" style={{maxWidth: '350px'}}>
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
                            <span className="fs-5 text-danger">${data.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bank Account Section - horizontal info */}
            {(data.accountName || data.accountNumber || data.accountIfsccoed) && (
                <div className="mt-4 pt-3 border-top">
                    <h5 className="mb-3 text-danger">Bank Account Details</h5>
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
                    <h5 className="mb-3 text-danger">Additional Notes</h5>
                    <p className='mb-0 text-muted'>{data.notes}</p>
                </div>
            )}
        </div>
    );
};

export default Template05;
