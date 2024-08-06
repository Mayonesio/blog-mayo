import React, { useState } from 'react';


function HeroSport() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="bg-gray-100 py-2">
          <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8 max-w-screen-xl">
            {/* <!-- Contact Info --> */}
            <div className="flex space-x-5">
              <ul className="flex space-x-5 text-gray-600">
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span>Jl. Sunset Road No. 99 Kuta</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-1"></i>
                  <span>homerun@domain.com</span>
                </li>
              </ul>
            </div>

            {/* <!-- Social Icons --> */}
            <div className="flex space-x-2">
              <ul className="flex space-x-2">
                <li><a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white hover:opacity-90"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-400 text-white hover:opacity-90"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 text-white hover:opacity-90"><i className="fab fa-instagram"></i></a></li>
                <li><a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white hover:opacity-90"><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-5">
          <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-8 max-w-screen-xl">
            {/* <!-- Logo --> */}
            <div className="flex-shrink-0">
              <a href="/" className="inline-block">
                <img
                  src="https://templatekit.jegtheme.com/homerun/wp-content/uploads/sites/284/2022/05/Homerun-logo-2G2WWT-1024x900.png"
                  alt="Logo"
                  className="max-h-16 object-contain"
                />
              </a>
            </div>

            {/* <!-- Navigation Menu --> */}
            <nav className={`flex-1 ${menuOpen ? 'block' : 'hidden'} md:block`}>
              <ul className="flex space-x-4 text-gray-800 font-semibold">
                <li><a href="/" className="py-1 px-2 hover:text-blue-500">Home</a></li>
                <li><a href="/about" className="py-1 px-2 hover:text-blue-500">About</a></li>
                <li><a href="/schedule" className="py-1 px-2 hover:text-blue-500">Schedule</a></li>
                <li className="relative group">
                  <a href="#" className="py-1 px-2 hover:text-blue-500">Features</a>
                  <ul className="absolute left-0 hidden mt-1 bg-white border border-gray-300 shadow-lg group-hover:block">
                    <li><a href="/trophy" className="block py-2 px-4 hover:bg-gray-100">Trophy</a></li>
                    <li><a href="/players" className="block py-2 px-4 hover:bg-gray-100">Players</a></li>
                    <li><a href="/ticket" className="block py-2 px-4 hover:bg-gray-100">Ticket</a></li>
                    <li><a href="/academy" className="block py-2 px-4 hover:bg-gray-100">Academy</a></li>
                    <li><a href="/404-page" className="block py-2 px-4 hover:bg-gray-100">404 Page</a></li>
                  </ul>
                </li>
                <li className="relative group">
                  <a href="#" className="py-1 px-2 hover:text-blue-500">Blog</a>
                  <ul className="absolute left-0 hidden mt-1 bg-white border border-gray-300 shadow-lg group-hover:block">
                    <li><a href="/blog" className="block py-2 px-4 hover:bg-gray-100">Blog</a></li>
                    <li><a href="/single-post" className="block py-2 px-4 hover:bg-gray-100">Single Post</a></li>
                  </ul>
                </li>
                <li><a href="/contact" className="py-1 px-2 hover:text-blue-500">Contact</a></li>
              </ul>
            </nav>

            {/* <!-- Search Bar --> */}
            <div className={`hidden ${menuOpen ? 'block' : 'md:block'}`}>
              <form role="search" method="get" action="/" className="flex items-center">
                <input
                  type="search"
                  placeholder="Search..."
                  name="s"
                  className="border border-gray-300 px-3 py-2 rounded-lg outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 flex items-center"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>

            {/* <!-- Mobile Menu Button --> */}
            <button
              className="block md:hidden bg-none border-none text-gray-800 text-xl"
              onClick={toggleMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeroSport;
