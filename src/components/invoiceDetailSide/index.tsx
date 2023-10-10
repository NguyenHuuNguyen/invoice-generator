import { useInvoiceData } from '../../store/index';

type Props = {
};

const InvoiceDetailSide = (props: Props) => {
  const { invoiceData, setInvoiceData } = useInvoiceData();

  const { currency = 'USD', taxRate = 1.00, discountRate = 1.00 } = invoiceData;

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInvoiceData({ ...invoiceData, currency: e.target.value });
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTaxRate = parseFloat(e.target.value);
    if (!isNaN(newTaxRate) && newTaxRate >= 0) {
      setInvoiceData({ ...invoiceData, taxRate: newTaxRate });
    }
  };

  const handleDiscountRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDiscountRate = parseFloat(e.target.value);
    if (!isNaN(newDiscountRate) && newDiscountRate >= 0 && newDiscountRate <= 99.99) {
      setInvoiceData({ ...invoiceData, discountRate: newDiscountRate });
    }
  };

  return (
    <div className='flex flex-col px-[10px]'>
      <div className='border-solid border-b-2 border-[##E8E9EC] pb-[20px] mb-[20px] flex'>
        <button 
          className='bg-[#0D6EFD] text-white rounded-md h-[40px] flex-1'
          type='submit'
        >
          Review Invoice
        </button>
      </div>
      <div className='mb-[20px]'>
        <p className='font-bold mb-[10px]'>Currency:</p>
        <select
          className='w-full bg-[#F8F9FA] rounded-md p-2 shadow-md text-center'
          value={currency}
          onChange={handleCurrencyChange}
        >
          <option value="USD">USD (United States Dollar)</option>
          <option value="VND">VND (Vietnamese Dong)</option>
          <option value="JPY">JPY (Japanese Yen)</option>
        </select>
      </div>
      <div className='mb-[20px]'>
        <p className='font-bold mb-[10px]'>Tax rate:</p>
        <div className='bg-white rounded-md flex items-center'>
          <input
            className='w-full p-[5px] pl-[10px] rounded-l-md border border-gray-300'
            type='number'
            step='0.01'
            min='0'
            required
            value={taxRate}
            onChange={handleTaxRateChange}
          />
          <div className='bg-[#F8F9FA] py-[5px] px-[10px] rounded-r-md border border-gray-300'>
            %
          </div>
        </div>
      </div>
      <div>
        <p className='font-bold mb-[10px]'>Discount rate:</p>
        <div className='bg-white rounded-md flex items-center'>
          <input
            className='w-full p-[5px] pl-[10px] rounded-l-md border border-gray-300'
            type='number'
            step='0.01'
            min='0'
            required
            value={discountRate}
            onChange={handleDiscountRateChange}
          />
          <div className='bg-[#F8F9FA] py-[5px] px-[10px] rounded-r-md border border-gray-300'>%</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailSide;
