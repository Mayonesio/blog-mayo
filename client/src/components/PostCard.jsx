import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <>
      <article className="w-72 p-2 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-600 bg-[length:200%_200%] rounded-lg hover:animate-gradient">
  <div className="relative h-full overflow-hidden text-sm rounded-md bg-white">
    <span className="absolute top-2 left-2 bg-white px-3 py-1 text-xs font-sans rounded-full">
    {post.category}
    </span>
    <div className="w-full h-44 bg-pink-200">
    <Link to={`/post/${post.slug}`}>
     <img
          src={post.image}
          alt='post cover'
          className='max-h-44 w-full'
        />
      </Link>
    </div>
    <div className="p-5 text-sm">
      <h1 className="font-bold text-lg mb-2">{post.title}</h1>
      <p>
        {post.content}
      </p>
      <Link to={`/post/${post.slug}`}><button className="w-full mt-4 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-600 bg-[length:200%_200%] text-white text-sm font-bold rounded-md py-2 transition-transform transform active:translate-y-1 hover:animate-gradient">
        Ir a la publicación
      </button>
      </Link>
          
      
    </div>
  </div>
</article>
    </>


    // <div className='group relative justify-center w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[290px] transition-all'>
    //   <Link to={`/post/${post.slug}`}>
    //     <img
    //       src={post.image}
    //       alt='post cover'
    //       className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
    //     />
    //   </Link>
    //   <div className='p-3 flex flex-col gap-2'>
    //     <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
    //     <span className='italic text-sm'>{post.category}</span>
    //     <Link
    //       to={`/post/${post.slug}`}
    //       className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
    //     >
    //       Leer artículo
    //     </Link>
    //   </div>
    // </div>
  );
}
