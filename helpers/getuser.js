import axios from "axios";

const getuser = async (email) => {
  const response = await axios.post("http://localhost:3000/api/getuser", {
    email: email,
  });

  if (response.statusText === "OK") {
    return response.data;
  }
};

export default getuser;
