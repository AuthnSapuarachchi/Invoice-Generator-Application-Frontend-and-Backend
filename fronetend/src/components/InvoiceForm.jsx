import {assets} from "../assets/assets.js";
import {Trash2} from "lucide-react";
import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.jsx";

const InvoiceForm = () => {

    const {invoiceData, setInvoiceData} = useContext(AppContext);

    const addItem = () => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                { name: "", qty: "", amount: "", description: "", total: 0 }],
        }))
    }

    const deletItem = (index) => {
        const items = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData((prev) => ({...prev, items }))
    }

    const handleChange = (section, field, value) => {
        setInvoiceData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value}
        }));
    }

    const handleSameAsBilling = () => {
        setInvoiceData((prev) => ({
            ...prev,
            shipping: { ...prev.billing },
        }))

    }

    const handleItemChange = (index, field, value) => {
        const items = [...invoiceData.items];
        items[index][field] = value;
        if (field === "qty" || field === "amount" ) {
            items[index].total = (items[index].qty) * (items[index].amount || 0);
        }
        setInvoiceData((prev) => ({...prev, items}))
    }

    const calculateTotal = () => {
        const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.total || 0) , 0);
        const taxRate = Number(invoiceData.tax || 0);
        const taxAmount = (subtotal * taxRate) / 100;
        const grandTotal = subtotal + taxAmount;
        return {subtotal, taxAmount, grandTotal};
    }

    const {subtotal, taxAmount, grandTotal } = calculateTotal();

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader= new FileReader();
            reader.onload = () => {
                setInvoiceData((prev) => ({
                    ...prev,
                    logo: reader.result
                }))
            };
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if (!invoiceData.invoice.number) {
           const randomNumber = `INV-${Math.floor(1000 + Math.random() * 9000)}`
              setInvoiceData((prev) => ({
                  ...prev,
                  invoice: {...prev.invoice, number: randomNumber},
              }))
        }
    }, []);




   return (
        <div className="invoiceform container py-4">

            {/*Company Logo*/}
            <div className="mb-4">
                <h5>Company logo</h5>
                <div className='d-flex align-items-center gap-3'>
                    <label htmlFor="image" className="form-label">
                        <img src={invoiceData.logo ? invoiceData.logo : assets.upload_area} alt="upload" width={98}/>
                    </label>
                    <input type="file"
                           name='logo'
                           id="image"
                           hidden
                           className="form-control"
                           accept="image/*"
                           onChange={handleLogoUpload}
                    />
                </div>
            </div>
            {/*Company info*/}
            <div className="mb-4">
                <h5>Your Company</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text"
                               name="companyName"
                               className="form-control"
                               placeholder="Company Name"
                               onChange={(e) => handleChange("company", "name", e.target.value)}
                               value={invoiceData.company.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <input type="text"
                               name="companyPhone"
                               className="form-control"
                               placeholder="Company Phone"
                               onChange={(e) => handleChange("company", "phone", e.target.value)}
                               value={invoiceData.company.phone}
                        />
                    </div>
                    <div className="col-md-12">
                        <input type="text"
                               name="companyAddress"
                               className="form-control"
                               placeholder="Company Address"
                               onChange={(e) => handleChange("company", "address", e.target.value)}
                               value={invoiceData.company.address}
                        />
                    </div>
                </div>
            </div>
            {/*Bill to*/}
            <div className="mb-4">
                <h5>Bill To</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text"
                               name="companyName"
                               className="form-control"
                               placeholder="Name"
                               value={invoiceData.billing.name}
                               onChange={(e) => handleChange("billing", "name", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <input type="text"
                               name="companyName"
                               className="form-control"
                               placeholder="Phone"
                               value={invoiceData.billing.phone}
                               onChange={(e) => handleChange("billing", "phone", e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <input type="text"
                               name="companyName"
                               className="form-control"
                               placeholder="Address"
                               value={invoiceData.billing.address}
                               onChange={(e) => handleChange("billing", "address", e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {/*Ship To*/}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Ship To</h5>
                    <div className="form-check">
                        <input type="checkbox"
                               name=""
                               id="sameAsBilling"
                               className="form-check-input"
                               onChange={handleSameAsBilling}
                        />
                        <label htmlFor="sameAsBilling" className="form-check-label">
                            Same as Billing
                        </label>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text"
                               name="companyName"
                               className="form-control"
                               placeholder="Name"
                               value={invoiceData.shipping.name}
                               onChange={(e) => handleChange("shipping", "name", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <input type="text"
                               name="companyName"
                               className="form-control"
                               placeholder="Phone"
                               value={invoiceData.shipping.phone}
                               onChange={(e) => handleChange("shipping", "phone", e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <input type="text"
                               name="companyName"
                               className="form-control"
                               placeholder="Shipping Address"
                               value={invoiceData.shipping.address}
                               onChange={(e) => handleChange("shipping", "address", e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {/*Invoice Info*/}
            <div className="mb-4">
                <h5>Invoice Information</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                        <input type="text"
                               name="companyName"
                               disabled
                               className="form-control"
                               id="invoiceNumber"
                               value={invoiceData.invoice.number}
                               onChange={(e) => handleChange("invoice", "number", e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                        <input type="date"
                               name="companyName"
                               className="form-control"
                               placeholder="Phone"
                               id="invoiceDate"
                               value={invoiceData.invoice.date}
                               onChange={(e) => handleChange("invoice", "date", e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDueDate" className="form-label">Invoice due Date</label>
                        <input type="date"
                               name="companyName"
                               className="form-control"
                               placeholder="Address"
                               id="invoiceDueDate"
                               value={invoiceData.invoice.dueDate}
                               onChange={(e) => handleChange("invoice", "dueDate", e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {/*Item Details*/}
            <div className="mb-4">
                <h5>Item Details</h5>
                {invoiceData.items.map((item, index) => (
                    <div key={index} className="card p-3 mb-3">
                        <div className="row g-3 mb-2">
                            <div className="col-md-3">
                                <input type="text"
                                       className="form-control"
                                       placeholder="Item Name"
                                       value={item.name}
                                       onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <input type="number"
                                       placeholder="qty"
                                       className="form-control"
                                       value={item.qty}
                                       onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <input type="number"
                                       placeholder="Amount"
                                       className="form-control"
                                       value={item.amount}
                                       onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <input type="number"
                                       placeholder="Total"
                                       className="form-control"
                                       value={item.total}
                                       onChange={(e) => handleItemChange(index, "total", e.target.value)}
                                />
                            </div>
                            <div className="d-flex gap-2">
                                <textarea className="form-control"
                                          placeholder="Description"
                                          value={item.description}
                                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                                ></textarea>
                                {invoiceData.items.length > 1 && (
                                    <button className='btn btn-outline-danger' type="button" onClick={() => deletItem(index)}>
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="d-flex gap-2">

                        </div>
                    </div>
                ))}
                <button className="btn btn-primary" type="button" onClick={addItem}>Add Item</button>
            </div>
            {/*Bank Account Details*/}
            <div className="mb-4">
                <h5>Bank Account Details</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text"
                               className="form-control"
                               placeholder="Account Name"
                               value={invoiceData.account.name}
                               onChange={(e) => handleChange("account", "name", e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input type="text"
                               className="form-control"
                               placeholder="Account number"
                               id="invoiceDate"
                               value={invoiceData.invoice.number}
                               onChange={(e) => handleChange("invoiceDate", "number", e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input type="text"
                               className="form-control"
                               placeholder="Branch/IFSC Code"
                               id="ifsccoede"
                               value={invoiceData.invoice.ifsccode}
                               onChange={(e) => handleChange("ifsccode", "number", e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {/*Totals*/}
            <div className="mb-4">
                <h5>Totals</h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100 w-md-50">
                        <div className="d-flex justify-content-between">
                            <span>SubTotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label htmlFor="taxInput" className="me-2">Tax Rate(%)</label>
                            <input type="number"
                                   id="taxInput"
                                   className="form-control w-50 text-end"
                                   placeholder="0%"
                                   value={invoiceData.tax}
                                   onChange={(e) => setInvoiceData((prev) => ({...prev, tax: e.target.value}))}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Tax Amount</span>
                            <span>${taxAmount.toFixed(2)}</span>

                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*Notes*/}
            <div className="mb-4">
                <h5>Notes:</h5>
                <div className="w-100">
                    <textarea
                        name="notes"
                        className="form-control"
                        placeholder="Notes"
                        cols="30" rows="3"
                        value={invoiceData.notes}
                        onChange={(e) => setInvoiceData((prev) => ({...prev, notes: e.target.value}))}
                    />
                </div>
            </div>

        </div>
   )
}

export default InvoiceForm;