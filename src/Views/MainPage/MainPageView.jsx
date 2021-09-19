import React, { useEffect, useState, useCallback } from 'react';
import { showError, showSuccess } from '../../Helper/Tostify.Helper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { CreateMainInfo_Case, DeleteInfo_Case, GetMainInfo_Case } from '../../Services/APIServices';
import { Origin, Priority, State, Type } from './Option/Option';
import { MainPageDialogView } from './MainPageDialogView';


import { ReportPage } from './ReportPage';
import { Picture } from './Picture';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import FaceIcon from '@material-ui/icons/Face';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import Chip from '@material-ui/core/Chip';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Masonry,{ResponsiveMasonry} from "react-responsive-masonry"
import psi from '../../Views/sales.png'
import { Route, Link, BrowserRouter as Router } from "react-router-dom";


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
orange: {
  color: theme.palette.getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
  fontSize: 'x-large',
  fontFamily: 'fantasy',
},
purple: {
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
},
}));

export const MainPageView = () => {

 
const classes = useStyles();
const [openn, setOpenn] = React.useState(false);
const [o, setO] = useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
const [open, setOpen] = useState(false);
const [p, setP] = useState(false);
const [res, setres] = useState();

const [EditVal, setEditVal] = useState();
const [loading, setLoading] = useState(true);
const [success, setSuccess] = useState(false);
console.log(success);
const [state, setState] = useState({
  subject: '',
  status: '',
  origin: '',
  priority: '',
  email: '',
  type: ''
} 
);



/////////////////////////////////  API`s  ///////////////////////////////////////

/////  Get API
const GetAllData = useCallback(async () => {
  setLoading(true);
  const result = await GetMainInfo_Case();
  if (result) {
    const sortedResult = result.data.sort((a, b) =>
      a.Id.localeCompare(b.Id)
    );
    setres(sortedResult);
    console.log('item ', result.data.length);
  } else setres(null);
  setLoading(false);
}, []);



console.log("State>>>" , res);


  const clearState = () => {
    setState({
      subject: '',
      status: '',
      origin: '',
      priority: '',
      email: '',
      type: ''
      // contactid:''
    });
  };

const hundle = ()=>{
  if (state.subject !== '') {
    handleCreateButton();
   
  }else
      showError(('Fill Subject'));
}

/////  Create API
const handleCreateButton = async () => {
  setLoading(true);
  const result = await CreateMainInfo_Case(state);
  if (result) {
    state.subject='';
    clearState();
    showSuccess(('Create Successfully'));
    setSuccess(false);
    GetAllData();
    setLoading(true);    
setTimeout(() => {
      setSuccess(true);
      setLoading(false);             
    }, 2000);
    handleClose();
  }else
  setLoading(false);
};


/////  Delete API
const handleDeleteButton = async (deletedId) => {
  setLoading(true);
  const result = await DeleteInfo_Case(deletedId);
  if (result) {    
setTimeout(() => {
 
  showSuccess(('Deleted Successfully'));
  setSuccess(false);
  GetAllData();
  setLoading(true);
      }, 100);
  }else showError(('Delete Failed'));
    };


    var mybutton = document.getElementById("myBtn");
    window.onscroll = function() {scroll()};

    const  scroll =() => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    const top = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      console.log("sssss");
    }

/////////////////////////////////  API`s  ///////////////////////////////////////
useEffect(() => {
    GetAllData()
    }, [GetAllData]);

    useEffect(()=>{

      const data = localStorage.getItem('data')
      
      if(data){
        setState(JSON.parse(data))
       }
      
      },[])
      
      useEffect(()=>{
      
        localStorage.setItem('data',JSON.stringify(state))
      
      })
      

const handleClickOpen = () => {
  console.log('subject: ', state.subject);
  setOpenn(true);
};
const handleClose = () => {
  setOpenn(false);
};
const openvalchange = () => { 
      setOpen(false);   
  }
const openReport = () => { 
      setO(false);   
  }

const openPicture = () => { 
      setP(false);   
  }
 

  
  const [collapseView, setCollapseView] = useState(false);

  const handleChange = (panel) => (index, collapseView) => {
    setCollapseView(collapseView ? panel : false);
    
  };

  console.log('sssssssssssss',collapseView);


