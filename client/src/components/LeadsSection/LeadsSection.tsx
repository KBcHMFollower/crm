import { Paper, Typography } from '@mui/material'
import { FC } from 'react'
import { LeadCard } from '../LeadCard/LeadCard'
import { useGetAllUsersQuery, useUpdateClientMutation } from '../../api/api-slices/clients-reducer'

type PropsType = {
    status: string;
    nextStatus: string;
    updateClient: (id: number, stateName: string, dataToUpdate: string) => void;
}

export const LeadsSection: FC<PropsType> = ({ status, nextStatus, updateClient }) => {

    const { data: clients, isLoading: isClientsLoading } = useGetAllUsersQuery({ status: status })

    const isLoading = !clients || isClientsLoading;

    return (
        <Paper elevation={10} sx={{
            flex: 1,
            backgroundColor: '#ADADAD',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            padding: 2
        }}>
            {isLoading ? (
                <>Loading...</>
            ) : (
                <>
                    <Typography
                        variant='h6'>
                        {status}
                    </Typography>

                    {clients.rows.map(e =>
                        <LeadCard
                            key={e.id}
                            clientDirection={e.Direction.name}
                            clientId={e.id}
                            clientName={e.fname}
                            clientSname={e.lname}
                            goToNextStap={(id: number) => updateClient(id, 'status', nextStatus)}
                        />)}
                </>
            )}


        </Paper>
    )
}
