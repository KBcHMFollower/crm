import{ FC } from 'react'
import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

type PropsType = {
    workerId:number;
    workerName:string;
    workerSname:string;
    workerRole:string;
    workerRate:string;
    workerRateType:string;
}



export const WorkerCard:FC<PropsType> = ({workerId, workerName, workerRate, workerRateType, workerRole, workerSname}) => {


    const navigate = useNavigate();
 
    const onClick = ()=>{
        navigate(`/profile/${workerId}`)
    }
    return (
        <Button onClick={onClick} variant='text' sx={{ textTransform: 'none' }}>
            <Paper elevation={5} sx={{
                display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'flex-start', flexWrap: 'wrap',
                width: '300px', padding: 2
            }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100 }} />
                <Box sx={{ width: '150px' }}>
                    <Typography noWrap={true}>{`${workerName} `}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2, justifyContent: 'space-between' }}>
                        <Typography noWrap={true}>Role: {workerRole}</Typography>
                        <Typography noWrap={true}>Rate: {workerRate}</Typography>
                        <Typography noWrap={true}>Rate-type: {workerRateType}</Typography>
                    </Box>
                </Box>
            </Paper>
        </Button>
    )
}
