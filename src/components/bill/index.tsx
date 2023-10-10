import React, { useState } from 'react';

type Props = {
  textHeader: string;
  personName: string;
  onChange: (newBillInfo: any) => void;
};

const Bill = (props: Props) => {
  const [billData, setBillData] = useState({
    personName: '',
    email: '',
    billingAddress: '',
  });

  const handleBillChange = (field: string, value: any) => {
    const newBillData = { ...billData, [field]: value };
    setBillData(newBillData);
    props.onChange(newBillData);
  };

  return (
    <div className="flex flex-col gap-[10px] flex-1">
      <p className="font-bold">{props.textHeader}</p>
      <input
        className="bg-[#F5F7F9] rounded-md p-[5px] pl-[10px]"
        placeholder={props.personName}
        value={billData.personName}
        required
        onChange={(e) => handleBillChange('personName', e.target.value)}
      />
      <input
        className="bg-[#F5F7F9] rounded-md p-[5px] pl-[10px]"
        placeholder="Email address"
        value={billData.email}
        type='email'
        required
        onChange={(e) => handleBillChange('email', e.target.value)}
      />
      <input
        className="bg-[#F5F7F9] rounded-md p-[5px] pl-[10px]"
        placeholder="Billing address"
        value={billData.billingAddress}
        required
        onChange={(e) => handleBillChange('billingAddress', e.target.value)}
      />
    </div>
  );
};

export default Bill;
