export const userLoginData = (origin, userData) => {
  const userCredentials = {
    origin,
    userData,
  };
  return userCredentials;
};
