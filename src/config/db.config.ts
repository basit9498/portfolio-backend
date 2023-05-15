import mongoose from 'mongoose';

export const dataBaseConnection = (callback: () => void) => {
  mongoose
    .connect(`${process.env.DATABASR_URL}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Database is not connected please check the server!!!', err);
    });
};
