import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  messages: [],
  isLoading: true,
  isError: false,
  errorMessage: '',
  message: null, // Added for storing single message for editing    
};

export const getMessages = createAsyncThunk('message/allMessage', async (limit) => {
  let url='https://freetestapi.com/api/v1/books'
  if(limit){
    url=`https://freetestapi.com/api/v1/books?limit=${limit}`
  }
  const response = await fetch(url);
  const result = await response.json();
  return result;
});

export const getSingleBooksById = createAsyncThunk('message/singleMessage', async (id) => {
  const response = await fetch(`https://freetestapi.com/api/v1/books/${id}`);
  const result = await response.json();
  console.log(result);
  return result;
});
 

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.value.push(action.payload);
    },
    removeBook: (state, action) => {
      const id = action.payload;
      state.messages = state.messages.filter(single => single.id !== id);
    },

    updateBookSuccess: (state, action) => {
      const { id, cover_image , title, description } = action.payload;
      const index = state.messages.findIndex(message => message.id === id);
      if (index !== -1) {
        state.messages[index] = { ...state.messages[index],cover_image, title, description };
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMessages.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      
      .addCase(getSingleBooksById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
      });
  }
});

export const { addBook, removeBook, updateBookSuccess } = booksSlice.actions;

export default booksSlice.reducer;
