// Details.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBooksById } from '../books/booksSlice';

function Details() {
  const { id } = useParams();
  const { message, isLoading, isError } = useSelector(state => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  useEffect(() => {
    dispatch(getSingleBooksById(id));
  }, [dispatch, id]);

  // Update local state when the book data changes
  useEffect(() => {
    if (message) {
      setTitle(message.title);
      setImg(message.cover_image);
      setDescription(message.description);
      setYear(message.publication_year)
      setAuthor(message.author)
    }
  }, [message]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Sorry, something went wrong</div>;
  }

  return (
    <div className="container mx-auto grid grid-cols-2 gap-10">
  {/* First column */}
  <div>
    <img src={img} alt="" className="w-full" />
  </div>
  {/* Second column */}
  <div className="flex flex-col justify-center">
    <h2 className="font-bold mb-2 text-2xl text-purple-800">{title}</h2>
    <p className="text-purple-700 mb-2">{description}</p>
    <p className="text-gray-600">Author: {author}</p>
    <p className="text-gray-600">Publication Year: {year}</p>
    {/* Add other information */}
  </div>
</div>

  );
}

export default Details;
