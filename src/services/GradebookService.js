import httpService from "./HttpService";

class GradebookService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  getAll = async (page, queryParameters) => {
    let params = [];
    if (page) {
      params.push(`page=${page}`);
    }
    for (const param in queryParameters) {
      if (queryParameters[param]) {
        params.push(`${param}=${queryParameters[param]}`);
      }
    }

    return await this.axios.get("/home?" + params.join("&"));
  };

  get = async (id) => {
    return await this.axios.get(`/gradebooks/${id}`);
  };

  getByUserId = async (userId) => {
    return await this.axios.get(`/my-gradebook/${userId}`);
  };

  add = async (submitedGradebook) => {
    return await this.axios.post("/gradebooks/create", submitedGradebook);
  };

  edit = async (id, gradebook) => {
    return await this.axios.put(`/gradebooks/${id}/edit`, gradebook);
  };

  delete = async (id) => {
    return await this.axios.delete(`/gradebooks/${id}`);
  };
}

const gradebookService = new GradebookService();
export default gradebookService;
