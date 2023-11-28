import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Container, TextField} from '@mui/material';
import { Selecter } from '../../components/Selecter/Selecter';
import { IWorkerCreate, useCreateWorkerMutation, useFetchGetRateTypesQuery, useFetchGetRolesQuery } from '../../api/api-slices/workers-page-reducer';

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

const FormValidate = (data :IWorkerCreate )=>{
  if (data.login && data.pass && data.fname && data.lname && data.birthday && data.email && data.phone && data.rateType && data.rate && data.role)
    return true;
  return false;
}

export const CreateWorkerModalWindow: React.FC<PropsType> = ({open, setOpen}) => {

  const [role,setRole]  =  React.useState('');
  const [rateType,setRateType]  =  React.useState('');
  const [isWrigth, setIsWrigth] = React.useState(true);

  const {data : RoleList, isLoading : RolesLoading} = useFetchGetRolesQuery(null)
  const {data : RateTypeList, isLoading : RateTypesLoading} = useFetchGetRateTypesQuery(null)

  const [createWorker,{isLoading : isCreating}] = useCreateWorkerMutation()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const doby:IWorkerCreate = {
      login: data.get('login') as string,
      pass: data.get('password') as string,
      fname: data.get('fname') as string,
      lname: data.get('lname') as string,
      birthday: data.get('bdate') as string,
      email: data.get('email') as string,
      phone: data.get('number') as string,
      rateType: rateType as string,
      rate: parseFloat(data.get('rate') as string),
      role: role as string,
    }
    if(FormValidate(doby)){
      setIsWrigth(true);
      await createWorker(doby);
      setOpen(false);
    }
    else{
      setIsWrigth(false);
    }
  }

  const isLoading = RateTypesLoading || RolesLoading || !RateTypeList || !RoleList
  return (
    <div style={{display:'none'}}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a worker
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
              {isLoading ? (
                <>
                isLoading...
                </>
              ):(
                <>
                <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between', flexBasis: 160 }}>
                <TextField
                  margin="normal"
                  required
                  id="login"
                  label="Login"
                  name="login"
                  autoComplete="username"
                  autoFocus
                  sx={{ width: 300 }}
                />
                <TextField
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ width: 300 }}
                />

                <Selecter size='medium'  statesList={RoleList.map((e)=>e.name)} value={role} StateSeter={setRole} label='Role' width={300} name='role'/>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', rowGap: 2, flexWrap:'wrap' }}>
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

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', rowGap: 2, flexWrap:'wrap' }}>
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
                </Box>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', rowGap: 2, flexWrap:'wrap' }}>
                <Selecter size='medium'  statesList={RateTypeList.map((e)=>e.name)} value={rateType} StateSeter={setRateType} label='RateType' width={300} name='rateType'/>

                  <TextField
                    margin="normal"
                    required
                    name="rate"
                    label="Rate"
                    type="number"
                    id="number"
                    sx={{ width: 300 }}
                  />
                </Box>
                <Typography sx={{display:isWrigth ? 'none' : 'inline'}} color={'red'}>Write value in all place!!!</Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading || isCreating}
                >
                  Create
                </Button>
              </Box>
                </>
              )}
              
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
