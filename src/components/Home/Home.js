import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, removeBook, getBooksByLimit } from '../../features/books/booksSlice';
import { Link } from 'react-router-dom';

function Home() {
  const { messages, isLoading, isError,  } = useSelector(state => state.books);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(null); 

  useEffect(() => {
    dispatch(getMessages()); 
  }, []);

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleLimitSubmit = () => {
    // If the user sets the limit to -1, fetch all books
    dispatch(getMessages(limit));
    
  };

  if (isError) {
    return <div>Sorry, something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='flex justify-center items-center'>
        {/* Input field for specifying the limit */}
        <div className="group relative w-72 md:w-80 lg:w-96">
            <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Inter your limit:</label>
            <input type="number" value={limit} onChange={handleLimitChange} className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg border" min="0"  max="100" />
            <button onClick={handleLimitSubmit} className='py-2 px-5 bg-green-500 rounded mt-2'>Set Limit</button>
          </div>
        
        
      </div>
      Total number of messages: {messages.length}
      <div className='container mx-auto grid grid-cols-2 gap-5 mt-2'>
        {messages.map(single => (
          <div class="p-20 bg-purple-100 w-full ">
            <div class="bg-white rounded-lg shadow-lg">
              <img src={single.cover_image} alt="" class="rounded-t-lg"/>
              <div class="p-6">
                <h2 class="font-bold mb-2 text-2xl text-purple-800">{single.title}</h2>
                <p class="text-purple-700 mb-2">{single.description}</p>
                <div className='flex justify-between'>
                  <Link to={`/editbook/${single.id}`}>
                    <button className='py-2 px-5 bg-green-500 rounded mt-2'>Edit</button>
                  </Link>
                  <Link to={`/details/${single.id}`}>
                    <button className='py-2 px-5 bg-green-500 rounded mt-2'>Details</button>
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(removeBook(single.id));
                    }}
                    className='py-2 px-5 bg-red-500 rounded mt-2'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
