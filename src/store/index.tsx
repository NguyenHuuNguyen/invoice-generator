import React, { createContext, useState, useContext, ReactNode } from 'react';

const initialInvoiceData = {
    invoiceNumber: 1,
    dueDate: '',
    billTo: {
        personName: '',
        email: '',
        billingAddress: '',
    },
    billFrom: {
        personName: '',
        email: '',
        billingAddress: '',
    },
    items: [{
        name: '',
        description: '',
        quantity: 1,
        price: 1,
    }] as Array<any>,
    subtotal: 0.0,
    total: 0.0,
    discountRate: 0.0,
    taxRate: 0.0,
    currency: 'USD',
    notes: '',
    isShowReview: false,
};

const defaultValue = {
    invoiceData: initialInvoiceData,
    setInvoiceData: (newData: any) => { },
};

const InvoiceDataContext = createContext(defaultValue);

export function InvoiceDataProvider({ children }: { children: ReactNode }) {
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

    const updateInvoiceData = (newData: any) => {
        const subtotal = newData.items.reduce((acc: number, item: any) => {
            const itemTotal = item.price * item.quantity;
            return acc + itemTotal;
        }, 0);
        const discountAmount = subtotal * invoiceData.discountRate / 100;
        const taxAmount = (subtotal - discountAmount) * invoiceData.taxRate /100;
        const total = subtotal - discountAmount + taxAmount;
        setInvoiceData({ ...newData, subtotal, total });
    };

    return (
        <InvoiceDataContext.Provider value={{ invoiceData, setInvoiceData: updateInvoiceData }}>
            {children}
        </InvoiceDataContext.Provider>
    );
}

export function useInvoiceData() {
    return useContext(InvoiceDataContext);
}
