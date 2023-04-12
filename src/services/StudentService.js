import httpService from "./HttpService";

class SudentService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  add = async (submitedStudent) => {
    return await this.axios.post("/students", submitedStudent);
  };

  delete = async (id) => {
    return await this.axios.delete(`/students/${id}`);
  };

  getByGradebookId = async (gradebookId) => {
    return await this.axios.get(`/students/${gradebookId}`);
  };
}

const studentService = new SudentService();
export default studentService;
