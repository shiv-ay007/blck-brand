import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CartDrawer from './CartDrawer.jsx';
import ScrollToTop from '../common/ScrollToTop.jsx';

export default function Layout() {
  return <><ScrollToTop /><Header/><main id="main-content"><Outlet/></main><Footer/><CartDrawer/></>;
}
