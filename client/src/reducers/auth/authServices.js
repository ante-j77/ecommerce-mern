import axios from "axios";

const register = async (user) => {
  const response = await axios.post(
    "http://localhost:3001/api/user/register",
    user
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (user) => {
  const response = await axios.post(
    "http://localhost:3001/api/user/login",
    user
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async (user) => {
  const response = await axios.get("http://localhost:3001/api/user/logout");
  try {
    if (response) {
      localStorage.removeItem("user");
    }
  } catch (error) {
    console.error("Error logging out: ", error);
    throw new Error("Error logging out");
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
