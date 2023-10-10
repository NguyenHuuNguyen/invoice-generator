import React from 'react'

type Props = {
    quantity: number,
    name: string,
    description: string,
    price: number,
}

const InvoiceReviewItem = (props: Props) => {
    return (
        <div className='grid grid-cols-9 py-[5px] text-[13px] border-solid border-b-2 border-[##E8E9EC]'>
            <p className='col-span-1'>{props.quantity}</p>
            <p className='col-span-6'>{props.name} - {props.description}</p>
            <p className='col-span-1'>{props.price}</p>
            <p className='col-span-1 text-right'>{props.price * props.quantity}</p>
        </div>
    )
}

export default InvoiceReviewItem