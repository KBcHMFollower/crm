import { Box, Button, Pagination, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { WorkerCard } from '../../components/WorkerCard/WorkerCard'
import { Selecter } from '../../components/Selecter/Selecter';
import { CreateWorkerModalWindow } from '../../modalWindows/CreateWorkerModalWindow/CreateWorkerModalWindow';
import { useFetchAllWorkersQuery, useFetchGetRolesQuery } from '../../api/api-slices/workers-page-reducer';
import { useAppSelector } from '../../hooks/redux';
import { CREATE_WORKER, checkRights } from '../../utils/rights-utils';

export const WorkersPage: FC = () => {

    const limit = 9;

    const [findName, setFindName] = useState('');
    const [role, setRole] = useState('');
    const [page, setPage] = useState(1);

    const userRights = useAppSelector(state => state.user.user.rights)

    const { data: WorkersData, error: WorkersError, isLoading: isWorkersLoading } = useFetchAllWorkersQuery({ limit: limit, page: page, role: role });
    const { data: RolesData, error: RolesError, isLoading: isRolesLoading } = useFetchGetRolesQuery(null);

    const [workersModalOpen, setWorkersModalOpen] = useState(false);

    const canCreateWorker = checkRights(userRights, CREATE_WORKER)
    const isLoading = isRolesLoading || isWorkersLoading || !WorkersData || !RolesData;
    return (
        <Box sx={{
            minHeight: 1000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {isLoading ? (
                <>Loading...</>
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
                                <Selecter value={role}
                                    statesList={RolesData.map(e => `${e.name}`)}
                                    StateSeter={setRole}
                                    label='Role' />
                            </Box>
                            {canCreateWorker && (
                                <Button onClick={() => setWorkersModalOpen(true)} sx={{ height: 50 }} variant='contained'>Add worker</Button>
                            )}

                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}>
                            {WorkersData.rows.map((e) => <WorkerCard workerId={e.id}
                                key={e.id}
                                workerName={e.fname + ' ' + e.lname}
                                workerRate={e.WorkersRate.rate.toString()}
                                workerRateType={e.WorkersRate.RateType.name}
                                workerRole={e.Role.name}
                                workerSname={e.lname} />)}
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 1
                    }}>
                        <Pagination count={Math.ceil(WorkersData.count / limit)}
                            shape='rounded'
                            variant='outlined'
                            onChange={(e, p) => setPage(p)} />
                    </Box>

                    <CreateWorkerModalWindow open={workersModalOpen} setOpen={setWorkersModalOpen} />
                </>
            )}


        </Box>

    )
}