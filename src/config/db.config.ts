import mongoose from 'mongoose';

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL as string);
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw error;
//   }
// };

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.DATABASE_URL as string
    );
    console.log('Database connected successfully');
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export default connectToDatabase;
