import axios from 'axios'

const baseUrl = 'https://www.students.cs.ubc.ca/~dryu/cs304_project/oracle-test.php'

function getAll() {
  axios.get(`${baseUrl}`)
}