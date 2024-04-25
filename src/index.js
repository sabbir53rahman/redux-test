import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
 import { Provider } from 'react-redux'
 import { store } from './features/store/store';
import EditBook from './features/editbook/EditBook';
import Details from './features/details/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path:'',
        element: <Home/>
      },
      {
        path:'About',
        element:<About/>
      },
      {
        path:'Contact',
        element:<Contact/>
      },
      {
        path:'/editbook/:id',
        element:<EditBook/>
      },
      {
        path:'/details/:id',
        element:<Details/>
      }

    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <React.StrictMode>
      <Provider store={store}>
       <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
