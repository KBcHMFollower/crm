import React, { FC, useState } from 'react'
import { Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { IRole } from '../../api/models/role-model';
import { IRight } from '../../api/models/right-model';
import DeleteIcon from '@mui/icons-material/Delete';

type PropsType = {
    role: IRole;
    allRights: IRight[];
    addRight: (roleName: string, rightName: string) => void;
    deleteRight: (roleName: string, rightName: string) => void;
    deleteRole: (id: number) => void;
}

export const RoleCard: FC<PropsType> = ({ role, allRights, addRight, deleteRight, deleteRole }) => {

    const [openRights, setOpenRights] = useState(false);

    const onRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) addRight(role.name, e.target.name)
        else deleteRight(role.name, e.target.name)
    }

    const check = (item: number) => {
        const res = role.Rights.some(e => e.id == item)
        return res
    }

    const updateble = ((role.name !== 'ADMIN') && (role.name !== 'default'));

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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2
                        }}>
                        <Typography fontSize={20} noWrap={true}>{`${role.name}`}</Typography>
                        {updateble &&
                            <Button
                                onClick={() => deleteRole(role.id)}>
                                <DeleteIcon />
                            </Button>}

                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 3,
                            mt: 2,
                            flexDirection: 'column'
                        }}>
                        {updateble && (
                            <>
                                <Button variant='outlined' onClick={() => setOpenRights(!openRights)}>Rights list</Button>
                                <Collapse in={openRights}>
                                    <Box sx={{ display: 'flex' }}>
                                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                            {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                            <FormGroup>
                                                {allRights.map(e => <FormControlLabel
                                                    key={e.id}
                                                    control={
                                                        <Checkbox name={e.name}
                                                            checked={check(e.id)}
                                                            onChange={onRightChange} />
                                                    }
                                                    label={e.name}
                                                />)}
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </Collapse>
                            </>
                        )}

                    </Box>


                </Box>
            </Paper>
        </Box>
    )
}
