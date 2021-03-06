import axios from 'axios';
import env from '../environment.json';

const baseUrl = `https://www.students.cs.ubc.ca/~${env.cwl}/uberdash/backend/api/payment_info`;

async function getAll() {
  const response = await axios.get(`${baseUrl}/getAll.php`);
  return response.data;
}

async function create(newData) {
  const response = await axios.post(`${baseUrl}/create.php`, newData);
  return response.data;
}

export default { getAll, create };