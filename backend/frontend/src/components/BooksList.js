import { toast } from 'react-hot-toast';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchCartItemsQuery } from '../redux/services/api';
import { useAddCartItemsMutation } from '../redux/services/api';


export const BooksList = ({title,price,description,image,id,category}) => {

  const navigate = useNavigate()
  const user = useSelector(state => state.login.user);

  function addToCartHandler(){
    if(!user)
    {
      navigate('/login')
    }
  }

  return (
    <div className='flex flex-col items-center justify-between
    hover:scale-110 tarnsitio duration-300 ease-in gap-3 p-3 mt-10 ml-5 rounded-xl outline'>
      <div>
        <p className='text-gray-700 font-semibold text-lg text-left
        truncate w-40 mt-1'>{title}</p>
      </div>
      <div>
        <p className='w-40 text-gray-400 font-normal text-[10px] text-left'>{description.split(" ").slice(0,10).join(" ") + "..."}</p>
      </div>
      <div className='h-[140px]'>
        <img src={image} className='h-full w-full'  alt='img' />
      </div>
      <div className='flex justify-between gap-12 items-center w-full mt-5'>
        <div>
          <p className='text-green-600 font-semibold'>{price} <span>₹</span></p>
        </div>
        <p>{category}</p> 
      </div>
      <div>
        { 
          <button 
           className='text-gray-700 border-2 border-gray-700
          rounded-full font-semibold text-[12px] p-1 px-3 uppercase
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in' 
          onClick={addToCartHandler}>Add to Cart</button>
        }
        
      </div>
    </div>
  )
}
