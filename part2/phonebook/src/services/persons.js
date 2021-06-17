import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getPersons = () => {
  const response = axios.get(baseUrl);
  return response.then((res) => res.data);
};

const createPerson = (personObject) => {
  const response = axios.post(baseUrl, personObject);
  return response.then((res) => res.data);
};

const updatePerson = (personObject) => {
  const response = axios.put(`${baseUrl}/${personObject.id}`, personObject);
  return response.then((res) => res.data);
};

const deletePerson = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then((res) => res.status);
};

export default { getPersons, createPerson, updatePerson, deletePerson };
