import React, { FC, useState } from 'react'
import { Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { IRole } from '../../api/models/role-model';
import { IRight } from '../../api/models/right-model';

type PropsType = {
    role: IRole;
    allRights : IRight[];
    addRight: (roleName:string, rightName:string) => void;
    deleteRight: (roleName:string, rightName:string) => void;
}

const rights = [{ id: 1, name: 'name1' },
{ id: 2, name: 'name2' },
{ id: 3, name: 'name3' },
{ id: 4, name: 'name4' },
{ id: 5, name: 'name5' }];

const haverights = [{ id: 1, name:'name1'}, {id: 2, name:'name3'}]


export const RoleCard: FC<PropsType> = ({role, allRights, addRight, deleteRight}) => {

    const [openRights, setOpenRights] = useState(false);

    const onRightChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.checked) addRight(role.name, e.target.name)
        else deleteRight(role.name, e.target.name)
    }

    const check = (item:number)=>{
        const res = role.Rights.some(e=>e.id == item)
        return res
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
                    <Typography fontSize={20} noWrap={true}>{`${role.name}`}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 3,
                            mt: 2,
                            flexDirection: 'column'
                        }}>
                        <Button variant='outlined' onClick={() => setOpenRights(!openRights)}>Rights list</Button>
                        <Collapse in={openRights}>
                            <Box sx={{ display: 'flex' }}>
                                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                    {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                    <FormGroup>
                                        {allRights.map(e=><FormControlLabel
                                            key={e.id}
                                            control={
                                                <Checkbox  name={e.name}
                                                checked={check(e.id)}
                                                onChange={onRightChange} />
                                            }
                                            label={e.name}
                                        />)}
                                    </FormGroup>
                                </FormControl>
                            </Box>
                        </Collapse>
                    </Box>


                </Box>
            </Paper>
        </Box>
    )
}
