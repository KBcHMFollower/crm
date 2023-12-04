import { Box, Button, Paper, Typography } from '@mui/material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import workersApi, { useFetchGetUserQuery } from '../../api/api-slices/workers-page-reducer';
import { useAppSelector } from '../../hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileTextField } from '../../components/ProfileTextField/ProfileTextField';
import { DELETE_WORKER, UPDATE_WORKER, checkRights } from '../../utils/rights-utils';
import DeleteIcon from '@mui/icons-material/Delete';
import rolesApi from '../../api/api-slices/roles-reducer';
import { ProfileSelector } from '../../components/ProfileSelector/ProfileSelecter';

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

  const navigate = useNavigate();

  const { userId: idParam } = useParams();

  const { stateId, rights } = useAppSelector(state => ({
    stateId: state.user.user.id,
    rights: state.user.user.rights,
  }));

  const userId = idParam ? +idParam : stateId;

  const { data: user, isLoading: userLoading, error } = useFetchGetUserQuery(userId);
  const { data: rolesData, isLoading: rolesLoading } = rolesApi.useGetAllRolesQuery({ name: '' });
  const { data: rateTypesData, isLoading: rateTypesLoading } = workersApi.useFetchGetRateTypesQuery(null);


  const [updateWorker, { }] = workersApi.useUpdateWorkerMutation();
  const [deleteWorker, { }] = workersApi.useDeleteWlientMutation()

  const updateble = (checkRights(rights, UPDATE_WORKER) && (userId != stateId) && (user?.Role.name !== 'ADMIN')) ? true : false;
  const deleteble = (checkRights(rights, DELETE_WORKER) && (userId != stateId) && (user?.Role.name !== 'ADMIN')) ? true : false;

  const isLoading = userLoading || rolesLoading || rateTypesLoading || !user || !rolesData || !rateTypesData;

  const onDeleteWorker = () => {
    deleteWorker(userId).then(() => {
      navigate('/workers');
    })
  };

  return (
    <Box sx={{ minHeight: 1000 }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <Box sx={{
              display: 'flex',
              my: 1,
              alignItems: 'center',
              gap: 5
            }}>
              <Button component="label" variant="text">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"
                  sx={{
                    width: 100,
                    height: 100
                  }} />
                <VisuallyHiddenInput type="file" />
              </Button>

              <Typography fontSize={20}>
                {user.fname + ' ' + user.lname}
              </Typography>
            </Box>

            <Button
              disabled={!deleteble}
              onClick={onDeleteWorker}>
              <DeleteIcon fontSize='large' />
            </Button>
          </Box>

          <Paper elevation={10}
            sx={{
              backgroundColor: '#B0B0B0',
              display: 'flex',
              my: 5,
              alignItems: 'center',
              gap: 5,
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
            <ProfileTextField
              updateble={updateble}
              defaultValue={user.fname}
              stateName='fname'
              lable='FirstName'
              onBlurCall={(stateName: string, newValue: string) => updateWorker({ id: Number(userId), stateName: stateName, dataToUpdate: newValue })}
            />
            <ProfileTextField
              updateble={updateble}
              defaultValue={user.lname}
              stateName='lname'
              lable='LastName'
              onBlurCall={(stateName: string, newValue: string) => updateWorker({ id: Number(userId), stateName: stateName, dataToUpdate: newValue })}
            />
            <ProfileTextField
              updateble={updateble}
              defaultValue={user.phone}
              stateName='phone'
              type='number'
              lable='Phone'
              onBlurCall={(stateName: string, newValue: string) => updateWorker({ id: Number(userId), stateName: stateName, dataToUpdate: newValue })}
            />
            <ProfileTextField
              updateble={updateble}
              defaultValue={user.email}
              stateName='email'
              lable='Email'
              onBlurCall={(stateName: string, newValue: string) => updateWorker({ id: Number(userId), stateName: stateName, dataToUpdate: newValue })}
            />
            <ProfileSelector
              statesList={rolesData.map(e => e.name)}
              stateName='role'
              value={user.Role.name}
              label='Role'
              size='medium'
              width={300}
              updateble={updateble}
              onChange={(stateName: string, newValue: string) => updateWorker({ id: userId, stateName: stateName, dataToUpdate: newValue })}
            />
            <ProfileSelector
              statesList={rateTypesData.map(e => e.name)}
              stateName='rateType'
              value={user.WorkersRate.RateType.name}
              label='RateType'
              size='medium'
              width={300}
              updateble={updateble}
              onChange={(stateName: string, newValue: string) => updateWorker({ id: userId, stateName: stateName, dataToUpdate: newValue })}
            />
            <ProfileTextField
              updateble={updateble}
              type='number'
              defaultValue={user.WorkersRate.rate.toString()}
              stateName='rate'
              lable='Rate'
              onBlurCall={(stateName: string, newValue: string) => updateWorker({ id: Number(userId), stateName: stateName, dataToUpdate: newValue })}
            />
          </Paper>
        </>
      )}
    </Box>
  )
}
