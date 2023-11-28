import{ FC } from 'react'
import { Paper, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';



type PropsType = {
  updateble:boolean;
  defaultValue:string | Date;
  stateName:string;
  lable:string;
  type?:'number' | 'date'
  onBlurCall : (stateName:string, newValue:string)=>void;
}

export const ProfileTextField:FC<PropsType> = ({type,lable,onBlurCall, stateName, updateble, defaultValue}) => {
  return (
    <Paper sx={{ width: '300px', display: 'flex', gap:1, justifyContent: 'space-between', padding: 1, alignItems:'center' }} elevation={4}>
        <Typography fontSize={20}>
          {lable}
        </Typography>
        <TextField
        type={type ? type : 'text'}
          required
          defaultValue={defaultValue}
          disabled = {!updateble}
          onBlur={(e)=>onBlurCall(stateName, e.target.value)}
          />
    </Paper>
  )
}
