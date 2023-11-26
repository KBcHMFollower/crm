import { IClient, IDirection, INote, IRateType, IRole, IStatus, IWorker } from '../interfaces';
import Api from '../api';

export interface IClientUpdate{
    direction: string;
    lessons_count:number;
    lessons_buyed:number;
    status:string;
    fname:string;
    lanme:string;
    birthday:string;
    phone:string;
    email:string;
}

export interface INotePush{
    workerid:number;
    clientid:number;
    message:string;
}

export const clientsApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        GetAllUsers: builder.query<{clients:IClient[]; totalCount:number}, {limit?:number; page?:number; direction?:string, status?:string}>({
            query: ({limit, page, direction, status})=>{
                const directionProps = direction ? `&direction=${direction}` : '';
                const statusProps = status ? `&status=${status}` : '';
                const limitProps = limit ? `&_limit=${limit}` : '';
                const pageProps = page ? `&_page=${page}` : '';
                return `clients?${limitProps}${pageProps}${directionProps}${statusProps}`;
            },
            transformResponse(response:IClient[], meta){
                return{
                    clients: response,
                    totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
                };
            },
            providesTags:result=>['Clients']
        }),
        GetNotes: builder.query<INote[], number>({
            query: (number)=>{
                return `notes?clientid=${number}`;
            },
            providesTags:result=>['Notes']
        }),
        createNote: builder.mutation<INote, INotePush>({
            query: (newNote) => ({
              url: '/notes',
              method: 'POST',
              body: newNote,
            }),
            invalidatesTags: ['Notes']
          }),
        GetClient: builder.query<IClient, number>({
            query: (id) => `/clients/${id}`,
            providesTags: result=>['Clients'] // Замените на действительный URL
          }),
        getDirections: builder.query<IDirection[], null>({
            query: ()=>'directions'
        }),
        getStatuses: builder.query<IStatus[], null>({
            query: ()=>'clientstatuses'
        }),
        updateClient: builder.mutation({
            query: ({id,stateName,dataToUpdate}) => ({
              url: `/clients/${id}`, // Замените на свой путь обновления данных
              method: 'PATCH',
              body: {
                [stateName]:dataToUpdate
              },
            }),
            invalidatesTags: ['Clients']
          }),
        createClient: builder.mutation<IClient, IClientUpdate>({
            query: (newWorker) => ({
              url: '/clients',
              method: 'POST',
              body: newWorker,
            }),
            invalidatesTags: ['Clients']
          }),
      }),
})

export const {useGetAllUsersQuery, useGetDirectionsQuery, useGetStatusesQuery, useCreateClientMutation, useUpdateClientMutation, useGetClientQuery,
useGetNotesQuery, useCreateNoteMutation} = clientsApi;
export default clientsApi;
