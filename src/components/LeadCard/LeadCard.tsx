import { Button, Paper } from '@mui/material'
import { FC } from 'react'
import { ClientCard } from '../ClientCard/ClientCard'

type PropsType = {
    clientId:number;
    clientName:string;
    clientSname:string;
    clientDirection:string;
    goToNextStap: (id:number)=>void;
}

export const LeadCard:FC<PropsType> = ({goToNextStap, clientId, clientDirection, clientName, clientSname}) => {
    return (
        <Paper elevation={10} sx={{ display: 'flex', flexDirection: 'column' }}>
            <ClientCard
                clientId={clientId}
                clientDirection={clientDirection}
                clientName={clientName}
                clientSname={clientSname} />
            <Button onClick={()=>goToNextStap(clientId)} fullWidth>Next</Button>
        </Paper>
    )
}
