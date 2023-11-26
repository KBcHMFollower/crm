import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Container, TextField} from '@mui/material';
import { Selecter } from '../../components/Selecter/Selecter';
import { IClientUpdate, useCreateClientMutation, useGetDirectionsQuery, useGetStatusesQuery } from '../../api/api-slices/clients-reducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  open: boolean;
  setOpen: (props: boolean) => void;
}

export const CreateClientModalWindow: React.FC<PropsType> = ({open, setOpen}) => {

  const [direction, setDirection] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [isWrigth, setIsWrigth] = React.useState(true);

  const { data: directionData, isLoading: isDirectionsLoading } = useGetDirectionsQuery(null);
  const { data: statusData, isLoading: isStatusesLoading } = useGetStatusesQuery(null);

  const [createClient, { isLoading: isCreateLoading }] = useCreateClientMutation()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const doby: IClientUpdate = {
      fname: data.get('fname') as string,
      lanme: data.get('lname') as string,
      birthday: data.get('bdate') as string,
      email: data.get('email') as string,
      phone: data.get('number') as string,
      lessons_buyed: Number(data.get('lessons_buyed') as string),
      lessons_count: Number(data.get('lessons_count') as string),
      status : status as string,
      direction : direction as string
    }
    if (!Object.values(doby).some(e=>e==='' || null)) {
      setIsWrigth(true);
      console.log(doby);
      await createClient(doby);
      setOpen(false);
    }
    else {
      setIsWrigth(false);
    }
  }

  const isLoading = !directionData || !statusData || isDirectionsLoading || isStatusesLoading;

  return (
    <div style={{ display: 'none' }}>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create a client
                </Typography>
              </Box>


              <Container component="main">
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', flexBasis: 160 }}>
                    <TextField
                      margin="normal"
                      required
                      id="lessons_count"
                      label="Lessons Count"
                      name="lessons_count"
                      type='number'
                      autoFocus
                      sx={{ width: 300 }}
                    />
                    <TextField
                      margin="normal"
                      required
                      name="lessons_buyed"
                      label="Lessons Buyed"
                      type="number"
                      id="lessons_buyed"
                      sx={{ width: 300 }}
                    />

                    <Selecter size='medium' statesList={directionData.map(e => e.name)} value={direction} StateSeter={setDirection} label='Direction' width={300} name='direction' />

                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', rowGap: 2, flexWrap: 'wrap' }}>
                      <TextField
                        margin="normal"
                        required
                        name="fname"
                        label="First name"
                        type="name"
                        id="fname"
                        autoComplete="given-name"
                        sx={{ width: 300 }}
                      />

                      <TextField
                        margin="normal"
                        required
                        name="lname"
                        label="Last name"
                        type="name"
                        id="lname"
                        autoComplete="family-name"
                        sx={{ width: 300 }}
                      />

                      <TextField
                        margin="normal"
                        required
                        name="bdate"
                        label="BirthdayDate"
                        type="date"
                        id="bdate"
                        autoComplete="bday"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        sx={{ width: 300 }}
                      />
                    </Box>

                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', rowGap: 2, flexWrap: 'wrap' }}>
                      <TextField
                        margin="normal"
                        required
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="email"
                        sx={{ width: 300 }}
                      />

                      <TextField
                        margin="normal"
                        required
                        name="number"
                        label="Phone number"
                        type="tel"
                        id="number"
                        autoComplete="tel"
                        sx={{ width: 300 }}
                      />

                      <Selecter size='medium' statesList={statusData.map(e=>e.name)} value={status} StateSeter={setStatus} label='Status' width={300} name='direction' />
                    </Box>


                    <Typography sx={{ display: isWrigth ? 'none' : 'inline' }} color={'red'}>Write value in all place!!!</Typography>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isLoading}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Modal>
        </>
      )}

    </div>
  );
}
