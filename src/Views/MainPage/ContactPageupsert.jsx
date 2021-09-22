import React, { useEffect, useState} from 'react';
import { showError, showSuccess } from '../../Helper/Tostify.Helper';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { EditInfo_Contact } from '../../Services/APIServices_2';
import { Source } from './Option/Option';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReportPage } from './ReportPage';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexWrap: 'wrap',
   
    
  },
  textField: {
    marginLeft: theme.spacing(1),
    margin: theme.spacing(1),
    width: '25ch',
  },

  }));

export const ContactPageupsert = (
  {
    openvalchangeContact,
  GetAllData,
  DTO,
  open
  
}) => {
  console.log('DTO: ', DTO);
  console.log('open: ', open);
  const classes = useStyles();

  /////////////////////////////////  API`s  ///////////////////////////////////////
  const [state, setState] = useState
    ({
      id:'',
      name: '',
      phone: '',
      leadsource: '',
      email: '',
      rate:0 

    });
  const [idedit, setidedit] = useState()
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


console.log(loading);

  const handleEditButton = async () => {
    setLoading(true);
    openvalchangeContact();
    showSuccess(('Edit Successfully'));

    const result = await EditInfo_Contact(idedit,state);
    if (result) {
      GetAllData();
      showSuccess(('Edit Successfully'));
    } else showError(('Edit Failed'));
    setLoading(false);

  };


  useEffect(() => {
    if (DTO) {
      setState((item) => ({...item,
        id:(DTO && DTO.Id) || '',
        name: (DTO && DTO.Name) || '',
        phone: (DTO && DTO.Phone) || '',
        email: (DTO && DTO.Email) || '',
        leadsource: (DTO && DTO.LeadSource) || '',
        rate: (DTO && DTO.Rating__c) || ''

      
      }))

      setidedit(DTO && DTO.Id)
          
    }

    console.log('Data>>>' , DTO);
    console.log('Id>>>' , DTO.Id);
  }, [DTO])


  const handleStaffRatingChange = (event) => {
    setState((item) => ({ ...item, rate: event.target.value }))
  };


  return (
    
    <Dialog
      onClose={openvalchangeContact}
      aria-labelledby="simple-dialog-title"
      open={open}
      className="D1"
      maxWidth={'xl'}
      fullScreen={fullScreen} >
      <div className="login-form">

      <form className={classes.root} noValidate autoComplete="off">

      <div>
          <TextField
            error={state.id === '' ? "error" : null}
            label="Id"
            value={state.id}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            onChange={(event) => {
              setState((item) => ({ ...item, id: event.target.value }))}} />
        </div>
        <div>
          <TextField
            error={state.name === '' ? "error" : null}
            label="Name"
            variant="outlined"
            value={state.name}
            onChange={(event) => {
              setState((item) => ({ ...item, name: event.target.value }))}} />
        </div>
        <div>
        

{/* <TextField 
    type="number"
    error={state.rate === '' ? "error" : null}
    label="Rate"
    variant="outlined"
    value={state.rate}
    InputProps={{
        inputProps: { 
            max: 5, min: 0 
        }
    }}
    onChange={(event) => {
      setState((item) => ({ ...item, rate: event.target.value }))}} 
    
/> */}

        </div>
        <div>
          <TextField
            error={state.email === '' ? "error" : null}
            label="email"
            variant="outlined"
            value={state.email}
            onChange={(event) => {
              setState((item) => ({ ...item, email: event.target.value }))}} />
        </div>
        <div>
          <TextField
            error={state.phone === '' ? "error" : null}
            label="phone"
            variant="outlined"
            value={state.phone}
            onChange={(event) => {
              setState((item) => ({ ...item, phone: event.target.value }))}} />
        </div>

        <div>
          <TextField
            id="select-Status"
            select
            variant="outlined"
            error={state.leadsource === '' ? "error" : null}
  
            label="lead source"
            className="dialog"
            value={state.leadsource}
            onChange={(event) => {

              setState((item) => ({ ...item, leadsource: event.target.value }))}} >
            {Source.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
  
<Rating
        name="text-feedback"
        value={state.rate}
        
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        onChange={handleStaffRatingChange}
      />

        </form>
      </div>
    
      <DialogActions style={{    justifyContent: 'center'}}>
        <ButtonGroup variant="contained" size='large' color="primary" aria-label="contained primary button group">
  <Button  onClick={() => {handleEditButton()} }>Save</Button>
  <Button  color="secondary"onClick={openvalchangeContact}>Exit</Button>
</ButtonGroup>

  
      </DialogActions>
      
    </Dialog>
  );
};
