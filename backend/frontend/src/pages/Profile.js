
import { useFetchProfileQuery } from '../redux/services/api';
import { Spinner } from '../components/Spinner';

export const Profile = () => {

    const access_token = JSON.parse(localStorage.getItem('access_token'))
    const response = useFetchProfileQuery(access_token)

  return (
    <div className='flex flex-col  items-center'>
         {
            response.isLoading ?
            <div className='flex  flex-col items-center mt-5'>   
                <Spinner></Spinner>
            </div>  
            :
          
            <div className="flex flex-col w-[100vw] h-[100vh]  bg-gray-300 ">
            <div className='text-center '>
                <h2 className='text-4xl font-bold'> Profile</h2>
                <div className='bg-violet-400 mx-auto w-[500px] h-[4px] mt-2 '>
                    <div className='flex flex-col  w-[500px]'>
                        <div className='text-center mt-4 text-slate-500'>
                            <p className='tracking-wider font-bold text-2xl capitalize'>Name: {response.data.name}</p>
                        </div>
                        <div className='text-center mt-4 text-slate-500' >
                            <p className='text-center mt-4 text-slate-500' >Email: {response.data.email}</p>
                        </div>
                        <div className='text-center mt-4 text-slate-500'>
                            <p className='text-center mt-4 text-slate-500' >Phone: {response.data.phone}</p>
                        </div>
                        <div className='text-center mt-4 text-slate-500' >
                            <p className='text-center mt-4 text-slate-500' >Address: {response.data.address}</p>
                        </div>
                        <div className='text-center mt-4 text-slate-500'>
                            <p className='text-center mt-4 text-slate-500'>College: {response.data.college}</p>
                        </div>
                            
                </div>
                </div>
                
            </div>
            </div>

        } 
            
    </div>
  )
}
