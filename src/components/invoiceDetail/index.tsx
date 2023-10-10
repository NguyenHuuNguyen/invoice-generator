import React, { useState, useEffect } from 'react';
import Bill from '../bill';
import InvoiceItem from '../invoiceItem';
import { useInvoiceData } from '../../store';

type Props = {}

const InvoiceDetail = (props: Props) => {
  const [currentDate, setCurrentDate] = useState('');
  const { invoiceData, setInvoiceData } = useInvoiceData();

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-indexed
    const year = today.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleItemsChange = (newItems: any) => {
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const handleAddItem = () => {
    const newItem = {
      itemName: '',
      itemDescription: '',
      quantity: 1,
      price: 1,
    };
    const newItems = [...invoiceData.items, newItem];
    handleItemsChange(newItems);
  };

  const handleItemChange = (newItem: any, index: number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = newItem;
    handleItemsChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    handleItemsChange(newItems);
  };

  return (
    <div className='flex flex-col bg-white shadow-md rounded-lg p-[40px]'>
      <div className='border-solid border-b-2 border-[#F2F3F7] pb-[40px] mb-[40px]'>
        <div className='flex justify-between'>
          <div>
            <span className='font-bold'>Current Date: </span>
            <span>{currentDate}</span>
          </div>
          <div className='flex gap-[10px] items-center'>
            <p className='font-bold'>Invoice Number:</p>
            <input
              className='bg-[#F5F7F9] max-w-[70px] p-[5px] pl-[10px] rounded-md'
              min={1}
              type='number'
              value={invoiceData.invoiceNumber}
              required
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })
              }
            />
          </div>
        </div>
        <div className='flex items-center gap-[10px]'>
          <p className='font-bold'>Due Date:</p>
          <input
            type='date'
            className='max-w-[150px] bg-[#F5F7F9] rounded-md p-[5px] pl-[10px]'
            value={invoiceData.dueDate}
            required
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, dueDate: e.target.value })
            }
          />
        </div>
      </div>
      <div className='flex gap-[30px] basis-1 border-solid border-b-2 border-[#F2F3F7] pb-[40px]'>
        <Bill textHeader={'Bill to:'} personName={'Who is this invoice to?'} onChange={(billInfo) => setInvoiceData({ ...invoiceData, billTo: billInfo })}/>
        <Bill textHeader={'Bill from:'} personName={'Who is this invoice from?'} onChange={(billInfo) => setInvoiceData({ ...invoiceData, billFrom: billInfo })}/>
      </div>
      <div className='flex flex-col mb-[20px]'>
        <div className='grid grid-cols-12 py-[10px] border-solid border-b-2 border-[#F2F3F7]'>
          <div className='col-span-8 flex items-center font-bold'>ITEM</div>
          <div className='col-span-1 flex items-center pl-[10px] font-bold'>QTY</div>
          <div className='col-span-2 flex items-center pl-[10px] font-bold'>PRICE/RATE</div>
          <div className='col-span-1 flex items-center pl-[10px] font-bold'>ACTION</div>
        </div>
        {invoiceData.items.map((item, index) => (
          <InvoiceItem
          key={index}
          item={item}
          onChange={(newItem) => handleItemChange(newItem, index)}
          onDelete={() => handleRemoveItem(index)}
        />
        ))}
        <button
          type='button'
          className='bg-[#0D6EFD] text-white rounded-md max-w-[100px] h-[40px] mt-[10px]'
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
      <div className='flex border-solid border-b-2 border-[#F2F3F7] mb-[25px]'>
        <div className='basis-1/2'></div>
        <div className='basic-1/2 flex flex-col pb-[20px] flex-1'>
          <div className='border-solid border-b-2 border-[#F2F3F7] pb-[15px] mb-[15px] flex flex-col gap-[15px]'>
            <div className='flex justify-between'>
              <p className='font-bold'>Subtotal:</p>
              <p>${invoiceData.subtotal.toFixed(2)}</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-bold'>Discount:</p>
              <p>
                ({invoiceData.discountRate.toFixed(2)}%)
                 ${((invoiceData.subtotal * invoiceData.discountRate) / 100).toFixed(2)}
              </p>
            </div>
            <div className='flex justify-between'>
              <p className='font-bold'>Tax:</p>
              <p>
                ({invoiceData.taxRate.toFixed(2)}%)
                 ${((invoiceData.subtotal - (invoiceData.subtotal * invoiceData.discountRate / 100)) * invoiceData.taxRate /100).toFixed(2)}
              </p>
            </div>
          </div>
          <div className='flex justify-between font-bold text-[18px]'>
            <p>Total:</p>
            <p>${invoiceData.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <p className='font-bold mb-[20px]'>Notes:</p>
        <textarea
          className='bg-[#F5F7F9] rounded-md p-2'
          placeholder='Thanks for your business'
          rows={1}
          value={invoiceData.notes}
          onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
};

export default InvoiceDetail