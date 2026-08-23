import axios from 'axios';
import { Routes, Route } from 'react-router'
import { HomePage } from './Pages/home/HomePage'
import { CheckoutPage } from './Pages/checkout/CheckoutPage'
import { OrdersPage } from './Pages/orders/OrdersPage'
import { NotFoundPage } from './Pages/notfound/NotFoundPage';
import { TrackingPage } from './Pages/tracking/TrackingPage'
import './App.css'
import { useEffect,useState } from 'react';

function App() {
  
  const [cart, setCart] = useState([]);

    const loadCart = async() =>{
    const response = await axios.get('/api/cart-items?expand=product');
                setCart(response.data);  
    };

  useEffect(() => {
     axios.get('/api/cart-items?expand=product')
            .then((response) => {
                setCart(response.data);
            });

  }, []);
  

        

  return (
    <Routes>
      <Route path='/' element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path='orders' element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
   
  )
}

export default App
 