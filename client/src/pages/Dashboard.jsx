import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import Headerdashboard from '../components/Headerdashboard';
import Switcharrow from '../components/Switcharrow';
import { Button } from 'flowbite-react';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleSidebarItemClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Headerdashboard />
      <div className="flex flex-col md:flex-row h-screen mt-[4.45rem]">

        {/* Switcharrow solo visible en dispositivos pequeños */}
        <div className={`md:hidden fixed top-[3.45rem] z-50 p-6 h-2 w-auto ${isSidebarOpen ? 'right-0' : 'left-0'
          } `}>
          <Switcharrow isChecked={isSidebarOpen} onToggle={handleSidebarToggle} />
        </div>

      {/* Sidebar */}
      <div
        className={`w-full bg-gray-800 text-white md:fixed  h-screen overflow-hidden z-40 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } md:w-56 w-64`}
      >
        <DashSidebar onItemClick={handleSidebarItemClick} />
      </div>

      {/* Contenido principal scrollable */}
      <div
        className={`flex-1 p-6 transition-all overflow-scroll duration-300 fixed md:relative w-[100dvw] ${isSidebarOpen ? 'ml-0' : 'md:ml-56'
          }`}
      >
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'users' && <DashUsers />}
        {tab === 'comments' && <DashComments />}
        {tab === 'dash' && <DashboardComp />}
      </div>
    </div >
    </>
  );
}
