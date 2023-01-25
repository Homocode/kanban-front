const baseUrl = "http://localhost:4000/api/user/logi";
const REACT_APP_ENV = "dev";

export const login = async (credentials) => {
  if (REACT_APP_ENV === "dev") {
    if (credentials.userData.email_verified) {
      return {
        isAuth: true,
        userData: {
          name: "ger",
          token: 1,
        },
      };
    }

    const useremail = credentials.userData.useremail.current.value;
    const userpassword = credentials.userData.userpassword.current.value;

    if (
      useremail === "germancalella@gmail.com" &&
      userpassword === "berta123"
    ) {
      return {
        isAuth: true,
        userData: {
          name: "ger",
          token: 1,
        },
      };
    } else {
      throw Error("Bad Credentials");
    }
  }
};

export const userLoginData = (origin, userData) => {
  const userCredentials = {
    origin,
    userData,
  };
  return userCredentials;
};
