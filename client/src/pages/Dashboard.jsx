import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import Headerdashboard from '../components/Headerdashboard';

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
      <div className="flex flex-col md:flex-row h-screen mt-[4.45rem] relative">
        {/* Botón para mostrar/ocultar el Sidebar en móviles */}
        <button
          className={`md:hidden p-4 bg-gray-800 text-white fixed top-[4.45rem] ${
            isSidebarOpen ? 'left-56' : 'left-0'
          } transform -translate-x-1/2 z-50 transition-transform duration-300`}
          onClick={handleSidebarToggle}
          style={{ borderRadius: '0 4px 4px 0', width: '2.5rem', height: '2.5rem' }}
        >
          {isSidebarOpen ? '<<' : '>>'}
        </button>

        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white fixed md:static h-full z-40 transition-transform duration-300 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } md:w-56 w-64`}
        >
          <DashSidebar onItemClick={handleSidebarItemClick} />
        </div>

        {/* Contenido principal scrollable */}
        <div
          className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? 'ml-0' : 'md:ml-56'
          }`}
        >
          {tab === 'profile' && <DashProfile />}
          {tab === 'posts' && <DashPosts />}
          {tab === 'users' && <DashUsers />}
          {tab === 'comments' && <DashComments />}
          {tab === 'dash' && <DashboardComp />}
        </div>
      </div>
    </>
  );
}
