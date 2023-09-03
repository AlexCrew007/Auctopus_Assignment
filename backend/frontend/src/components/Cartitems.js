import { useDeleteCartItemMutation } from '../redux/services/api';
import { useFetchCartItemsQuery } from '../redux/services/api';
import { useUpdateCartMutation } from '../redux/services/api';
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import {AiFillDelete} from 'react-icons/ai';
import { toast } from 'react-hot-toast';


export const CartItem = (item) => {

  const access_token = JSON.parse(localStorage.getItem('access_token'))
  const cartItem = useFetchCartItemsQuery(access_token)

  const booksItem=item.book

  
  const [readMore,  setReadMore] = useState(true)
  const [deleteCartItem] = useDeleteCartItemMutation()
  const [updateCart, useUpdateCartMutationState ] = useUpdateCartMutation()

  //Delete Handler delete items from cart
  async function deleteHandler() {
    try {
      await deleteCartItem({ access_token: access_token, id: item.book.id })
      toast.success('Item deleted!');
      cartItem.refetch()
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }


  //Handle Qunatity or Partially upadte Cart Items
  async function quantityHandler(e){
    e.preventDefault()
    const type = e.target.name
    let id = item.book.id
    if(type==='inc'){
      let quantity = item.quantity+1
      await updateCart({id,access_token,quantity})
    }
    else{
    let quantity = item.quantity-1
    if(quantity>=1){
      await updateCart({id,access_token,quantity})
      cartItem.refetch();
    }
    }
    cartItem.refetch();
  }

  

  return (
    <div className='flex mt-6  items-center '>
    { booksItem && 
      <div className='flex justify-between items-center '>
        <div className='flex w-full h-[250px] m-5 '>
          <img className='w-full'  src={booksItem.image} alt='img'/>
        </div>
        <div className=' ml-5 w-full'>
        <div className='mb-3'>
          <p className='text-gray-700  font-semibold text-2xl text-left 
            truncate  mt-1'>{booksItem.title}</p>
        </div>
        <div>
        <p className=' font-normal w-80 text-left text-[15px] text-slate-600' >
        { readMore ? booksItem.description.slice(0,200) : booksItem.description}
          { booksItem.description.length> 200 &&
            <span className='text-blue-600 cursor-pointer' onClick={()=>setReadMore(!readMore)}> 
            {readMore ? '...read more' : '...show less'}
          </span>
          }
        </p>
        <p className='font-semibold'><span className='text-green-600 font-semibold'>{booksItem.category}</span> </p>

        
        </div>
          <div>
          <div className='flex justify-between gap-12 items-center w-full mt-10'>
          <div className='flex justify-between '>
            <p className='text-green-600 font-semibold'>{booksItem.price} <span>₹</span></p>
          </div>
          </div>
          <p> Quantity :</p>
          <div className='flex'>
          <Button name='inc' onClick={quantityHandler}>+</Button>
            <p className='font-semibold'> <span className='text-green-600 font'>{item.quantity}</span></p>
            <Button name='dec' onClick={quantityHandler}>-</Button>
          </div>
          <div className='relative text-[40px] '>
            <button className='absolute -top-8 -right-2 rounded-full bg-red-400 text-3xl' onClick={deleteHandler}><AiFillDelete/></button>
            </div>
          </div>
        </div>
      </div> 
    }
    </div>
  )
}
