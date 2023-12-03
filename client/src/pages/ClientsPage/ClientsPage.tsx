import { Box, Button, Pagination, TextField } from '@mui/material'
import { useState } from 'react'
import { Selecter } from '../../components/Selecter/Selecter';
import { ClientCard } from '../../components/ClientCard/ClientCard';
import { useGetAllUsersQuery, useGetDirectionsQuery, useGetStatusesQuery } from '../../api/api-slices/clients-reducer';
import { CreateClientModalWindow } from '../../modalWindows/CreateClientModalWindow/CreateClientModalWindow';
import { CREATE_CLIENT, checkRights } from '../../utils/rights-utils';
import { useAppSelector } from '../../hooks/redux';

export const ClientsPage = () => {

    const limit = 12;

    const [findName, setFindName] = useState('');
    const [direction, setDirection] = useState('');
    const [status, setStatus] = useState('');
    const [workersModalOpen, setWorkersModalOpen] = useState(false);
    const [page, setPage] = useState(1);

    const { data: clientsData, isLoading: isClientsLoading } = useGetAllUsersQuery({ limit: limit, page: page, direction: direction, status: status, name: findName });
    const { data: directionsData, isLoading: isDirectionsLoading } = useGetDirectionsQuery(null);
    const { data: statusData, isLoading: isStatusLoading } = useGetStatusesQuery(null);

    const rights = useAppSelector(state=>state.user.user.rights);

    const canCreateClient = checkRights(rights, CREATE_CLIENT);

    const isLoading = !statusData || !clientsData || !directionsData || isStatusLoading || isDirectionsLoading || isClientsLoading;

    return (
        <Box sx={{
            minHeight: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {isLoading ? (
                <>Loadong...</>
            ) : (
                <>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            my: 2
                        }}>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                flexWrap: 'wrap'
                            }}>
                                <TextField value={findName}
                                    onChange={(e) => setFindName(e.target.value)}
                                    id='searcher'
                                    label='Write name..'
                                    variant='filled'
                                    sx={{ backgroundColor: 'white' }} />
                                <Selecter value={direction}
                                    statesList={directionsData.map(e => e.name)}
                                    StateSeter={setDirection}
                                    label='Direction' />
                                <Selecter value={status}
                                    statesList={statusData.map(e => e.name)}
                                    StateSeter={setStatus}
                                    label='Status' />
                            </Box>
                            <Button onClick={() => setWorkersModalOpen(true)}
                             sx={{ height: 50 }}
                             disabled={!canCreateClient} 
                             variant='contained'>
                                Add client
                                </Button>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}>
                            {clientsData.rows.map((e) => <ClientCard key={e.id}
                                clientId={e.id}
                                clientDirection={e.Direction.name}
                                clientName={e.fname}
                                clientSname={e.lname} />)}
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 1
                    }}>
                        <Pagination count={Math.ceil(clientsData.count / limit)}
                            shape='rounded'
                            variant='outlined'
                            onChange={(e, p) => setPage(p)} />
                    </Box>

                    <CreateClientModalWindow open={workersModalOpen} setOpen={setWorkersModalOpen} />
                </>
            )}

        </Box>

    )
}