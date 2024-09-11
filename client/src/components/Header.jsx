import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import DarkModeSwitch from '../components/DarkModeSwitch/DarkModeSwitch';


export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const logoSrc = theme === 'light' ? '/logo.png' : '../../../../public/logoBlanco.png';


  return (

    <Navbar className='container mx-auto flex justify-between min-h-[4.45rem] items-center px-4 md:px-6 lg:px-8 max-w-[100dvw] '>
      <Link
        to='/'
      >
        <div className="relative">
          <img
            src={logoSrc}
            alt="Logo"
            className="h-[6dvh] object-contain relative"
          />
        </div>
      </Link>
      {/* <form onSubmit={handleSubmit}>
          <TextInput
            type='text'
            placeholder='Buscar...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form> */}

      {/* <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button> */}
      <div className='flex gap-2 items-center md:order-2'>

        <DarkModeSwitch />

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Perfil</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Cerrar sesión</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Iniciar
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className='uppercase'>
        <Navbar.Link  active={path === '/'} as={'div'}>
          <Link className=' hover:text-[#ec463a]' to='/'>Inicio</Link>
        </Navbar.Link>
        <Navbar.Link  active={path === '/about'} as={'div'}>
          <Link  className=' hover:text-[#ec463a]' to='/about'>Sobre mi</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/search'} as={'div'}>
          <Link className=' hover:text-[#ec463a]' to='/search'>Publicaciones</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>

  );
}
