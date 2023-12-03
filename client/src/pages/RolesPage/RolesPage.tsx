import { Box, Button, Pagination, TextField } from '@mui/material'
import { useState } from 'react'
import { RoleCard } from '../../components/RoleCard/RoleCard';
import { CreateWorkerModalWindow } from '../../modalWindows/CreateWorkerModalWindow/CreateWorkerModalWindow';
import rolesApi from '../../api/api-slices/roles-reducer';
import { CreateRoleModalWindow } from '../../modalWindows/CreateRoleModalWindow/CreateRoleModalWindow';

export const RolesPage: React.FC = () => {

    const [findName, setFindName] = useState('');
    const [workersModalOpen, setWorkersModalOpen] = useState(false);


    const { data: RolesData, isLoading: RolesLoading } = rolesApi.useGetAllRolesQuery(null)
    const {data:RightsData, isLoading: RightsLoading} = rolesApi.useGetAllRightsQuery(null);
    const [deleteRoleRight] = rolesApi.useDeleteRoleRightMutation()
    const [addRoleRight] = rolesApi.useAddRoleRightMutation()

    // addRoleRight({roleName:'teacher', rightName:'leads-section'})
    const onAddRight = (roleName: string, rightName:string) =>{
        addRoleRight({roleName:roleName, rightName:rightName});
    }

    const ondeleteRight = (roleName: string, rightName:string) =>{
        deleteRoleRight({roleName:roleName, rightName:rightName});
    }


    return (
        <Box sx={{
            minHeight: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {RightsLoading || RolesLoading || !RolesData || !RightsData ? (
                <>
                    Loading...
                </>
            ) : (
                <>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            my: 2
                        }}>
                            <Box sx={{
                                display: 'flex', gap: 1, flexWrap: 'wrap'
                            }}>
                                <TextField value={findName} onChange={(e) => setFindName(e.target.value)} id='searcher' label='Write name..' variant='filled' sx={{ backgroundColor: 'white' }} />
                            </Box>
                            <Button onClick={() => setWorkersModalOpen(true)} sx={{ height: 50 }} variant='contained'>Add Role</Button>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                            gap: 2
                        }}>
                            {RolesData.map((e) => <RoleCard role = {e}
                            key={e.id}
                             allRights={RightsData}
                             addRight={onAddRight}
                             deleteRight={ondeleteRight} />)}
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 1
                    }}>
                        <Pagination count={10}
                            shape='rounded'
                            variant='outlined'
                            onChange={(e, p) => console.log(p)} />
                    </Box>
                    <CreateRoleModalWindow open={workersModalOpen} setOpen={setWorkersModalOpen} rights={RightsData} />
                </>
            )}

        </Box>

    )
}