return (
  <div className='Agents-wrapper view-wrapper'>
    <button onClick={top} id="myBtn" title="Go to top">Top</button>

    {open && <MainPageDialogView open={open} DTO={EditVal} 
    GetAllData={() => GetAllData()} openvalchange = {openvalchange} o={o}  setO={setO}/> }
    {o && <ReportPage open={o}  openReport = {openReport}/>}
    {p && <Picture open={p}  openPicture = {openPicture}/>}
    {loading ? <LinearProgress /> : <div>
    <div className="cardBadge">
      <div>
    <Badge  badgeContent={undefined !== res && res !== null && res.length} color="primary" style={{float:'left'}}>
        <PersonIcon />
      </Badge>
</div>
<div>
    <AssignmentIcon onClick={() => { setO(true) }} />
 </div>
 <div>

<PhotoLibraryIcon  />
  </div>
  <div>
<AddIcon style={{float:'right'}}  onClick={handleClickOpen}/>
</div>
</div>
<div className="cards">

{res && res.map((s ,index ) => ( 
<div class="card-container">
    <span class="pro"> {s.Status}</span>
    <img id="avatar" src={psi} alt="lead"></img>
    <h3>{s.Subject}</h3>
    <h6>Jordan</h6>
    {/* <p> front-end developer</p> */}
    <div class="buttons">
    <ButtonGroup variant="contained" size='large' color="primary" aria-label="contained primary button group">
  <Button onClick={() => { setOpen(true); setEditVal(s) }}>Edit</Button>
  <Button  color="secondary" onClick={() => handleDeleteButton(s.Id)}>Delete</Button>
</ButtonGroup>
		
    </div>
    <div class="skills">
        <h6>Case Info</h6>
        <ul>
            <li> Origin :{s.Origin}</li>
           
            <li>priority : {s.Priority}</li>
       
        </ul>
    </div>
    <div>
      <Accordion   expanded={collapseView===index} onChange={handleChange(index)}>
                <AccordionSummary
                  className='collapes'
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1bh-content'
                  id={index}>
          <Typography className={classes.heading}>{collapseView===index ?'Hide Info' :'Show Info' }</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{    textAlign: 'justify' , fontSize: 'medium'}}>
<TripOriginIcon /> Origin : {s.Origin} <br/>

<PriorityHighIcon /> priority : {s.Priority} <br/>
       </p>
      
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
</div>))}
</div>


    <div>
  
    <ToastContainer />


      <Dialog
        fullScreen={fullScreen}
        open={openn}
        className="D1"
        maxWidth={'xl'}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
        <ToastContainer />
        {loading ? <CircularProgress size={50} /> :
  <div className="div1">
    <form className={classes.root} noValidate autoComplete="off">
    <div>
<TextField
          required
          id="outlined-required"
          label="Subject"
          variant="outlined"
          error={state.subject === '' ? "error" : null}
          value={state.subject}
          onChange={(event) => {
            setState((item) => ({ ...item, subject: event.target.value })) }} />
            </div>
            <div>
<TextField
          required
          id="outlined-required"
          label="Email"
          variant="outlined"
          error={state.email === '' ? "error" : null}
          value={state.email}
          onChange={(event) => {
            setState((item) => ({ ...item, email: event.target.value })) }} /> 
             </div>
             <div>
        <TextField
                  id="select-Status"
                  select
                  error={state.status === '' ? "error" : null}
                  className={classes.textField}
           
                  label="Status"
                  value={state.status}
                  helperText="Please select Status"
                  variant="outlined"
                  onChange={(event) => {
                    setState((item) => ({ ...item, status: event.target.value })) }}>
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
                  error={state.origin === '' ? "error" : null}
                  className={classes.textField}
                 
                  label="Origin"
                  helperText="Please select Origin"
                  variant="outlined"
                  value={state.origin}
                  onChange={(event) => {
                    setState((item) => ({ ...item, origin: event.target.value })) }}>
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
          
                  error={state.priority === '' ? "error" : null}
                  className={classes.textField}
                  label="Priority"
                  helperText="Please select Priority"
                  variant="outlined"
                  value={state.priority}
                  onChange={(event) => {
                    setState((item) => ({ ...item, priority: event.target.value })) }}
                // helperText="Please select Priority"
                >
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
         
                  error={state.type === '' ? "error" : null}
                  className={classes.textField}
                  label="Type"
                  value={state.type}
                  helperText="Please select Type"
                  variant="outlined"
                  onChange={(event) => {
                    setState((item) => ({ ...item, type: event.target.value }))  }}
                >
                  {Type.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </div> */}
         
              </form>

        
         
   </div> }
       </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
  <ButtonGroup variant="contained" size='large' color="primary" aria-label="contained primary button group">
  <Button  onClick={hundle}>Save</Button>
  <Button color='inherit' onClick={() => {clearState()} }>Clear</Button>
  <Button  color="secondary" onClick={handleClose}>Exit</Button>
</ButtonGroup>
        </DialogActions>    
      </Dialog>
    </div>
    </div>}
</div>
);
};
