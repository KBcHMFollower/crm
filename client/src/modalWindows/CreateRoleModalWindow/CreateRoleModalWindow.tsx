import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox, Collapse, Container, FormControl, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { Selecter } from '../../components/Selecter/Selecter';
import { IWorkerCreate, useCreateWorkerMutation, useFetchGetRateTypesQuery, useFetchGetRolesQuery } from '../../api/api-slices/workers-page-reducer';
import { IRight } from '../../api/models/right-model';
import rolesApi from '../../api/api-slices/roles-reducer';

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
  rights:IRight[]
}

const FormValidate = (data:{name:string;rights:string[]}) => {
  if (data.name)
    return true;
  return false;
}

export const CreateRoleModalWindow: React.FC<PropsType> = ({ open, setOpen, rights }) => {

  const [rightsSelected, setRightsSelected] = React.useState<string[]>([]);
  const [isWrigth, setIsWrigth] = React.useState(true);
  const [openRightsList, setOpenRightsList] = React.useState(false);

  const { data: RoleList, isLoading: RolesLoading } = useFetchGetRolesQuery(null)
  const { data: RateTypeList, isLoading: RateTypesLoading } = useFetchGetRateTypesQuery(null)

  const [createRole, { isLoading: isCreating }] = rolesApi.useCreateRoleMutation()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const doby = {
      name: data.get('name') as string,
      rights: rightsSelected,
    }
    if (FormValidate(doby)) {
      setIsWrigth(true);
      await createRole(doby);
      setOpen(false);
    }
    else {
      setIsWrigth(false);
    }
  }

  const onSelectRight = (e:React.ChangeEvent<HTMLInputElement>)=>{
    var currentRights = [...rightsSelected];
    console.log(currentRights);
    if (!e.target.checked){
      currentRights = currentRights.filter((item)=>item!==e.target.name);
      console.log('filter')
    }
    else{
      currentRights.push(e.target.name);
      console.log('add')
    }

    setRightsSelected(currentRights);
  }

  const checkChecked = (item:string)=>{
    const res = rightsSelected.some(e=>e == item)
    return res
  }


  const isLoading = RateTypesLoading || RolesLoading || !RateTypeList || !RoleList
  return (
    <div style={{ display: 'none' }}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a Role
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
              ) : (
                <>
                  <Box component="form"
                    onSubmit={onSubmit}
                    noValidate
                    sx={{
                      mt: 1,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      justifyContent: 'space-between',
                      flexBasis: 160
                    }}>

                    <Box sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      rowGap: 2,
                      flexWrap: 'wrap'
                    }}>
                      <Button variant='outlined' onClick={() => setOpenRightsList(!openRightsList)}>Rights list</Button>
                        <Collapse in={openRightsList}>
                            <Box sx={{ display: 'flex' }}>
                                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                    <FormGroup>
                                        {rights.map(e=><FormControlLabel
                                            key={e.id}
                                            control={
                                                <Checkbox  name={e.name}
                                                onChange={onSelectRight}
                                                checked={checkChecked(e.name)}
                                                
                                                  />
                                            }
                                            label={e.name}
                                        />)}
                                    </FormGroup>
                                </FormControl>
                            </Box>
                        </Collapse>

                      <TextField
                        margin="normal"
                        required
                        name="name"
                        label="Name"
                        type="text"
                        id="name"
                        sx={{ width: 300 }}
                      />
                    </Box>
                    <Typography sx={{
                      display: isWrigth ? 'none' : 'inline'
                    }}
                      color={'red'}>
                      Write value in all place!!!
                    </Typography>
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
