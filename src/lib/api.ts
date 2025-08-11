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
  firstName: string;
  lastName: string;
  phone: string; // added to match backend Zod
  city: string;
  country?: string;
  Additional_Information?: string;
}



interface Login {
  username:string;
  password: string;
}


export const signup = async (data: FormData) => {
  try {
    const response = await axios_instance.post("/auth/signup", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) return response.data.data;
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

export const uploadfile = async (files:any) => {
  try {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file); // backend expects 'files' key
    }

    const response = await axios_instance.post("/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("Upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export const upload_to_cloudinary=async (files:any) => {
  try {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file); // backend expects 'files' key
    }

    const response = await axios_instance.post("/file/cloudinary/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("Upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export { axios_instance };