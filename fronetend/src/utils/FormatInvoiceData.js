export const formatInvoiceData = (invoiceData) => {

    const {
        title,
        company = {},
        invoice = {},
        account = {},
        billing = {},
        shipping = {},
        tax = {},
        notes = {},
        items = [],
    } = invoiceData || {};

    const currencySymbol = account.currency || "$";
    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.amount), 0);
    const taxAmount = (subtotal * (tax || 0)) / 100;
    const total = subtotal + taxAmount;

    return {
        title: title || "Invoice Title",
        company: {
            name: company.name || "Your Company Name",
            address: company.address || "Company Address",
            email: company.email || "Company Email",
            phone: company.phone || "Company Phone",
        },
        invoice: {
            name: invoice.name || "Invoice Name",
            date: invoice.date || "Invoice Date",
            dueDate: invoice.dueDate || "Invoice Due Date",
        },
        account: {
            name: account.name || "Account Name",
            number: account.number || "Account Number",
            ifsccoed: account.ifsccoed || "Account IFSC Code",
        },
        billing: {
            name: billing.name || "Billing Name",
            address: billing.address || "Billing Address",
            phone: billing.phone || "Billing Phone",
        },
        shipping: {
            name: shipping.name || "Shipping Name",
            address: shipping.address || "Shipping Address",
            phone: shipping.phone || "Shipping Phone",
        },

        currencySymbol: currencySymbol,
        tax: tax || 0,
        notes: notes || "Invoice Notes",
        items: items || [],
        subtotal: subtotal,
        taxAmount: taxAmount,
        total: total,
    };

}

export const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";

    const date = new Date(dateStr);
    date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month:"short",
        year: "numeric",
    });
}