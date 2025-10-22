import { forwardRef } from "react";
import Template01 from "../templates/Template01/Template01.jsx";
import { formatInvoiceData } from "../utils/formatInvoiceData.js";
import { templateComponents } from "../utils/InvoiceTemplates.js";

const InvoicePreview = forwardRef(({invoiceData, template}, ref) => {

    const formattedData = formatInvoiceData(invoiceData);

    const SelectedTemplate = templateComponents[template] || templateComponents['template01'];


    // Flatten the data for Template01
    const templateData = {
        companyLogo: invoiceData.logo || "",
        companyName: formattedData.company.name,
        companyAddress: formattedData.company.address,
        companyPhone: formattedData.company.phone,
        invoiceNumber: formattedData.invoice.name,
        invoiceDate: formattedData.invoice.date,
        paymentDate: formattedData.invoice.dueDate,
        billingName: formattedData.billing.name,
        billingAddress: formattedData.billing.address,
        billingPhone: formattedData.billing.phone,
        shippingName: formattedData.shipping.name,
        shippingAddress: formattedData.shipping.address,
        shippingPhone: formattedData.shipping.phone,
        items: formattedData.items,
        subtotal: formattedData.subtotal,
        tax: formattedData.tax,
        taxAmount: formattedData.taxAmount,
        total: formattedData.total,
        accountName: formattedData.account.name,
        accountNumber: formattedData.account.number,
        accountIfsccoed: formattedData.account.ifsccoed,
        notes: formattedData.notes,
    };


    return (
        <div className="invoice-preview container px-2 py-2 overflow-x-auto" ref={ref}>
            <SelectedTemplate data={templateData} />
        </div>
    );
});

export default InvoicePreview;