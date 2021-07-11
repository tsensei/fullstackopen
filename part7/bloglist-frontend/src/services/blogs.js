import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (recievedToken) => {
  token = "bearer " + recievedToken;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogObject, config);

  return response.data;
};

const incLike = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const updatedObject = {
    user: blogObject.user,
    likes: blogObject.likes + 1,
    author: blogObject.author,
    title: blogObject.title,
    url: blogObject.url,
  };

  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    updatedObject,
    config
  );

  console.log("services", response.data);

  return response.data;
};

const postComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.status;
};

export default { getAll, setToken, create, incLike, postComment, deleteBlog };
