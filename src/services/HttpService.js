import axios from "axios";

class HttpService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8000/api",
    });

    this.axiosInstance.interceptors.request.use(function(request) {
      const token = localStorage.getItem("token");

      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    });
  }
}

const httpService = new HttpService();
export default httpService;
