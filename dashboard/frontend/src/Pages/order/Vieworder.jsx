import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Make sure you have react-toastify installed

function Vieworder() {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    // Possible status options
    const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/`);
            const orderData = response.data;
            setOrder(orderData);
            console.log(orderData);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Function to update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            setUpdatingOrderId(orderId); // Set which order is being updated
            
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/order/status/${orderId}`,
                { status: newStatus },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // If using cookies for auth
                }
            );
            
            if (response.data.status === 1) {
                toast.success("Order status updated successfully!");
                // Refresh the order list
                fetchOrders();
            } else {
                toast.error(response.data.msg || "Failed to update order status");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Error updating order status");
        } finally {
            setUpdatingOrderId(null); // Clear updating state
        }
    };

    const detail = order.map((ord) => ({
        id: ord._id, // Make sure to include the MongoDB _id
        order_id: ord.order_id,
        date: ord.date,
        cust_name: ord.customer_name,
        item: ord.items,
        paid: ord.paid,
        status: ord.status,
        spent: ord.spent
    }));

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'text-green-500 bg-green-200';
            case 'shipped':
                return 'text-blue-500 bg-blue-200';
            case 'processing':
                return 'text-yellow-500 bg-yellow-200';
            case 'cancelled':
                return 'text-red-500 bg-red-200';
            case 'pending':
            default:
                return 'text-gray-500 bg-gray-200';
        }
    };

    return (
        <>
            <div className='flex flex-col mx-2 rounded-lg'>
                <div className="flex justify-between items-center mb-4 pl-3">
                    <h3 className='font-semibold text-lg'>Orders</h3>
                    <button 
                        onClick={fetchOrders}
                        disabled={loading}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                    >
                        {loading ? 'Refreshing...' : 'Refresh Orders'}
                    </button>
                </div>
                
                <div className='container w-full h-screen bg-white p-2'>
                    <div className='w-full flex flex-row pt-2'>
                        <div className='w-2/12'> 
                            <p className='text-xs font-semibold text-center'>ORDER ID</p>
                        </div>
                        <div className='w-2/12'> 
                            <p className='text-xs font-semibold text-center'>DATE</p>
                        </div>
                        <div className='w-2/12'> 
                            <p className='text-xs font-semibold text-center'>CUSTOMER NAME</p>
                        </div>
                        <div className='w-1/12'> 
                            <p className='text-center text-xs font-semibold'>ITEMS</p>
                        </div>
                        <div className='w-1/12'> 
                            <p className='text-center text-xs font-semibold'>PAID</p>
                        </div>
                        <div className='w-2/12'> 
                            <p className='text-center text-xs font-semibold'>STATUS</p>
                        </div>
                        <div className='w-2/12'> 
                            <p className='text-center text-xs font-semibold'>SPENT</p>
                        </div>
                    </div>
                    <hr />
                    
                    {loading && detail.length === 0 ? (
                        <div className="text-center py-4">Loading orders...</div>
                    ) : detail.length === 0 ? (
                        <div className="text-center py-4">No orders found</div>
                    ) : (
                        detail.map((item) => ( 
                            <div className='w-full flex flex-row pt-2 text-base items-center' key={item.id || item.order_id}>
                                <div className='w-2/12'> 
                                    <p className='text-base font-semibold text-center text-blue-400'>{item.order_id}</p>
                                </div>
                                <div className='w-2/12'> 
                                    <p className='text-base font-semibold text-center'>{item.date}</p>
                                </div>
                                <div className='w-2/12'> 
                                    <p className='text-base font-semibold text-center'>{item.cust_name}</p>
                                </div>
                                <div className='w-1/12'> 
                                    <p className='text-center text-base font-semibold'>{item.item}</p>
                                </div>
                                <div className='w-1/12'> 
                                    <p className='text-center text-base font-semibold px-2 py-1 text-green-500 bg-green-200 rounded-xl'>{item.paid}</p>
                                </div>
                                <div className='w-2/12 flex justify-center'> 
                                    {updatingOrderId === item.id ? (
                                        <div className="animate-pulse">Updating...</div>
                                    ) : (
                                        <select
                                            value={item.status || 'pending'}
                                            onChange={(e) => updateOrderStatus(item.id, e.target.value)}
                                            className={`text-center text-base font-semibold px-2 py-1 rounded-xl ${getStatusColor(item.status)} cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <div className='w-2/12'> 
                                    <p className='text-center text-base font-semibold'>Rs. {item.spent}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Vieworder;