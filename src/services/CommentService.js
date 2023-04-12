import httpService from "./HttpService";

class CommentService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  add = async (submitedComment) => {
    return await this.axios.post("/comments", submitedComment);
  };

  delete = async (id) => {
    return await this.axios.delete(`/comments/${id}`);
  };

  getByGradebookId = async (gradebookId) => {
    return await this.axios.get(`/comments/${gradebookId}`);
  };
}

const commentService = new CommentService();
export default commentService;
