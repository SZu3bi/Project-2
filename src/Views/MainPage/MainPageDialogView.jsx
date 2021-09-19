import React, { useEffect, useState} from 'react';
import { showError, showSuccess } from '../../Helper/Tostify.Helper';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { EditInfo_Case} from '../../Services/APIServices';
import { Origin, Priority, State, Type } from './Option/Option';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReportPage } from './ReportPage';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

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

export const MainPageDialogView = (props,
  {
    openReport,
  GetAllData,
  openvalchange,
  handleClose,
  o
}) => {
  console.log('DTO: ', props.DTO);
  console.log('open: ', props.open);
  const classes = useStyles();

  /////////////////////////////////  API`s  ///////////////////////////////////////
  const [state, setState] = useState
    ({
      id:'',
      subject: '',
      status: '',
      origin: '',
      priority: ''
      // contactid:''
      // email: '',
     //  type: ''
    });
  const [idedit, setidedit] = useState()
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


console.log(loading);

  const handleEditButton = async () => {
    setLoading(true);
    props.openvalchange();
    const result = await EditInfo_Case(idedit,state);
    if (result) {
      props.GetAllData();
      showSuccess(('Edit Successfully'));
    } else showError(('Edit Failed'));
    setLoading(false);

  };


  useEffect(() => {
    if (props.DTO) {
      setState((item) => ({...item,
        id:(props.DTO && props.DTO.Id) || '',
        origin: (props.DTO && props.DTO.Origin) || '',
        priority: (props.DTO && props.DTO.Priority) || '',
        status: (props.DTO && props.DTO.Status) || '',
        subject: (props.DTO && props.DTO.Subject) || '',
        // contactid: (props.DTO && props.DTO.ContactId) || '',
        // contactName: (props.DTO && props.DTO.Contact.Name) || '',

      
      }))

      setidedit(props.DTO && props.DTO.Id)
          
    }

    console.log('Data>>>' , props.DTO);
  }, [props.DTO])




  return (
    
    <Dialog
      onClose={props.openvalchange}
      aria-labelledby="simple-dialog-title"
      open={props.open}
      className="D1"
      maxWidth={'xl'}
      fullScreen={fullScreen} >
      <div className="login-form">

      {o && <ReportPage open={o}  openReport = {openReport}/ >}
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
            error={state.subject === '' ? "error" : null}
            label="Subject"
            variant="outlined"
            value={state.subject}
            onChange={(event) => {
              setState((item) => ({ ...item, subject: event.target.value }))}} />
        </div>
        {/* <div>
          <TextField
            error={state.contactid === '' ? "error" : null}
            label="contactid"
            variant="outlined"
            value={state.contactid}
            onChange={(event) => {
              setState((item) => ({ ...item, contactid: event.target.value }))}}/>
        </div> */}
        <div>
          <TextField
            id="select-Status"
            select
            variant="outlined"
            error={state.status === '' ? "error" : null}
  
            label="Status"
            className="dialog"
            value={state.status}
            onChange={(event) => {

              setState((item) => ({ ...item, status: event.target.value }))}} >
            {State.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="select-origin"
            select
            variant="outlined"
            error={state.origin === '' ? "error" : null}
            margin="normal"
            label="Origin"
            className="dialog"
            value={state.origin}
            onChange={(event) => {
              setState((item) => ({ ...item, origin: event.target.value }))}}>
            {Origin.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            id="select-priority"
            select
            variant="outlined"
            error={state.priority === '' ? "error" : null}
            label="Priority"
            className="dialog"
            value={state.priority}
            onChange={(event) => {
              setState((item) => ({ ...item, priority: event.target.value })) }} >
            {Priority.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </div>
{/* <div>
          <TextField
            id="select-type"
            select
            variant="outlined"
            error={state.type === '' ? "error" : null}
            className="dialog"
            label="Type"
            value={state.type}
            onChange={(event) => {
              setState((item) => ({ ...item, type: event.target.value })) }}>
            {Type.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem> ))}
          </TextField>
        </div> */}
        </form>
      </div>
    
      <DialogActions style={{    justifyContent: 'center'}}>
        <ButtonGroup variant="contained" size='large' color="primary" aria-label="contained primary button group">
  <Button  onClick={() => {handleEditButton()} }>Save</Button>
  <Button  color="secondary"onClick={props.openvalchange}>Exit</Button>
</ButtonGroup>

  
      </DialogActions>
      
    </Dialog>
  );
};
