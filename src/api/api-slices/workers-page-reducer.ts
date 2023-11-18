import api, { Api } from "../api";
import { IRateType, IRole, IWorker } from "../interfaces";
export interface  IWorkerUpdate{
  login: string;
  pass:string;
  fname: string;
  lanme: string;
  birthday: string;
  email: string;
  phone: string;
  ratetype: string;
  rate: number;
  role: string;
}
export const workersApi = Api.injectEndpoints({
  endpoints:(builder) => ({
    fetchAllWorkers: builder.query<{ workers: IWorker[]; totalCount: number }, { limit?: number; page?: number; role?: string; rateType?: string }>({
      query: ({ limit = 1, page = 1, role = '', rateType = '' }) => {
        const roleQuery = role ? `&role=${role}` : '';
        const rateTypeQuery = rateType ? `&ratetype=${rateType}` : '';
        return `/workers?_limit=${limit}&_page=${page}${roleQuery}${rateTypeQuery}`;
      },
      transformResponse(response: IWorker[], meta) {
        console.log(response);
        return {
          workers: response,
          totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
        };
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
      query: () => `/rateTypes`, // Замените на действительный URL
    }),
    createWorker: builder.mutation<IWorker, IWorkerUpdate>({
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
        method: 'PATCH',
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