import './Template01.css'

const Template01 = ({ data }) => {
    return (
        <div className="template1 border rounded-4 shadow-lg mx-auto my-5 p-4 bg-white d-flex flex-column align-items-center" style={{maxWidth: '950px', minWidth: '320px'}}>

            {/* Header Section */}
            <div className="row mb-4 w-100 align-items-center">
                <div className="col-md-8 d-flex align-items-center">
                    {data.companyLogo && (
                        <img src={data.companyLogo} alt="Company Logo" className="img-fluid me-3" style={{ maxWidth: '120px', maxHeight: '80px', objectFit: 'contain' }} />
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

            <hr className='my-3 orange-border' />

            {/*Billing section*/}
            <div className="row g-3 mb-4 w-100">
                {data.shippingName && data.shippingAddress && data.shippingPhone && (
                    <div className="col-md-6">
                        <div className="p-3 rounded bg-light shadow-sm h-100">
                            <h4 className="mb-2 text-secondary">Shipping To</h4>
                            <p className="mb-1 fw-semibold">{data.shippingName}</p>
                            <p className="mb-1">{data.shippingAddress}</p>
                            <p className="mb-0">Phone: {data.shippingPhone}</p>
                        </div>
                    </div>
                )}
                <div className="col-md-6">
                    <div className="p-3 rounded bg-light shadow-sm h-100">
                        <h4 className="mb-2 text-secondary">Billing To</h4>
                        <p className='mb-1 fw-semibold'>{data.billingName}</p>
                        <p className="mb-1">{data.billingAddress}</p>
                        <p className="mb-0">Phone: {data.billingPhone}</p>
                    </div>
                </div>
            </div>

            {/*Items Section*/}
            <div className="mb-4 w-100">
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
                            {data.items.map((item, index) => {
                                const qty = Number(item.qty) || 0;
                                const rate = Number(item.rate ?? item.amount) || 0;
                                return (
                                    <tr key={index}>
                                        <td className='p-2'>{item.name}</td>
                                        <td className='p-2 text-center'>{qty}</td>
                                        <td className='p-2 text-end'>${rate.toFixed(2)}</td>
                                        <td className='p-2 text-end fw-semibold'>${(qty * rate).toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/*Totals Section*/}
            <div className="mb-4 w-100">
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

            {/*Bank Account Section*/}
            {(data.accountName || data.accountNumber || data.accountIfsccoed) && (
                <div className="mt-4 pt-3 border-top w-100">
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

            {/*Notes Section*/}
            {data.notes && (
                <div className="mt-4 pt-3 border-top w-100">
                    <h4 className="mb-3 text-secondary">Additional Notes</h4>
                    <p className='mb-0 text-muted'>{data.notes}</p>
                </div>
            )}

        </div>
    )
}

export default Template01