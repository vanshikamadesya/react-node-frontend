import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../components/Layout';
import ForgetPassword from '../pages/ForgetPassword';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import Dashboard from '../pages/Dashboard';
import EditProduct from '../components/EditProduct';
import ResetPassword from '../pages/ResetPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "login", 
        element: <Login />
      },
      { 
        path: "register", 
        element: <Register />
      },
      { 
        path: "forgot-password", 
        element: <ForgetPassword/>
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword/>
      },
      { 
        path: "create-product", 
        element: <ProductForm />
      },
      { 
        path: "products", 
        element: <ProductList />
      },
      { 
        path: "dashboard", 
        element: <Dashboard/>
      },
      { 
        path: "edit-product/:id", 
        element: <EditProduct/>
      },
    ],
  },
]);

export default router;
 