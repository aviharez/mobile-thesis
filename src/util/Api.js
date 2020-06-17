import axios from 'axios'

export default axios.create({
    baseURL: "https://fl-backend.herokuapp.com",
    timeout: 10000,
    responseType: 'json'
  })
