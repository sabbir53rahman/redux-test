// EditBook.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleBooksById, updateBookSuccess } from '../books/booksSlice';

function EditBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');

  const { message, isLoading, isError } = useSelector(state => state.books);

  // Fetch the book data by ID when the component mounts
  useEffect(() => {
    dispatch(getSingleBooksById(id));
  }, [dispatch, id]);

  // Update local state when the book data changes
  useEffect(() => {
    if (message) {
      setTitle(message.title);
      setImg(message.cover_image);
      setDescription(message.description);
    }
  }, [message]);

    // Handle title input change
    const handleTitleChange = e => {
      setTitle(e.target.value);
      console.log(title)
    };
  
    // Handle description textarea change
    const handleDescriptionChange = e => {
      setDescription(e.target.value);
    };

  const handleSubmit = e => {
    e.preventDefault();
    // Dispatch action to update book
    dispatch(updateBookSuccess({
      id,
      cover_image: img,
      title: title, // Updated title value from state
      description: description, // Updated description value from state
    }));
    // Redirect to the main page after updating
    navigate('/');
  };
  




  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Sorry, something went wrong</div>;
  }

  return (
    <section className='flex container mx-auto bg-purple-100 justify-between items-center'>
      <div className="p-20 w-1/2">
        <div className="bg-white rounded-lg shadow-lg">
          <img src={img} alt="" className="rounded-t-lg" />
          <div className="p-6">
            <h2 className="font-bold mb-2 text-2xl text-purple-800">{title}</h2>
            <p className="text-purple-700 mb-2">{description}</p>
          </div>
        </div>
      </div>

      <div className='bg-gray-300 m-10 p-10 w-1/2'>
        <h1 className='text-center text-[42px] font-bold'>Edit Book</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
          <div className="group relative w-72 md:w-80 lg:w-96">
            <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Title:</label>
            <input type="text" value={title} onChange={handleTitleChange} className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg" />
          </div>
          <div className="group relative w-72 md:w-80 lg:w-96">
            <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Description:</label>
            <textarea value={description} onChange={handleDescriptionChange} className="peer h-20 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg" />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">Save</button>
        </form>
      </div>
    </section>
  );
}

export default EditBook;
