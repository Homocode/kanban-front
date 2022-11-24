import axios from "axios";

const baseUrl = "http://localhost:4000/api/user/logi";

export const login = async (credentials) => {
  if (process.env.REACT_APP_ENV === "dev") {
    const useremail = credentials.userData.useremail.current.value;
    const userpassword = credentials.userData.userpassword.current.value;
    console.log(useremail + userpassword);
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
  const data = await axios.post(baseUrl, credentials);
  return data;
};
