import { useNavigate } from 'react-router-dom';
import { CartItem} from '../components/Cartitems';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useFetchCartItemsQuery } from '../redux/services/api';
import { usePlaceOrdersMutation } from '../redux/services/api';
import { useFetchOrdersQuery } from '../redux/services/api';
import { Spinner } from '../components/Spinner'

export const Cart = () => {

  const navigate = useNavigate();
  const access_token = JSON.parse(localStorage.getItem('access_token'))
  const {data : cart, isError, isLoading, isSuccess, refetch} = useFetchCartItemsQuery(access_token);

  const [response] = usePlaceOrdersMutation();
  
  const handlePlaceOrder = async () => {
    try {
      await response(access_token); 
      toast.success('Order placed successfully!');
      refetch();
      navigate('/cart')
    } catch (error) {
      console.error('Error while placing order:', error);
    }
  };

  let totalAmount = 0;
  let totalQuantity = 0;

  if (isSuccess && cart.length > 0) {
    cart.forEach(item => {
      totalAmount += parseInt(item.total_amount);
      totalQuantity += parseInt(item.quantity);
    })
  }

  if(isLoading){
    return <div>
      <Spinner></Spinner>
    </div>
  }
  if(isError){
    return <div>
      <h1> Error </h1>
    </div>
  }

  return (
    <div className='flex flex-col items-center'>
      {
        isSuccess && cart.length>0 ?
        <div className='flex'>
          <div className=' mt-5 mr-9 mb-20  w-full '>
              {
                cart.map((item)=>{
                  return <CartItem key={item.id} {...item}></CartItem>
                })
              }
          </div>
        <div className='flex flex-col justify-between h-[500px] w-[500px] '> 
            <div className='mt-20'>
              <div className='text-green-900 text-[20px] font-semibold uppercase'>Your Cart</div>
              <div className='text-green-700 text-4xl font-semibold uppercase'>Summary</div>
             <div className=' mt-5' >
             <p  className='font-semibold text-[20px]'>
                <span>Total Items: {cart.length}</span>
              </p>
             </div>
            </div>
            <div className='font-semibold text-[18px]'>
              <p className='flex'>Total Amount: ₹{totalAmount} </p>
              <p className='flex text-[16px]'> Total Quantity : {totalQuantity}</p>
              <button
                className='bg-green-500 rounded-lg text-2xl text-white border-2 font-semibold text-[12px] p-2 px-7 uppercase hover:bg-white hover:text-green-700 transition duration-300 ease-in mb-20'
                onClick={handlePlaceOrder}
                  >
              Place Order
              </button>
            </div>
        </div>
        </div>
        
        : 
        <div className='flex' >
        <div className=' flex flex-col mt-20 justify-center items-center  '> 
          <p className='text-slate-600 font-semibold mt-20 mb-10 text-2xl' >Your Cart is Empty!</p>
          <NavLink to='/'><button className='bg-green-500 rounded-lg text-2xl
          text-white border-2
           font-semibold text-[12px] p-2 px-7  uppercase
          hover:bg-white
          hover:text-green-700 transition duration-300 ease-in'>Shop Now</button></NavLink>
        </div>
        </div>
      }
    </div>
  )
}
