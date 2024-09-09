import { Link } from 'react-router-dom';

function BlogMasonry({ posts }) {
    if (!posts || posts.length === 0) {
        return <div>Loading...</div>; // o un mensaje de error
    }

    return (
        <section className="py-[120px]">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <div key={index} className="blog-listing bg-white overflow-hidden mb-8">
                            <div className="relative blog-image bg-gray-400 overflow-hidden">
                                <Link to={`/post/${post.slug}`}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110 hover:opacity-50"
                                    />
                                </Link>
                            </div>
                            <div className="p-4">
                                <div className="blog-date text-gray-500 text-xs tracking-widest uppercase pt-6">
                                    Publicado por{" "}
                                    <Link to={`/author/${post.author}`} className="text-gray-500 hover:text-black">
                                        {post.author}
                                    </Link>{" "}
                                    | {post.date}
                                </div>
                                <h2 className="blog-title text-black text-sm tracking-wider uppercase mb-4">
                                    <Link to={`/post/${post.slug}`} className="hover:text-gray-500 transition duration-200">
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="blog-short-description text-gray-600 mb-4 w-4/5">
                                    {post.description}
                                </p>
                                <div className="separator-line bg-black h-px my-2"></div>
                                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                                    <Link to={`/post/${post.slug}`} className="text-teal-500 hover:underline">
                                        Leer más
                                    </Link>
                                    <div className="flex items-center space-x-6">
                                        <a href="#" className="blog-like flex items-center text-gray-500 hover:text-teal-500 transition duration-200">
                                            <i className="fa fa-heart-o mr-1"></i>{post.likes} Likes
                                        </a>
                                        <a href="#" className="blog-share flex items-center text-gray-500 hover:text-teal-500 transition duration-200">
                                            <i className="fa fa-share-alt mr-1"></i>Share
                                        </a>
                                        <a href="#" className="comment flex items-center text-gray-500 hover:text-teal-500 transition duration-200">
                                            <i className="fa fa-comment-o mr-1"></i>{post.comments} comments
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <div className="pagination flex space-x-2">
                        <a href="#" className="text-gray-500 hover:text-teal-500">
                            <img src="/images/arrow-pre-small.png" alt="Prev" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-teal-500">1</a>
                        <a href="#" className="text-gray-500 hover:text-teal-500">2</a>
                        <a href="#" className="text-teal-500 font-bold">3</a>
                        <a href="#" className="text-gray-500 hover:text-teal-500">4</a>
                        <a href="#" className="text-gray-500 hover:text-teal-500">5</a>
                        <a href="#" className="text-gray-500 hover:text-teal-500">
                            <img src="/images/arrow-next-small.png" alt="Next" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogMasonry;
