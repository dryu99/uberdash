import axios from 'axios';
import env from '../environment.json';

const baseUrl = `https://www.students.cs.ubc.ca/~${env.cwl}/uberdash/backend/api/customers`;

// customer 

async function getAll() {
  const response = await axios.get(`${baseUrl}/getAll.php`);
  return response.data;
}

async function getSingle(phoneNumber) {
  const response = await axios.get(`${baseUrl}/getSingle.php?PhoneNumber=${phoneNumber}`);
  return response.data;
}

// customer order 

async function getAllOrders(phoneNumber, orderID) {
  let queryParams = `?PhoneNumber=${phoneNumber}`;
  if (orderID) {
    queryParams = `?PhoneNumber=${phoneNumber}&OrderID=${orderID}`;
  }
  const response = await axios.get(`${baseUrl}/viewOrders.php${queryParams}`);
  return response.data;
}

async function deleteOrder(phoneNumber, orderID) {
  const queryParams = `?PhoneNumber=${phoneNumber}&OrderID=${orderID}`;
  const response = await axios.post(`${baseUrl}/deleteOrder.php${queryParams}`);
  return response.data;
}

async function create(newData) {
  const response = await axios.post(`${baseUrl}/create.php`, newData);
  return response.data;
}

// restaurnt / menu

async function getAllRestaurants() {
  const response = await axios.get(`${baseUrl}/viewRestaurants.php`);
  return response.data;
}

async function getMenuItems(restaurantAddress) {
  const encodedRestaurantAddress = encodeURI(restaurantAddress);
  const queryParams = `?RestaurantAddress=${encodedRestaurantAddress}`;

  const response = await axios.get(`${baseUrl}/viewMenuItems.php${queryParams}`);
  return response.data;
}

// submit order

async function createOrder(phoneNumber, orderAddress, restaurantAddress, orderInfo) {
  const encodedOrderAddress = encodeURI(orderAddress);
  const encodedRestaurantAddress = encodeURI(restaurantAddress);
  const queryParams = `?PhoneNumber=${phoneNumber}&OrderAddress=${encodedOrderAddress}&RestaurantAddress=${encodedRestaurantAddress}`;
  
  const response = await axios.post(`${baseUrl}/createOrder.php${queryParams}`, orderInfo);
  return response.data;
}

// payment

async function getPayment(phoneNumber) {
  const response = await axios.get(`${baseUrl}/viewPaymentInfo.php?PhoneNumber=${phoneNumber}`);
  return response.data;
}


export default { getAll, getSingle, getAllOrders, create, deleteOrder, getAllRestaurants, getMenuItems, createOrder, getPayment };
