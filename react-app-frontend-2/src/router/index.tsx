import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../components/Layout';
import ForgetPassword from '../pages/ForgetPassword';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import Dashboard from '../pages/Dashboard';
import EditProduct from '../components/EditProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "login", 
        element: <Login onSwitchToRegister={() => window.location.href = '/register'} />
      },
      { 
        path: "register", 
        element: <Register onSwitchToLogin={() => window.location.href = '/login'} />
      },
      { 
        path: "forgot-password", 
        element: <ForgetPassword/>
      },
      { 
        path: "create-product", 
        element: <ProductForm onCancel={() => window.location.href = '/'} onSuccess={() => window.location.href = '/'} />
      },
      { 
        path: "products", 
        element: <ProductList onEditProduct={(id) => window.location.href = `/edit-product/${id}`} />
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
 