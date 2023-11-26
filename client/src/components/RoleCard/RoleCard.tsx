import React, { FC, useState } from 'react'
import { Avatar, Box, Button, Checkbox, Collapse, IconButton, ListItemButton, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import { type } from 'os';

type PropsType = {
    roleId: number;
    roleName: string;
}



export const RoleCard: FC<PropsType> = ({roleId, roleName}) => {

    const navigate = useNavigate();

    const OnListButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const onClick = () => {
        navigate(`/clients/${roleId}`)
    }
    return (
        <Box>
            <Paper elevation={5} sx={{
                display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'flex-start', flexWrap: 'wrap',
                padding: 2
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography fontSize={20} noWrap={true}>{`${roleName}`}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2, flexDirection: 'column' }}>
                        <Button variant='outlined' onClick={OnListButtonClick}>Users list</Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
