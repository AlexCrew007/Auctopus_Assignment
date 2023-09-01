import React, { useEffect, useState } from 'react'
import { Books } from '../components/Books'
import { Spinner } from '../components/Spinner'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useFetchBooksQuery } from '../redux/services/api'
import { BooksList } from '../components/BooksList'

export const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterBooks, setFilterBooks] = useState([]); 
  const { data, isLoading } = useFetchBooksQuery();

  const user = useSelector((state) => state.login.user);


  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (data) {
      if (selectedCategory === 'All') {
        setFilterBooks(data);
      } else {
        setFilterBooks(data.filter((book) => book.category === selectedCategory)); 
      }
    }
  }, [selectedCategory, data]);

  return (
    <div className='flex justify-center '>
      {
        isLoading ? <Spinner /> :
          data.length > 0 && user ?
            <div className=''>
              {
                user &&
                <div className=' flex justify-center'>
                  <div className='flex gap-x-2 mt-2 '>
                      <button className='button-7' onClick={() => handleCategoryFilter("All")}>All</button>
                      <button className='button-7' onClick={() => handleCategoryFilter("Sci-Fi")}>Sci-Fi</button>
                      <button className='button-7' onClick={() => handleCategoryFilter("Fiction")}>Fiction</button>
                      <button className='button-7' onClick={() => handleCategoryFilter("Comedy")}>Comedy</button>
                  </div>
                </div>
              }
              <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]'>
                { 
                  filterBooks.map((details) => {
                    return <Books key={details.id} {...details} />
                  })
                }
              </div>
            </div>
            :
            data.length>0 ?
            <div className='flex justify-center'>
            <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]'>
            { 
                  filterBooks.map((details) => {
                    return <BooksList key={details.id} {...details} />
                  })
                }
            </div>
            </div>
            :
            <div className='flex justify-center items-center'>
              <p>No Data Found</p>
            </div>

      }
    </div>
  )
}
