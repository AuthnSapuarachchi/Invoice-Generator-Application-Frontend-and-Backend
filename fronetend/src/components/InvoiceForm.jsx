import { assets } from "../assets/assets.js";
import { Trash2, Plus, Upload, Building2, User, MapPin, Calendar, FileText } from "lucide-react";
import { useContext, useEffect, useMemo, useCallback } from "react";
import { AppContext } from "../context/AppContext.jsx";

// Reusable Input Component
const FormInput = ({ label, icon: Icon, ...props }) => (
    <div className="form-group mb-3">
        {label && <label className="form-label text-muted small fw-medium mb-2">{label}</label>}
        <div className="position-relative">
            {Icon && <Icon className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={18} />}
            <input 
                className={`form-control border-0 bg-light ${Icon ? 'ps-5' : ''}`}
                style={{ borderRadius: '8px', padding: '12px 16px' }}
                {...props} 
            />
        </div>
    </div>
);

// Section Header Component
const SectionHeader = ({ icon: Icon, title, action }) => (
    <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
            {Icon && <Icon size={20} className="text-primary" />}
            <h6 className="mb-0 fw-semibold text-dark">{title}</h6>
        </div>
        {action && action}
    </div>
);

const InvoiceForm = () => {
    const { invoiceData, setInvoiceData } = useContext(AppContext);

    // Memoized calculations
    const totals = useMemo(() => {
        const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.total || 0), 0);
        const taxRate = Number(invoiceData.tax || 0);
        const taxAmount = (subtotal * taxRate) / 100;
        const grandTotal = subtotal + taxAmount;
        return { subtotal, taxAmount, grandTotal };
    }, [invoiceData.items, invoiceData.tax]);

    // Callbacks with useCallback
    const addItem = useCallback(() => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [...prev.items, { name: "", qty: "", amount: "", description: "", total: 0 }],
        }));
    }, [setInvoiceData]);

    const deleteItem = useCallback((index) => {
        setInvoiceData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    }, [setInvoiceData]);

    const handleChange = useCallback((section, field, value) => {
        setInvoiceData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    }, [setInvoiceData]);

    const handleSameAsBilling = useCallback((e) => {
        if (e.target.checked) {
            setInvoiceData((prev) => ({
                ...prev,
                shipping: { ...prev.billing }
            }));
        }
    }, [setInvoiceData]);

    const handleItemChange = useCallback((index, field, value) => {
        setInvoiceData((prev) => {
            const items = [...prev.items];
            items[index][field] = value;
            if (field === "qty" || field === "amount") {
                items[index].total = Number(items[index].qty || 0) * Number(items[index].amount || 0);
            }
            return { ...prev, items };
        });
    }, [setInvoiceData]);

    const handleLogoUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setInvoiceData((prev) => ({ ...prev, logo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    }, [setInvoiceData]);

    useEffect(() => {
        if (!invoiceData.invoice.number) {
            const randomNumber = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
            setInvoiceData((prev) => ({
                ...prev,
                invoice: { ...prev.invoice, number: randomNumber },
            }));
        }
    }, []);




    return (
        <div className="invoiceform" style={{ maxWidth: '100%', height: '100%', overflowY: 'auto', padding: '0' }}>
            <div style={{ padding: '24px' }}>
                {/* Company Logo Section */}
                <section className="mb-4">
                    <SectionHeader icon={Building2} title="Company Logo" />
                    <label 
                        htmlFor="logo-upload" 
                        className="d-flex align-items-center justify-content-center border-0 bg-light position-relative"
                        style={{ 
                            width: '120px', 
                            height: '120px', 
                            borderRadius: '12px', 
                            cursor: 'pointer',
                            overflow: 'hidden',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {invoiceData.logo ? (
                            <img src={invoiceData.logo} alt="Company Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div className="text-center">
                                <Upload size={32} className="text-muted mb-2" />
                                <small className="text-muted d-block">Upload Logo</small>
                            </div>
                        )}
                        <input
                            type="file"
                            id="logo-upload"
                            hidden
                            accept="image/*"
                            onChange={handleLogoUpload}
                        />
                    </label>
                </section>

                {/* Company Information */}
                <section className="mb-4">
                    <SectionHeader icon={Building2} title="Your Company" />
                    <div className="row g-3">
                        <div className="col-md-6">
                            <FormInput
                                placeholder="Company Name"
                                value={invoiceData.company.name}
                                onChange={(e) => handleChange("company", "name", e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                placeholder="Phone Number"
                                value={invoiceData.company.phone}
                                onChange={(e) => handleChange("company", "phone", e.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <FormInput
                                icon={MapPin}
                                placeholder="Company Address"
                                value={invoiceData.company.address}
                                onChange={(e) => handleChange("company", "address", e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Bill To */}
                <section className="mb-4">
                    <SectionHeader icon={User} title="Bill To" />
                    <div className="row g-3">
                        <div className="col-md-6">
                            <FormInput
                                placeholder="Client Name"
                                value={invoiceData.billing.name}
                                onChange={(e) => handleChange("billing", "name", e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                placeholder="Phone Number"
                                value={invoiceData.billing.phone}
                                onChange={(e) => handleChange("billing", "phone", e.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <FormInput
                                icon={MapPin}
                                placeholder="Billing Address"
                                value={invoiceData.billing.address}
                                onChange={(e) => handleChange("billing", "address", e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Ship To */}
                <section className="mb-4">
                    <SectionHeader 
                        icon={MapPin} 
                        title="Ship To"
                        action={
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="sameAsBilling"
                                    className="form-check-input"
                                    onChange={handleSameAsBilling}
                                />
                                <label htmlFor="sameAsBilling" className="form-check-label small text-muted">
                                    Same as Billing
                                </label>
                            </div>
                        }
                    />
                    <div className="row g-3">
                        <div className="col-md-6">
                            <FormInput
                                placeholder="Recipient Name"
                                value={invoiceData.shipping.name}
                                onChange={(e) => handleChange("shipping", "name", e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormInput
                                placeholder="Phone Number"
                                value={invoiceData.shipping.phone}
                                onChange={(e) => handleChange("shipping", "phone", e.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <FormInput
                                icon={MapPin}
                                placeholder="Shipping Address"
                                value={invoiceData.shipping.address}
                                onChange={(e) => handleChange("shipping", "address", e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Invoice Information */}
                <section className="mb-4">
                    <SectionHeader icon={FileText} title="Invoice Details" />
                    <div className="row g-3">
                        <div className="col-md-4">
                            <FormInput
                                label="Invoice Number"
                                placeholder="INV-0000"
                                value={invoiceData.invoice.number}
                                disabled
                                style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInput
                                label="Invoice Date"
                                icon={Calendar}
                                type="date"
                                value={invoiceData.invoice.date}
                                onChange={(e) => handleChange("invoice", "date", e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInput
                                label="Due Date"
                                icon={Calendar}
                                type="date"
                                value={invoiceData.invoice.dueDate}
                                onChange={(e) => handleChange("invoice", "dueDate", e.target.value)}
                            />
                        </div>
                    </div>
                </section>
                {/* Items Section */}
                <section className="mb-4">
                    <SectionHeader 
                        icon={FileText} 
                        title={`Items (${invoiceData.items.length})`}
                    />
                    <div className="space-y-3">
                        {invoiceData.items.map((item, index) => (
                            <div 
                                key={index} 
                                className="border-0 bg-light p-3 mb-3"
                                style={{ borderRadius: '12px' }}
                            >
                                <div className="row g-2 mb-2">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control border-0 bg-white"
                                            style={{ borderRadius: '8px', padding: '10px 12px' }}
                                            placeholder="Item name"
                                            value={item.name}
                                            onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            className="form-control border-0 bg-white"
                                            style={{ borderRadius: '8px', padding: '10px 12px' }}
                                            placeholder="Qty"
                                            value={item.qty}
                                            onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            className="form-control border-0 bg-white"
                                            style={{ borderRadius: '8px', padding: '10px 12px' }}
                                            placeholder="price"
                                            value={item.amount}
                                            onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2 d-flex align-items-center gap-2">
                                        <input
                                            type="number"
                                            className="form-control border-0 bg-white"
                                            style={{ borderRadius: '8px', padding: '10px 12px' }}
                                            placeholder="Total"
                                            value={item.total}
                                            readOnly
                                            disabled
                                        />
                                        {invoiceData.items.length > 1 && (
                                            <button
                                                className="btn btn-light border-0"
                                                style={{ borderRadius: '8px', padding: '10px' }}
                                                onClick={() => deleteItem(index)}
                                            >
                                                <Trash2 size={18} className="text-danger" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <textarea
                                    className="form-control border-0 bg-white"
                                    style={{ borderRadius: '8px', padding: '10px 12px', resize: 'none' }}
                                    placeholder="Item description (optional)"
                                    rows="2"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        className="btn btn-outline-primary border-2 w-100"
                        style={{ borderRadius: '8px', padding: '12px', borderStyle: 'dashed' }}
                        onClick={addItem}
                    >
                        <Plus size={18} className="me-2" />
                        Add Item
                    </button>
                </section>

                {/* Bank Details */}
                <section className="mb-4">
                    <SectionHeader icon={Building2} title="Bank Account Details" />
                    <div className="row g-3">
                        <div className="col-md-4">
                            <FormInput
                                placeholder="Account Name"
                                value={invoiceData.account?.name || ""}
                                onChange={(e) => handleChange("account", "name", e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInput
                                placeholder="Account Number"
                                value={invoiceData.account?.number || ""}
                                onChange={(e) => handleChange("account", "number", e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInput
                                placeholder="Branch Code"
                                value={invoiceData.account?.ifsccode || ""}
                                onChange={(e) => handleChange("account", "ifsccode", e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Totals Section */}
                <section className="mb-4">
                    <div 
                        className="p-4 border-0 bg-light"
                        style={{ borderRadius: '12px' }}
                    >
                        <div className="row justify-content-end">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-medium">${totals.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="text-muted">Tax Rate</span>
                                    <div className="d-flex align-items-center gap-2">
                                        <input
                                            type="number"
                                            className="form-control border-0 bg-white text-end"
                                            style={{ borderRadius: '8px', width: '80px', padding: '6px 10px' }}
                                            placeholder="0"
                                            value={invoiceData.tax}
                                            onChange={(e) => setInvoiceData((prev) => ({ ...prev, tax: e.target.value }))}
                                        />
                                        <span className="text-muted">%</span>
 ;                                   </div>
                                </div>
                                <div className="d-flex justify-content-between py-2 border-bottom">
                                    <span className="text-muted">Tax Amount</span>
                                    <span className="fw-medium">${totals.taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between py-3 mt-2">
                                    <span className="fw-bold fs-5">Total</span>
                                    <span className="fw-bold fs-5 text-primary">${totals.grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notes Section */}
                <section className="mb-4">
                    <SectionHeader icon={FileText} title="Additional Notes" />
                    <textarea
                        className="form-control border-0 bg-light"
                        style={{ borderRadius: '12px', padding: '16px', resize: 'none' }}
                        placeholder="Add any additional notes or terms & conditions..."
                        rows="4"
                        value={invoiceData.notes}
                        onChange={(e) => setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))}
                    />
                </section>
            </div>
        </div>
    )
}

export default InvoiceForm;