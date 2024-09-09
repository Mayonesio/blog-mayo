import { Link } from 'react-router-dom';
// import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
// import PostCard from '../components/PostCard';
import Slider from '../components/Slider/Slider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BlogMasonry from '../components/BlogMasonry.jsx';
import PostCard from '../components/PostCard/PostCard.jsx';
import AboutMe from '../components/AboutMe.jsx';
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <Header />
      <div>
        <Slider />

        <BlogMasonry posts={posts} />


        {/* <div className='p-3 bg-amber-100 dark:bg-slate-700'>
          <CallToAction />
        </div> */}


        {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          {posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Últimas publicaciones</h2>
              <div className='flex flex-wrap gap-4'>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to={'/search'}
                className='text-lg text-teal-500 hover:underline text-center'
              >
                Ver todas las publicaciones
              </Link>
            </div>
          )}
        </div> */}
      </div >
      <Footer />
    </>
  );
}
