import { Box, Button, Paper, Typography } from '@mui/material'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '../../hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileTextField } from '../../components/ProfileTextField/ProfileTextField';
import { useCreateNoteMutation, useDeleteClientMutation, useGetClientQuery, useGetDirectionsQuery, useGetNotesQuery, useGetStatusesQuery, useUpdateClientMutation } from '../../api/api-slices/clients-reducer';
import { ProfileSelector } from '../../components/ProfileSelector/ProfileSelecter';
import TextField from '@mui/material/TextField';
import { ClientNote } from '../../components/ClientNote/ClientNote';
import { CREATE_NOTE, DELETE_CLIENT, UPDATE_WORKER, checkRights } from '../../utils/rights-utils';
import DeleteIcon from '@mui/icons-material/Delete';

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

export const ClientPage: React.FC = () => {

  const { userId } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = React.useState('');

  const { workerid, rights } = useAppSelector((state => ({ workerid: state.user.user.id, rights: state.user.user.rights })))

  const { data: clientData, isLoading: isClientLoading } = useGetClientQuery(Number(userId));
  const { data: directionsData, isLoading: isDirectionsLoading } = useGetDirectionsQuery(null);
  const { data: statusData, isLoading: isStatusLoading } = useGetStatusesQuery(null);
  const { data: notesData, isLoading: isNotesLoading } = useGetNotesQuery(Number(userId));

  const [updateClient, { }] = useUpdateClientMutation();
  const [createNote, { }] = useCreateNoteMutation();
  const [deleteClient, { }] = useDeleteClientMutation();

  const postNote = () => {
    setMessage('');
    createNote({ workerid: workerid, clientid: Number(userId), content: message });
  }

  const updatable = checkRights(rights, UPDATE_WORKER);
  const canCreateNotes = checkRights(rights, CREATE_NOTE);
  
  const isLoading = !notesData || isNotesLoading || !clientData || !directionsData || !statusData || isClientLoading || isDirectionsLoading || isStatusLoading

  return (
    <Box sx={{ minHeight: 1000 }}>
      {isLoading ? (
        <>Loading...</>
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
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100 }} />
                <VisuallyHiddenInput type="file" />
              </Button>

              <Typography fontSize={20}>
                {clientData.fname + ' ' + clientData.lname}
              </Typography>
            </Box>

            {/* <Button
              disabled={!deleteble}
              onClick={onDeleteClient}>
              <DeleteIcon fontSize='large' />
            </Button> */}
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
              lable='FirstName'
              onBlurCall={(stateName: string, newValue: string) => updateClient({ id: userId, stateName: stateName, dataToUpdate: newValue })}
              defaultValue={clientData.fname}
              updateble={updatable}
              stateName='fname' />
            <ProfileTextField
              lable='LastName'
              onBlurCall={(stateName: string, newValue: string) => updateClient({ id: userId, stateName: stateName, dataToUpdate: newValue })}
              defaultValue={clientData.lname}
              updateble={updatable}
              stateName='lname' />
            <ProfileTextField
              lable='Phone'
              onBlurCall={(stateName: string, newValue: string) => updateClient({ id: userId, stateName: stateName, dataToUpdate: newValue })}
              defaultValue={clientData.phone}
              type='number'
              updateble={updatable}
              stateName='phone' />
            <ProfileTextField
              lable='Email'
              onBlurCall={(stateName: string, newValue: string) => updateClient({ id: userId, stateName: stateName, dataToUpdate: newValue })}
              defaultValue={clientData.email}
              updateble={updatable}
              stateName='email' />
            <ProfileTextField
              lable='Lessons count'
              onBlurCall={(stateName: string, newValue: string) => updateClient({ id: userId, stateName: stateName, dataToUpdate: newValue })}
              defaultValue={clientData.lessons_count.toString()}
              type='number'
              updateble={updatable}
              stateName='lessons_count' />
            <ProfileSelector
              statesList={directionsData.map(e => e.name)}
              stateName='direction'
              value={clientData.Direction.name}
              label='Direction'
              size='medium'
              width={300}
              updateble={updatable}
              onChange={(stateName: string, newValue: string) => updateClient({ id: userId, stateName: stateName, dataToUpdate: newValue })}
            />
            <ProfileSelector
              statesList={statusData.map(e => e.name)}
              stateName='status'
              value={clientData.Status.name}
              label='Status'
              size='medium'
              updateble={updatable}
              width={300}
              onChange={(stateName: string, newValue: string) => updateClient({ id: userId, stateName: stateName, dataToUpdate: newValue })}
            />
          </Paper>

          <Paper elevation={10}
            sx={{
              backgroundColor: '#969696',
              padding: 2
            }}>
            <Typography variant='h6'>Notes</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                disabled={!canCreateNotes}
                fullWidth
                required
                multiline
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ backgroundColor: 'white', borderRadius: 3 }}
              />

              <Button onClick={postNote}
                disabled={!canCreateNotes}
                variant='contained'
              >
                send
              </Button>
            </Box>

            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              gap: 3,
              justifyContent: 'flex-start',
              mt: 3
            }}>
              {notesData.rows.slice().reverse().map(e => <ClientNote message={e.content} workerid={e.WorkerId} />)}
            </Box>

          </Paper>
        </>
      )}

    </Box>
  )
}
