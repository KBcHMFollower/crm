import api, { Api } from "../api";
import { IRateType, IRole, IWorker } from "../interfaces";
export interface  IWorkerCreate{
  fname: string;
  lname: string;
  login: string;
  pass:string;
  phone: string;
  email: string;
  birthday: string;
  rateType: string;
  rate: number;
  role: string;
}
export const workersApi = Api.injectEndpoints({
  endpoints:(builder) => ({
    fetchAllWorkers: builder.query<{count:number,rows: IWorker[]}, { limit?: number; page?: number; role?: string;}>({
      query: ({ limit = 1, page = 1, role = ''}) => {
        const roleQuery = role ? `&role=${role}` : '';
        return `/workers?limit=${limit}&page=${page}${roleQuery}`;
      },
      providesTags: result=>['Workers']
    }),
    fetchGetUser: builder.query<IWorker, number>({
      query: (id) => `/workers/${id}`,
      providesTags: result=>['Workers'] // Замените на действительный URL
    }),
    fetchGetRoles: builder.query<IRole[], null>({
      query: () => `/roles`, // Замените на действительный URL
    }),
    fetchGetRateTypes: builder.query<IRateType[], null>({
      query: () => `/ratetypes`, // Замените на действительный URL
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
        url: `/workers/${id}`, // Замените на свой путь обновления данных
        method: 'PUT',
        body: {
          [stateName]:dataToUpdate
        },
      }),
      invalidatesTags: ['Workers']
    }),
  }),
})

export const { useFetchAllWorkersQuery, useFetchGetUserQuery, useCreateWorkerMutation, useFetchGetRateTypesQuery, useFetchGetRolesQuery} = workersApi;
export default workersApi;