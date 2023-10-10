import React from 'react';
import InvoiceDetail from '../../components/invoiceDetail';
import InvoiceDetailSide from '../../components/invoiceDetailSide';
import { useInvoiceData } from '../../store';

type Props = {
}

const InvoiceInputPage = (props: Props) => {
    const { invoiceData, setInvoiceData } = useInvoiceData();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setInvoiceData({ ...invoiceData, isShowReview: true });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='h-full grid grid-cols-7 gap-[30px]'>
                <div className='col-span-5'>
                    <InvoiceDetail></InvoiceDetail>
                </div>
                <div className='col-span-2'>
                    <InvoiceDetailSide></InvoiceDetailSide>
                </div>
            </div>
        </form>
    )
}

export default InvoiceInputPage