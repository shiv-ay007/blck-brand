import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import Home from '../pages/Home.jsx';
import Shop from '../pages/Shop.jsx';
import Product from '../pages/Product.jsx';
import Cart from '../pages/Cart.jsx';
import Checkout from '../pages/Checkout.jsx';
import OrderConfirmed from '../pages/OrderConfirmed.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Policies from '../pages/Policies.jsx';
import NotFound from '../pages/NotFound.jsx';

export default function MainRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/policies/:slug" element={<Policies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
