import Api from '../api';
import { IClient } from '../models/client-model';
import { IDirection } from '../models/direction-model';
import { INote } from '../models/note-model';
import { IStatus } from '../models/status-model';

export interface IClientCreate{
    direction: string;
    status:string;
    fname:string;
    lname:string;
    birthday:string;
    phone:string;
    email:string;
}

export interface INotePush{
    workerid:number;
    clientid:number;
    content:string;
}

export const clientsApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        GetAllUsers: builder.query<{rows: IClient[], count:number}, {limit?:number; page?:number; direction?:string, status?:string, name?:string}>({
            query: ({limit, page, direction, status, name})=>{
                const directionProps = direction ? `&direction=${direction}` : '';
                const statusProps = status ? `&status=${status}` : '';
                const nameProps = name ? `&name=${name}` : '';
                const limitProps = limit ? `&limit=${limit}` : '';
                const pageProps = page ? `&page=${page}` : '';
                return `clients?${limitProps}${pageProps}${directionProps}${statusProps}${nameProps}`;
            },
            providesTags:result=>['Clients']
        }),
        GetNotes: builder.query<{rows:INote[], count:number}, number>({
            query: (number)=>{
                return `/notes?clientid=${number}`;
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
            providesTags: result=>['Clients']
          }),
        DeleteClient: builder.mutation<IClient, number>({
          query: (id) => ({
            url: `/clients/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags: ['Clients']
        }),
        getDirections: builder.query<IDirection[], null>({
            query: ()=>'/directions'
        }),
        getStatuses: builder.query<IStatus[], null>({
            query: ()=>'/statuses'
        }),
        updateClient: builder.mutation({
            query: ({id,stateName,dataToUpdate}) => ({
              url: `/clients/${id}`,
              method: 'PUT',
              body: {
                [stateName]:dataToUpdate
              },
            }),
            invalidatesTags: ['Clients']
          }),
        createClient: builder.mutation<IClient, IClientCreate>({
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
useGetNotesQuery, useCreateNoteMutation, useDeleteClientMutation} = clientsApi;
export default clientsApi;
