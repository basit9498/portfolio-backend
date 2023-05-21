import mongoose from 'mongoose';

// export const dataBaseConnection = (callback: () => void) => {
//   mongoose
//     .connect(`${process.env.DATABASR_URL}`)
//     .then(() => {
//       callback();
//     })
//     .catch((err) => {
//       // eslint-disable-next-line no-console
//       console.log('Database is not connected please check the server!!!', err);
//     });
// };

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export default connectToDatabase;
