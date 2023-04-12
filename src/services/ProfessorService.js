import httpService from "./HttpService";

class ProfessorService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  getAll = async (queryParameters) => {
    let params = [];
    for (const param in queryParameters) {
      if (queryParameters[param]) {
        params.push(`${param}=${queryParameters[param]}`);
      }
    }
    return await this.axios.get("/teachers?" + params.join("&"));
  };

  getAvailable = async () => {
    return await this.axios.get("/gradebooks/create");
  };

  get = async (id) => {
    return await this.axios.get(`/teachers/${id}`);
  };
}

const professorService = new ProfessorService();
export default professorService;
