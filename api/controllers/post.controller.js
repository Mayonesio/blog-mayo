import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';
import { convert } from 'html-to-text';

export const create = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(403, 'No estás autenticado'));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Rellena todos los campos requeridos'));
  }

  // Convertir HTML a texto (si tienes un editor como TipTap)
  const plainTextContent = convert(req.body.content);

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  
  const newPost = new Post({
    ...req.body,
    content: plainTextContent,
    slug,
    userId: req.user.id,  // Asegúrate de que el usuario autenticado esté presente en req.user
    author: req.user.username,  // Usa el username del usuario autenticado como autor
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};


export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .populate('userId', 'username profilePicture') // Popular el userId para obtener más detalles del autor
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};


export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'No puedes borrar esta publicación'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('Publicación borrada');
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'No puedes actualizar esta publicación'));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
