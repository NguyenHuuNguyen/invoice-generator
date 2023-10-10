import React, { useEffect, useState } from 'react';
import InvoiceReviewItem from '../../components/invoiceReviewItem';
import { FaRegPaperPlane } from 'react-icons/fa';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { usePDF } from 'react-to-pdf';
import { useInvoiceData } from '../../store';

type Props = {
}

const InvoiceReviewPage = (props: Props) => {
    const { invoiceData, setInvoiceData } = useInvoiceData();
    const { toPDF, targetRef } = usePDF({ filename: `invoice-${invoiceData.invoiceNumber}.pdf` });
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Months are zero-indexed
        const year = today.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        setCurrentDate(formattedDate);
    }, []);

    const handleBackgroundClick = () => {
        setInvoiceData({ ...invoiceData, isShowReview: false });
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="justify-center items-center flex fixed inset-0 bg-grey-fade" onClick={handleBackgroundClick}>
            <div className='w-[800px] flex-shrink-0 shadow-md rounded-xl bg-white text-[13px]' onClick={stopPropagation} ref={targetRef}>
                <div className='bg-[#F8F9FA] pb-[20px] flex justify-between p-[20px] rounded-l-xl rounded-r-xl rounded-b-none'>
                    <div className='flex flex-col'>
                        <p className='font-bold text-[25px]'>{invoiceData.billFrom.personName}</p>
                        <p className='font-bold text-[#747D84] text-[15px]'>Invoice #: {invoiceData.invoiceNumber}</p>
                    </div>
                    <div className='flex flex-col text-right'>
                        <p className='font-bold text-[18px]'>Amount Due</p>
                        <p className='font-bold text-[#747D84] text-[18px]'>${invoiceData.total.toFixed(2)}</p>
                    </div>
                </div>
                <div className='flex py-[20px] mx-[20px] border-solid border-b-2 border-[##E8E9EC]'>
                    <div className='basis-1/3'>
                        <p className='font-bold'>Billed To</p>
                        <p>{invoiceData.billTo.personName}</p>
                        <p>{invoiceData.billTo.billingAddress}</p>
                        <p>{invoiceData.billTo.email}</p>
                    </div>
                    <div className='basis-1/3'>
                        <p className='font-bold'>Billed From</p>
                        <p>{invoiceData.billFrom.personName}</p>
                        <p>{invoiceData.billFrom.billingAddress}</p>
                        <p>{invoiceData.billFrom.email}</p>
                    </div>
                    <div className='basis-1/3'>
                        <p className='font-bold'>Date Of Issue</p>
                        <p>{currentDate}</p>
                    </div>
                </div>
                <div className='flex flex-col mx-[20px] mb-[30px]'>
                    <div className='grid grid-cols-9 py-[5px] font-bold text-[14px] border-solid border-b-2 border-[##E8E9EC]'>
                        <p className='col-span-1'>QTY</p>
                        <p className='col-span-6'>DESCRIPTION</p>
                        <p className='col-span-1'>PRICE</p>
                        <p className='col-span-1 text-right'>AMOUNT</p>
                    </div>
                    {invoiceData.items.map((item, index) => (
                        <InvoiceReviewItem
                            key={index}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            quantity={item.quantity}
                        />
                    ))}
                    <div className='grid grid-cols-9 py-[5px] h-[30px] border-solid border-b-2 border-[##E8E9EC]'></div>
                    <div className='grid grid-cols-9 py-[5px] border-solid border-b-2 border-[##E8E9EC]'>
                        <p className='col-span-1'></p>
                        <p className='col-span-5'></p>
                        <p className='col-span-2 flex pl-[40px] font-bold text-[14px]'>SUBTOTAL</p>
                        <p className='col-span-1 text-[13px] text-right'>${invoiceData.subtotal}</p>
                    </div>
                    <div className='grid grid-cols-9 py-[5px] border-solid border-b-2 border-[##E8E9EC]'>
                        <p className='col-span-1'></p>
                        <p className='col-span-5'></p>
                        <p className='col-span-2 flex pl-[40px] font-bold text-[14px]'>TOTAL</p>
                        <p className='col-span-1 text-[13px] text-right'>${invoiceData.total.toFixed(2)}</p>
                    </div>
                </div>
                <div className='flex gap-[25px] mx-[20px] mb-[20px]'>
                    <button className='flex-1 rounded-md h-[40px] bg-[#0D6EFD] text-white font-medium flex justify-center items-center gap-[10px]'>
                        <FaRegPaperPlane></FaRegPaperPlane>
                        Send Invoice
                    </button>
                    <button className='flex-1 rounded-md h-[40px] text-[#0D6EFD] font-medium border border-[#0D6EFD] flex justify-center items-center gap-[10px]' onClick={() => toPDF()}>
                        <AiOutlineCloudDownload className='mt-[3px]' size={17}></AiOutlineCloudDownload>
                        Download Copy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InvoiceReviewPage