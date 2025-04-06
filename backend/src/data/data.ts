import mongoose from 'mongoose';
import Post from '../models/post.ts';

const MONGODB_URI = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/GlobusPointer';

mongoose.connect(MONGODB_URI) // Connection options are now defaults in Mongoose
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Fetch all posts
export const getAllPosts = async () => {
  try {
    const posts = await Post.find(); // Ensure this fetches data from the correct collection
    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    return [];
  }
};

