import axios from 'axios';
import env from '../environment.json';

const baseUrl = `https://www.students.cs.ubc.ca/~${env.cwl}/uberdash/backend/api/login`;

/**
 * @param {object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 */
async function customerLogin(credentials) {
  const response = await axios.post(`${baseUrl}/customerLogin.php`, credentials);
  return response.data;
}

/**
 * @param {object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 */
async function restaurantAdminLogin(credentials) {
  const response = await axios.post(`${baseUrl}/restaurantAdminLogin.php`, credentials);
  return response.data;
}

/**
 * @param {object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 */
async function delivererLogin(credentials) {
  const response = await axios.post(`${baseUrl}/delivererLogin.php`, credentials);
  return response.data;
}

export default { customerLogin, restaurantAdminLogin, delivererLogin };