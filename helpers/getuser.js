import axios from "axios";

const getuser = async (email) => {
  const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/getuser`, {
    email: email,
  });

  if (response.statusText === "OK") {
    return response.data;
  }
};

export default getuser;
