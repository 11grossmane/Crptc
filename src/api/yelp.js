import axios from 'axios'

// prettier-ignore
export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer 8Ea_wA4Ce_hVR-TIg48WIJSpJsEtJXs03ptkSU8gvTV1ryo7N2IQo_u9G_rov2t4-2AZAhZmKpmkYVChGJ5iqE891kij1BbE2kDgqfPXv9IQKYEfteNZeX6DB9C5XXYx',
  },
}) //same as axios, but with custom configuration, baseUrl allows for shortened url, like in express router, authorization is required usually for external apis
