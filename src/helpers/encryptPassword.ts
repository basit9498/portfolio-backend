import bcrypt from 'bcrypt';

export const ecryptPassword = async (
  password: string
): Promise<string | Error> => {
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    return hashPassword;
  } catch (error) {
    throw error;
  }
};
