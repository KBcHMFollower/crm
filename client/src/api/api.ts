import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const Api = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes:['Workers', 'Clients', 'Notes'],
  endpoints: ()=>({})
});

export default Api;
