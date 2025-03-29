import React from 'react'

function Paymentdetail() {
  return (
    <>
        <div className="w-full px-4  bg-white  my-10 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Payments</h2>

            {/* Payments Details Section */}
            <div className="border-b pb-4 bg-gray-100 p-5 px- ">
                <h3 className="text-lg font-medium mb-2 ">Payments Details</h3>
                <div className="grid md:grid-cols-1 gap-4 mt-7 bg-white rounded-sm p-3">
                    <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-2 ">
                        <label className="text-gray-600">Transaction Number</label>
                        <input
                            type="text"
                            value="62574845274927"

                            className=" -ml-20 px-4 py-2 border border-gray-300 rounded-md "
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2   mt-2 gap-2 ">
                        <label className="text-gray-600">Invoice</label>
                        <input
                            type="text"
                            value="MPL/28203158839"

                            className=" -ml-20 px-4 py-2 border border-gray-300 rounded-md "
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2  mt-2 gap-2 ">
                        <label className="text-gray-600">Date</label>
                        <input
                            type="text"
                            value="25 Feb 2025"

                            className=" -ml-20 px-4 py-2 border border-gray-300 rounded-md "
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2   mt-2 gap-2 ">
                        <label className="text-gray-600">Customer Name</label>
                        <input
                            type="text"
                            value="Shubham Sharma"

                            className=" -ml-20 px-4 py-2 border border-gray-300 rounded-md "
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2  mt-2 gap-2 ">
                        <label className="text-gray-600">Contact Number</label>
                        <input
                            type="text"
                            value="+91 7017148769"

                            className=" -ml-20 px-4 py-2 border border-gray-300 rounded-md "
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2  mt-2 gap-2 ">
                        <label className="text-gray-600">Status</label>
                        <input
                            type="text"
                            value="Process"

                            className=" -ml-20 px-4 py-2  border border-gray-300 rounded-md "
                        />
                    </div>
                </div>


                {/* Shipping Details Section */}
                <div className="mt-6 bg-white  rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Shipping Detail</h3>
                    <div className="grid md:grid-cols-1 xl:grid-cols-1 gap-4 mt-7 bg-white rounded-sm p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <label className="block text-gray-600">Receipt Number</label>
                            <input
                                type="text"
                                value="DCVG4845274927GKJI"

                                className=" px-4 py-2  border border-gray-300 rounded-md "
                            />                        </div>
                        <br />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <label className="block text-gray-600">Shipping by</label>
                            <input
                                type="text"
                                value="FedEx(5-6 days)"
                                className=" px-4 py-2  border border-gray-300 rounded-md "
                            />                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <label className="block text-gray-600">Address</label>
                            <input
                                type="text"
                                value="Random Federation 115302, Moscow ul. Varshavskaya, 15-2-178, Russia"
                                className=" px-4 py-2  border border-gray-300 rounded-md "
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <label className="block text-gray-600">Payment</label>
                            <input
                                type="text"
                                value="State bank of India"
                                className=" px-4 py-2  border border-gray-300 rounded-md "
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
                <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
            </div>
        </div>

    
    </>
  )
}

export default Paymentdetail