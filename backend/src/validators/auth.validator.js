export const validateLogin = (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};