import axios from 'axios'

export default axios.create({
    baseURL: "https://fl-backend.herokuapp.com",
    responseType: "json"
  })
