import axios from 'axios';
import env from '../environment.json';

const baseUrl = `https://www.students.cs.ubc.ca/~${env.cwl}/uberdash/backend/api/order_information`;

async function getAllForDeliverer(delivererPhoneNumber, column) {
  const columnParam = column ? `&Column=${column}` : '';
  const response = await axios.get(`${baseUrl}/getAllForDeliverer.php?DelivererPhoneNumber=${delivererPhoneNumber}${columnParam}`);
  return response.data;
}

/**
 * @param {object} params
 * @param {string} params.filterType
 * @param {string} params.filterValue
 * @param {string} [params.tableName]
 **/
async function getAllForDelivererConditional(delivererPhoneNumber, params) {
  const { filterType, filterValue } = params;
  const response = await axios.get(
    `${baseUrl}/getAllForDelivererConditional.php?DelivererPhoneNumber=${delivererPhoneNumber}&FilterType=${filterType}&FilterValue=${filterValue}`
  );
  return response.data;
}

/**
 * @param {object} params
 * @param {string} params.groupType
 **/
async function getGroupCountsForDeliverer(delivererPhoneNumber, params) {
  const { groupType } = params;
  const response = await axios.get(`${baseUrl}/getGroupCountsForDeliverer.php?DelivererPhoneNumber=${delivererPhoneNumber}&Group=${groupType}`);
  return response.data;
}

async function getSingle(orderID) {
  const response = await axios.get(`${baseUrl}/getSingle.php?OrderInformation_ID=${orderID}`);
  return response.data;
}

async function updateSingleOrderStatus(newOrderData) {
  const response = await axios.post(`${baseUrl}/updateSingleOrderStatus.php`, newOrderData);
  return response.data;
}

export default {
  getAllForDeliverer,
  getAllForDelivererConditional,
  getGroupCountsForDeliverer,
  getSingle,
  updateSingleOrderStatus
};