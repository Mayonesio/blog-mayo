import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Headerdashboard from '../components/Headerdashboard'

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <>
      <Headerdashboard />
      <div className="flex flex-col md:flex-row h-screen mt-[4.45rem]">
        {/* Sidebar */}
        <div className="w-full md:w-56 bg-gray-800 text-white md:fixed h-auto md:h-full p-7 border-b md:border-r border-gray-500">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start gap-2">
              <label className="whitespace-nowrap font-semibold">Búsqueda:</label>
              <TextInput
                placeholder="Search..."
                id="searchTerm"
                type="text"
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="font-semibold">Ordenar:</label>
              <Select
                onChange={handleChange}
                value={sidebarData.sort}
                id="sort"
                className="w-full"
              >
                <option value="desc">Recientes</option>
                <option value="asc">Antiguos</option>
              </Select>
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="font-semibold">Categoría:</label>
              <Select
                onChange={handleChange}
                value={sidebarData.category}
                id="category"
                className="w-full"
              >
                <option value="uncategorized">Descategorizado</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">Next.js</option>
                <option value="javascript">JavaScript</option>
              </Select>
            </div>
            <Button type="submit" outline gradientDuoTone="purpleToPink">
              Aplicar filtros
            </Button>
          </form>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 md:ml-56 overflow-y-auto">
          <h1 className="text-3xl font-semibold border-b border-gray-500 p-3 mt-5">
            Publicaciones encontradas:
          </h1>
          <div className="p-7 flex flex-wrap gap-4">
            {!loading && posts.length === 0 && (
              <p className="text-xl text-gray-500">
                No se encuentran publicaciones.
              </p>
            )}
            {loading && <p className="text-xl text-gray-500">Cargando...</p>}
            {!loading &&
              posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
            {showMore && (
              <button
                onClick={handleShowMore}
                className="text-teal-500 text-lg hover:underline p-7 w-full"
              >
                Mostrar más
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
