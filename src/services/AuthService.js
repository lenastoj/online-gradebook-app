import httpService from "./HttpService";

class AuthService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  login = async (credentials) => {
    return await this.axios.post("/login", credentials);
  };

  register = async (userData) => {
    return await this.axios.post("/register", userData);
  };

  active_user = async () => {
    return await this.axios.get("/auth/me");
  };

  logout = async () => {
    return await this.axios.post("/logout");
  };
}

const authService = new AuthService();
export default authService;
