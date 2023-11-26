import { Box, Button,  Pagination, TextField} from '@mui/material'
import {useState } from 'react'
import { WorkerCard } from '../../components/WorkerCard/WorkerCard'
import { Selecter } from '../../components/Selecter/Selecter';
import { CreateWorkerModalWindow } from '../../modalWindows/CreateWorkerModalWindow/CreateWorkerModalWindow';
import { useFetchAllWorkersQuery, useFetchGetRateTypesQuery, useFetchGetRolesQuery } from '../../api/api-slices/workers-page-reducer';
import { useAppSelector } from '../../hooks/redux';

export const WorkersPage = () => {

    const limit = 9;

    const [findName, setFindName] = useState('');
    const [role, setRole] = useState('');
    const [rateType, setRateType] = useState('');
    const [page, setPage] = useState(1);

    const userRole = useAppSelector(state => state.user.workerInfo.role);

    const { data: WorkersData, error: WorkersError, isLoading: isWorkersLoading } = useFetchAllWorkersQuery({ limit: limit, page: page, role: role, rateType: rateType });
    const { data: RateTypesData, error: RateTypesError, isLoading: isRateTypesLoading } = useFetchGetRateTypesQuery(null);
    const { data: RolesData, error: RolesError, isLoading: isRolesLoading } = useFetchGetRolesQuery(null);

    const [workersModalOpen, setWorkersModalOpen] = useState(false);




    const isLoading = isRateTypesLoading || isRolesLoading || isWorkersLoading || !WorkersData || !RateTypesData || !RolesData;
    return (
        <Box sx={{ minHeight: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {isLoading ? (
                <>Loading...</>
            ) : (
                <>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                            <Box sx={{
                                display: 'flex', gap: 1, flexWrap: 'wrap'
                            }}>
                                <TextField value={findName} onChange={(e) => setFindName(e.target.value)} id='searcher' label='Write name..' variant='filled' sx={{ backgroundColor: 'white' }} />
                                <Selecter value={role} statesList={RolesData.map(e => `${e.name}`)} StateSeter={setRole} label='Role' />
                                <Selecter value={rateType} statesList={RateTypesData.map(e => `${e.name}`)} StateSeter={setRateType} label='RateType' />
                            </Box>
                            {userRole === 'admin' && (
                                <Button onClick={() => setWorkersModalOpen(true)} sx={{ height: 50 }} variant='contained'>Add worker</Button>
                            )}

                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}>
                            {WorkersData.workers.map((e) => <WorkerCard workerId={e.id} key={e.id} workerName={e.fname + ' ' + e.lanme} workerRate={e.rate.toString()} workerRateType={e.ratetype} workerRole={e.role} workerSname={e.lanme} />)}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                        <Pagination count={Math.ceil(WorkersData.totalCount / limit)} shape='rounded' variant='outlined' onChange={(e, p) => setPage(p)} />
                    </Box>

                    <CreateWorkerModalWindow open={workersModalOpen} setOpen={setWorkersModalOpen} />
                </>
            )}


        </Box>

    )
}