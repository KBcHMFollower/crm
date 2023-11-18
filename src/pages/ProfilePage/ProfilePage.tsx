import { Box, Button, Paper, Typography } from '@mui/material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import workersApi, { useFetchGetUserQuery } from '../../api/api-slices/workers-page-reducer';
import { useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';
import { ProfileTextField } from '../../components/ProfileTextField/ProfileTextField';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ProfilePage: React.FC = () => {

  const { userId: idParam } = useParams();
  const { stateId, role } = useAppSelector(state => ({
    stateId: state.user.id,
    role: state.user.role 
  }));

  const userId = idParam ? +idParam : stateId;
  const updateble = role === 'admin' || 'manager' ? true : false;

  const { data: user, isLoading, error } = useFetchGetUserQuery(userId);

  const [updateWorker,{}] = workersApi.useUpdateWorkerMutation();

  return (
    <Box sx={{ minHeight: 1000 }}>
      {isLoading || !user ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box sx={{ display: 'flex', my: 1, alignItems: 'center', gap: 5 }}>
            <Button component="label" variant="text">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100 }} />
              <VisuallyHiddenInput type="file" />
            </Button>

            <Typography fontSize={20}>
              {user.fname + ' ' + user.lanme}
            </Typography>
          </Box>

          <Paper elevation={10} sx={{backgroundColor:'#B0B0B0', display: 'flex', my: 5, alignItems: 'center', gap: 5, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <ProfileTextField
            updateble = {updateble}
            defaultValue={user.fname}
            stateName='fname'
            lable = 'FirstName'
            onBlurCall={(stateName:string, newValue:string)=>updateWorker({id:Number(userId), stateName:stateName, dataToUpdate:newValue})}
            />
            <ProfileTextField
            updateble = {updateble}
            defaultValue={user.lanme}
            stateName='lanme'
            lable = 'LastName'
            onBlurCall={(stateName:string, newValue:string)=>updateWorker({id:Number(userId), stateName:stateName, dataToUpdate:newValue})}
            />
            <ProfileTextField
            updateble = {updateble}
            defaultValue={user.birthday}
            stateName='birthday'
            type='date'
            lable = 'Birthday'
            onBlurCall={(stateName:string, newValue:string)=>updateWorker({id:Number(userId), stateName:stateName, dataToUpdate:newValue})}
            />
            <ProfileTextField
            updateble = {updateble}
            defaultValue={user.phone}
            stateName='phone'
            type='number'
            lable = 'Phone'
            onBlurCall={(stateName:string, newValue:string)=>updateWorker({id:Number(userId), stateName:stateName, dataToUpdate:newValue})}
            />
            <ProfileTextField
            updateble = {updateble}
            defaultValue={user.email}
            stateName='email'
            lable = 'Email'
            onBlurCall={(stateName:string, newValue:string)=>updateWorker({id:Number(userId), stateName:stateName, dataToUpdate:newValue})}
            />
            <ProfileTextField
            updateble = {updateble}
            defaultValue={user.role}
            stateName='role'
            lable = 'Role'
            onBlurCall={(stateName:string, newValue:string)=>updateWorker({id:Number(userId), stateName:stateName, dataToUpdate:newValue})}
            />
            <ProfileTextField
            updateble = {updateble}
            defaultValue={user.ratetype}
            stateName='ratetype'
            lable = 'RateType'
            onBlurCall={(stateName:string, newValue:string)=>updateWorker({id:Number(userId), stateName:stateName, dataToUpdate:newValue})}
            />
            <ProfileTextField
            updateble = {updateble}
            type='number'
            defaultValue={user.rate.toString()}
            stateName='rate'
            lable = 'Rate'
            onBlurCall={(stateName:string, newValue:string)=>updateWorker({id:Number(userId), stateName:stateName, dataToUpdate:newValue})}
            />
          </Paper>
        </>
      )}
    </Box>
  )
}
