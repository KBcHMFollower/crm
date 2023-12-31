import Api from '../api';
import { IRight } from '../models/right-model';
import { IRole } from '../models/role-model';


interface IRolePush{
    name:string,
    rights:string[]
}

export const rolesApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        GetAllRoles: builder.query<IRole[], {name:string}>({
            query: ({name})=>{
                const nameProps = name ? `&name=${name}` : '';
                return `roles?${nameProps}`;
            },
            providesTags:result=>['Roles']
        }),
        GetAllRights: builder.query<IRight[], null>({
            query: (number)=>{
                return `/rights`;
            },
            providesTags:result=>['Rights']
        }),
        createRole: builder.mutation<IRole, IRolePush>({
            query: (newRole) => ({
              url: '/roles',
              method: 'POST',
              body: newRole,
            }),
            invalidatesTags: ['Roles']
          }),
        deleteRoleRight: builder.mutation<IRole, {roleName:string;rightName:string}>({
            query: ({roleName,rightName}) => ({
              url: `/rights/roles`,
              method: 'DELETE',
              body: {
                roleName:roleName,
                rightName:rightName
              },
            }),
            invalidatesTags: ['Roles', 'Rights']
          }),
        addRoleRight: builder.mutation<IRole, {roleName:string;rightName:string}>({
          query: ({roleName,rightName}) => ({
              url: `/rights/roles`,
              method: 'POST',
              body: {
                roleName:roleName,
                rightName:rightName
              },
            }),
            invalidatesTags: ['Roles', 'Rights']
        }),
        deleteRole: builder.mutation<IRole, number>({
          query: (id) => ({
            url: `/roles/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags: ['Roles']
        }),
      }),
})

export default rolesApi;
