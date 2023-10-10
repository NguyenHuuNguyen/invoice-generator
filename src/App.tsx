import React from 'react';
import InvoiceInputPage from './page/invoiceInputPage';
import InvoiceReviewPage from './page/invoiceReviewPage';
import { useInvoiceData } from './store';

const App: React.FC = () => {
  const { invoiceData } = useInvoiceData();

  return (
    <div>
      <InvoiceInputPage/>
      {invoiceData.isShowReview && <InvoiceReviewPage/>}
    </div>
  );
};

export default App;
