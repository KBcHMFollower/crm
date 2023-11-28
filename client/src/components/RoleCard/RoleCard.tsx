import React, { FC } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

type PropsType = {
    roleId: number;
    roleName: string;
}



export const RoleCard: FC<PropsType> = ({ roleId, roleName }) => {

    const navigate = useNavigate();

    const OnListButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const onClick = () => {
        navigate(`/clients/${roleId}`)
    }
    return (
        <Box>
            <Paper elevation={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    padding: 2
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Typography fontSize={20} noWrap={true}>{`${roleName}`}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 3,
                            mt: 2,
                            flexDirection: 'column'
                        }}>
                        <Button variant='outlined' onClick={OnListButtonClick}>Users list</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
