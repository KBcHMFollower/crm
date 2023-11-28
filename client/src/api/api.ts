import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';


const baseQuery = fetchBaseQuery({
  baseUrl:'http://localhost:5000/api',
  prepareHeaders(headers, api) {
    headers.set('Authorization', `${localStorage.getItem('token')}`);
    return headers;
  },
})

export const Api = createApi({
  reducerPath: 'API',
  baseQuery: baseQuery,
  tagTypes:['Workers', 'Clients', 'Notes'],
  endpoints: ()=>({})
});


//new
export const $host = axios.create({
  baseURL: 'http://localhost:5000/'
})


const hostInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if(config.headers){
    config.headers.Authorization = `${localStorage.getItem('token')}`;
  }
  console.log(config);
  return config;
}

$host.interceptors.request.use(hostInterceptor)

export default Api;
