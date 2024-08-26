import { Link } from 'react-router-dom';

function BlogLayout({ post }) {
    // Verifica que `post` no sea undefined
    if (!post) {
        return <div>Loading...</div>; // o algún mensaje de error
    }

    return (
        <section className='px-4 py-8 lg:px-20 lg:py-16'>
            <div className='flex flex-wrap lg:flex-nowrap gap-4'>
                {/* Columna Principal */}
                <div className='flex-1 lg:w-2/3'>
                    {/* Imagen Principal */}
                    <div className='mb-6'>
                        <img
                            src={post.image}
                            alt='Main Blog'
                            className='w-full h-auto rounded-lg shadow-lg'
                        />
                    </div>
                    {/* Título del Blog */}
                    <h1 className='text-3xl font-bold lg:text-5xl mb-4'>
                        {post.title}
                    </h1>
                    {/* Descripción */}
                    <p className='text-gray-500 text-xs sm:text-sm'>
                        {post.description}
                    </p>
                </div>

                {/* Sidebar */}
                <div className='w-full lg:w-1/3 flex flex-col gap-4'>
                    {/* Artículo Destacado en el Sidebar */}
                    <div className='bg-gray-100 p-4 rounded-lg shadow-lg'>
                        <img
                            src={post.sidebarImage}
                            alt='Sidebar Article'
                            className='w-full h-auto rounded-lg'
                        />
                    </div>
                    {/* Información del Artículo en el Sidebar */}
                    <div className='bg-gray-100 p-4 rounded-lg shadow-lg'>
                        <h2 className='text-lg font-semibold mb-2'>
                            {post.sidebarTitle}
                        </h2>
                        <p className='text-gray-700 mb-2'>
                            {post.sidebarDescription}
                        </p>
                        <Link
                            to={`/post/${post.slug}`}
                            className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
                        >
                            Leer artículo
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogLayout;
