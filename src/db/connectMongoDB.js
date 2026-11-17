import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mngdbUrl = process.env.MONGO_URL;
    await mongoose.connect(mngdbUrl);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.log('Connection failed:', error.message);
    process.exit(1);
  }
};
