import React, { useEffect } from 'react'
import { useFetchOrdersQuery } from '../redux/services/api'
import { useFetchProfileQuery } from '../redux/services/api'
import { Spinner } from '../components/Spinner'

export const Orders = () => {

  const access_token = JSON.parse(localStorage.getItem('access_token'))
  const profile = useFetchProfileQuery(access_token)
  
  const { data, isError, isLoading, isSuccess, error, refetch } = useFetchOrdersQuery(access_token)
  
  const orders = data || []
  let totalAmount = 0;
  let totalQuantity = 0;

  if (isSuccess && orders.length > 0) {
    orders.forEach(item => {
      totalAmount += parseInt(item.total_amount);
      totalQuantity += parseInt(item.quantity);
    })
  }
  useEffect(()=>{
    refetch()
  },[])
  if(isError){
    return (
      <div>
        <p>Something went wrong {error}</p> 
      </div>
    )
  }
  
  return (
    <div className='flex flex-col text-center w-full h-[100vh] border'>
      <div className='border'>
        <h1 className='text-center border text-[20px]'>Your Orders</h1>
      </div>
       
        {
          isLoading ? <Spinner></Spinner> :
          orders.length === 0 ? <p>No orders placed</p> :
          <div className='bg-slate-300 h-[100vh] flex justify-between' >
          <div className='flex flex-col w-1/2'>
          {
          orders.map(order => (
          <div key={order.id} className='border p-2 '>
            <h2 >Order ID: {order.id}</h2>
            <div className='text-left'>
              <p>Total Amount: ₹{order.total_amount}</p>
              <p>Total Quantity: {order.quantity}</p>
              {order.book ? (
                <div className=' '>
                <p>
                  {order.book.title} - ₹{order.book.price}
                </p>
                <img style={{ width: '80px', height: '80px' }} src={order.book.image}></img>
                </div>
              ) : (
                <p>Book not available</p>
              )}
            </div>
          </div>
        ))
          }
        </div>
        <div className='flex flex-col font-semibold text-[18px] m-4'>
        { profile.isSuccess &&
          <div>
          <p className='flex'>Name  : {profile.data.name}</p>
          <p className='flex'>Phone : {profile.data.phone}</p>
          <p className='flex'>Address : {profile.data.address}</p>
          <p className='flex'> Total Quantity : {totalQuantity}</p>
          <p className='flex' >Grand Total : ₹ {totalAmount}</p>
          </div>
        }
        </div>
        </div>
        }
    </div>
    
  )
}
