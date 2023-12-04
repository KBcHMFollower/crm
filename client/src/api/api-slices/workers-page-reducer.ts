import { Api } from "../api";
import { IRateType } from "../models/ratetype-model";
import { IRole } from "../models/role-model";
import { IWorker } from "../models/worker-model";
export interface  IWorkerCreate{
  fname: string;
  lname: string;
  login: string;
  pass:string;
  phone: string;
  email: string;
  birthday: string;
  rateType: string;
  rate: string;
  role: string;
}
export const workersApi = Api.injectEndpoints({
  endpoints:(builder) => ({
    fetchAllWorkers: builder.query<{count:number,rows: IWorker[]}, { limit?: number; page?: number; role?: string; name?:string}>({
      query: ({ limit = 1, page = 1, role = '', name}) => {
        const roleQuery = role ? `&role=${role}` : '';
        const nameQuery = name ? `&name=${name}` : '';
        return `/workers?limit=${limit}&page=${page}${roleQuery}${nameQuery}`;
      },
      providesTags: result=>['Workers']
    }),
    fetchGetUser: builder.query<IWorker, number>({
      query: (id) => `/workers/${id}`,
      providesTags: result=>['Workers']
    }),
    fetchGetRoles: builder.query<IRole[], null>({
      query: () => `/roles`,
      providesTags: result=>['Roles']
    }),
    fetchGetRateTypes: builder.query<IRateType[], null>({
      query: () => `/ratetypes`,
    }),
    createWorker: builder.mutation<IWorker, IWorkerCreate>({
      query: (newWorker) => ({
        url: '/workers',
        method: 'POST',
        body: newWorker,
      }),
      invalidatesTags: ['Workers']
    }),
    updateWorker: builder.mutation({
      query: ({id,stateName,dataToUpdate}) => ({
        url: `/workers/${id}`,
        method: 'PUT',
        body: {
          [stateName]:dataToUpdate
        },
      }),
      invalidatesTags: ['Workers']
    }),
    deleteWlient: builder.mutation<IWorker, number>({
      query: (id) => ({
        url: `/workers/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Workers']
    }),
  }),
})

export const { useFetchAllWorkersQuery, useFetchGetUserQuery, useCreateWorkerMutation, useFetchGetRateTypesQuery, useFetchGetRolesQuery} = workersApi;
export default workersApi;