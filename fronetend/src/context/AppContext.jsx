import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

export const initialInvoiceData = {
    title: "Invoice",
    billing: {name: "", phone: "" , address: ""},
    shipping: {name: "", phone: "", address: ""},
    invoice: {name: "", date: "", dueDate: ""},
    account: {name: "", number: "", ifsccoed: ""},
    company: {name: "", phone: "", address: ""},
    tax:  0,
    notes: "",
    items: [
        { name: "", qty: "", amount: "", description: "", total: 0 },
    ],
    logo: "",
}

// Context provider component
export const AppContextProvider = ({ children }) => {
    // State to hold the invoice title
    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [selectedTemplate, setSelectedTemplate] = useState("template1");

    const baseUrl = "http://localhost:8080/api";


    // Value object provided to consumers
    const contextValue = {
        invoiceTitle,
        setInvoiceTitle,
        invoiceData,
        setInvoiceData,
        selectedTemplate,
        setSelectedTemplate,
        initialInvoiceData,
        baseUrl,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
