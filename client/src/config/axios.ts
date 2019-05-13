import _ from 'lodash'
import axios, { AxiosRequestConfig } from 'axios'


// Request Middleware
axios.interceptors.request.use((config:AxiosRequestConfig) => 
  _.assign(config, {
    // ...
  })
)