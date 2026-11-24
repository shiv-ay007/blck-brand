import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] flex font-sans antialiased text-neutral-900 selection:bg-[#028f99] selection:text-white">
      {/* Sidebar Navigation with Internal Hamburger Button */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={toggleSidebar}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area (Smoothly transitions between md:pl-72 and md:pl-20) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:pl-20' : 'md:pl-72'
        }`}
      >
        {/* Top Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Dynamic Nested Content via Outlet */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-[1560px] w-full mx-auto transition-all">
          <Outlet />
        </main>

        {/* Bottom Footer */}
        <Footer />
      </div>
    </div>
  );
}
