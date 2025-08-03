const base_url = "http://localhost:3000/api/v1";
import axios from "axios";

const axios_instance = axios.create({
  baseURL: base_url,
  timeout: 60000,
  withCredentials: true,
});

interface Signup {
  username: string;
  password: string;
  email: string;
  role?:string;
}

interface Login {
  email: string;
  password: string;
}


export const signup = async (data: Signup) => {
  try {
    const response = await axios_instance.post("/auth/signup", data);
    console.log(response.data)
    if (response.data.status === 200) return response.data.data;
    else throw new Error("Signup failed");
  } catch (error) {
    throw error;
  }
};

export const login = async (data: Login) => {
  try {
    const response = await axios_instance.post("/auth/login", data);
    console.log(response.data)
    if (response.status === 200) return response.data.data;
    else throw new Error("Login failed");
  } catch (error) {
    throw error;
  }
};

export const logout=async () => {
    try {
        const response=await axios_instance.post("/auth/logout");
        console.log(response.data)
    } catch (error) {
        throw error;
    }
}

export { axios_instance };