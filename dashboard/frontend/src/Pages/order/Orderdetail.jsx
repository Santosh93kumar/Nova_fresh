import React from 'react'

function Orderdetail() {
  return (
   <>
   <h3 className='text-lg font-semibold px-10 mb-3 mt-2'>Order</h3>
     <div className=' px-10 py-4 flex flex-row'>
        
        <div className='w-8/12 flex flex-col'>
            <div className='w-full flex flex-col'>
                    <div className='flex justify-between'>
                        <p>Order Id (#$%%%)</p>
                        <div className=' flex space-x-2.5 flex-row'>
                            <button className='px-4 py-1 border border-blue-600'>Return</button>
                            <button className='px-4 py-1 border border-blue-600'>Edit Order</button>
                        </div>
                    </div>
            </div>
            <div className='w-full flex bg-white px-1.5 py-2 mt-2 flex-row'>
                <div className='text-center w-5/12'>
                    Product
                </div>
                <div className='text-center w-3/12'>
                    Total Amount
                </div>
                <div className='text-center w-2/12'>
                    Order Items
                </div>
                <div className='text-center w-2/12'>
                    Status
                </div>
            </div>
            <div className='w-full flex bg-white px-1.5 py-2  flex-row'>
                <div className='w-5/12'>
                    <div className='flex flex-row'>
                        <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSqs2NjlL8zYgbGKyO_ozdZ5f3Ku0TMjY8Oh-yQi20TvWlxwucLCCve4OmFSHsDVn5DQA96R6Q2pdT3QOe_g2ZWmifFfadQ07QQbtC5CCF3Eq24OdbutxVj9_s" className='h-12' alt="" />
                        <p className='my-auto px-3'>Nike Air Force 1'07 LV8</p>

                    </div>
                </div>
                <div className='text-center  w-3/12'>
                    $122.45
                </div>
                <div className='text-center w-2/12'>
                    01
                </div>
                <div className='w-2/12 '>
                    <p className='bg-orange-200 rounded-xl px-2 py-1 text-center'>Processing</p>
                </div>
            </div>
            <div className='w-full flex bg-white px-1.5 py-2  flex-row'>
                <div className='w-5/12'>
                    <div className='flex flex-row'>
                        <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSqs2NjlL8zYgbGKyO_ozdZ5f3Ku0TMjY8Oh-yQi20TvWlxwucLCCve4OmFSHsDVn5DQA96R6Q2pdT3QOe_g2ZWmifFfadQ07QQbtC5CCF3Eq24OdbutxVj9_s" className='h-12' alt="" />
                        <p className='my-auto px-3'>Nike Air Force 1'07 LV8</p>

                    </div>
                </div>
                <div className='text-center  w-3/12'>
                    $122.45
                </div>
                <div className='text-center w-2/12'>
                    01
                </div>
                <div className='w-2/12 '>
                    <p className='bg-orange-200 rounded-xl px-2 py-1 text-center'>Processing</p>
                </div>
            </div>
        </div>
        <div className='w-4/12  bg-white flex flex-col mx-1.5'>
                <div className='px-6 py-1'>
                <h2 className='pt-3 pb-2 font-semibold text-lg'>Order Summery</h2>
                <div className='flex py-1 text-gray-500 justify-between'>
                    <p>Sub Total :</p>
                    <p>$336.56</p>
                </div>
                <hr />
                <div className='flex py-1 text-gray-500 justify-between'>
                    <p>Discount :</p>
                    <p>+$ 50</p>
                </div>
                <hr />
                <div className='flex py-1 text-gray-500 justify-between'>
                    <p>Delivery Charge :</p>
                    <p>$33.56</p>
                </div>
                <hr />
                <div className='flex py-1 text-gray-500 justify-between'>
                    <p>Estimate Tax(18%) :</p>
                    <p>$12</p>
                </div>
                <hr />
                <div className='font-semibold py-1 flex  justify-between'>
                    <p>Sub Amount :</p>
                    <p>$3360.56</p>
                </div>
                </div>

        </div>
        

        

     </div>
   </>
  )
}

export default Orderdetail