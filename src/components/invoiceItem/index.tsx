import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

type InvoiceItemProps = {
  item: {
    name: string;
    description: string;
    quantity: number;
    price: number;
  };
  onChange: (newItem: any) => void;
  onDelete: () => void;
};

const InvoiceItem: React.FC<InvoiceItemProps> = ({ item, onChange, onDelete }) => {
  const handleItemChange = (field: string, value: any) => {
    const newItem = { ...item, [field]: value };
    onChange(newItem);
  };

  return (
    <div className='grid grid-cols-12 py-[10px] border-solid border-b-2 border-[#F2F3F7]'>
      <div className='col-span-8 flex flex-col gap-[5px]'>
        <input
          className='bg-[#F5F7F9] rounded-md p-[5px] pl-[10px] mr-[10px]'
          placeholder='Item name'
          value={item.name || ''}
          required
          onChange={(e) => handleItemChange('name', e.target.value)}
        />
        <input
          className='bg-[#F5F7F9] rounded-md p-[5px] pl-[10px] mr-[10px]'
          placeholder='Item description'
          value={item.description || ''}
          required
          onChange={(e) => handleItemChange('description', e.target.value)}
        />
      </div>
      <div className='col-span-1 flex flex-col'>
        <input
          className='bg-[#F5F7F9] p-[5px] mx-[10px] rounded-md'
          min={1}
          type='number'
          value={item.quantity}
          required
          onChange={(e) => handleItemChange('quantity', e.target.value)}
        />
      </div>
      <div className='col-span-2 flex flex-col'>
        <div className='bg-[#F5F7F9] rounded-md flex items-center mx-[10px] pl-[8px]'>
          <RiMoneyDollarCircleLine color='#6C757D' size={30}></RiMoneyDollarCircleLine>
          <input
            className='w-full bg-transparent outline-none border-none text-right pr-2 p-[5px]'
            min={1}
            type='number'
            value={item.price}
            required
            onChange={(e) => handleItemChange('price', e.target.value)}
          />
        </div>
      </div>
      <div className='col-span-1 flex justify-center'>
        <button
          className='bg-[#DC3545] w-[35px] h-[35px] rounded-md flex justify-center items-center'
          onClick={onDelete}
        >
          <BiTrash color='white' />
        </button>
      </div>
    </div>
  );
};

export default InvoiceItem;
