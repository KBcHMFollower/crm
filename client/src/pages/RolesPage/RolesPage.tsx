import { Box, Pagination, TextField } from '@mui/material'
import { useState } from 'react'
import { RoleCard } from '../../components/RoleCard/RoleCard';

export const RolesPage: React.FC = () => {

    const [findName, setFindName] = useState('');



    const rolesList = ['Teacher', 'Admin', 'Manager']



    return (
        <Box sx={{
            minHeight: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
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
                    {/* <Button onClick={() => setWorkersModalOpen(true)} sx={{ height: 50 }} variant='contained'>Add client</Button> */}
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    gap: 2
                }}>
                    {rolesList.map((e, index) => <RoleCard roleId={index} roleName={e} />)}
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
            {/* <CreateWorkerModalWindow open={workersModalOpen} setOpen={setWorkersModalOpen} /> */}
        </Box>

    )
}