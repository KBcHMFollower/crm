import { Paper, Typography } from '@mui/material'
import { FC } from 'react'
import { LeadCard } from '../LeadCard/LeadCard'
import { useGetAllUsersQuery, useGetClientQuery, useUpdateClientMutation } from '../../api/api-slices/clients-reducer'

type PropsType = {
    status: string;
    nextStatus:string;
}

export const LeadsSection: FC<PropsType> = ({ status, nextStatus }) => {

    const { data: clients, isLoading:isClientsLoading } = useGetAllUsersQuery({ status: status })
    
    const [updateClient,{}] = useUpdateClientMutation();

    const isLoading  = !clients || isClientsLoading;

    return (
        <Paper elevation={10} sx={{ flex: 1, backgroundColor: '#ADADAD', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 2, alignItems: 'center', padding: 2 }}>
            {isLoading ? (
                <>Loading...</>
            ) : (
                <>
                    <Typography
                        variant='h6'>
                        {status}
                    </Typography>

                    {clients.clients.map(e=>
                    <LeadCard
                    clientDirection={e.direction}
                    clientId={e.id}
                    clientName={e.fname}
                    clientSname={e.lanme}
                    goToNextStap={(id:number)=>updateClient({id:id, stateName:'status', dataToUpdate: nextStatus})}
                    />)}
                    {/* <LeadCard
                clientId={1}
                clientDirection='asd'
                clientName='awsdawsd'
                clientSname='awsdaws'
                goToNextStap={() => { }} /> */}
                </>
            )}


        </Paper>
    )
}
