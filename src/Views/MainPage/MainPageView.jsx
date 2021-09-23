import React, { useEffect, useState, useCallback } from 'react';
import { showError, showSuccess } from '../../Helper/Tostify.Helper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { CreateMainInfo_Case, DeleteInfo_Case, GetMainInfo_Case } from '../../Services/APIServices';
import { Origin, Priority, State } from './Option/Option';
import { MainPageDialogView } from './MainPageDialogView';
import { GetMainInfo_Contact } from '../../Services/APIServices_2';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import Menu from '@material-ui/core/Menu';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';


const getSteps=()=> {
  return ['Fill Subject', 'Select Contact', 'Select Status','Select Origin','Select Priority'];
}

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
button: {
  marginTop: theme.spacing(1),
  marginRight: theme.spacing(1),
},
actionsContainer: {
  marginBottom: theme.spacing(2),
},
resetContainer: {
  padding: theme.spacing(3),
},
}));

export const MainPageView = () => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

 
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);

const [openn, setOpenn] = React.useState(false);
const [o, setO] = useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
const [open, setOpen] = useState(false);
const [p, setP] = useState(false);
const [res, setres] = useState();
const [rescon, setrescon] = useState();
const [EditVal, setEditVal] = useState();
const [loading, setLoading] = useState(true);
const [success, setSuccess] = useState(false);
console.log(success);
const [state, setState] = useState({
  subject: '',
  status: '',
  origin: '',
  priority: '',
  contact:'',
  contactid:''
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
const GetContact = useCallback(async () => {
  setLoading(true);
  const result = await GetMainInfo_Contact();
  if (result) {
    const sortedResult = result.data.sort((a, b) =>
      a.Id.localeCompare(b.Id)
    );
    setrescon(sortedResult);
    console.log('item ', result.data.length);
  } else setres(null);
  setLoading(false);
}, []);



console.log("Contact" , rescon);
console.log("Case" , res);


  const clearState = () => {
    setState({
      subject: '',
      status: '',
      origin: '',
      priority: ''
      // contactid:''
    });
    handleReset();
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
    handleReset();
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
    GetContact()
    }, [GetAllData,GetContact]);


      

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
 

  const Open = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const Close = () => {
    setAnchorEl(null);
    handleClickOpen();
  };

  const [collapseView, setCollapseView] = useState(false);

  const handleChange = (panel) => (index, collapseView) => {
    setCollapseView(collapseView ? panel : false);
    
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  const contactChange = (event, value) => setSelectedOptions(value);
  const handleSubmit = () => console.log(selectedOptions);

  // const contactChange = (event, values) => {
  //   console.log(values) ;  console.log(event);
  //   setState({
  //     contact: values
  
  //   });
  // }
  console.log('collapseView',collapseView);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <div>
 
 <Autocomplete
          options={rescon}
          getOptionLabel={(option) =>  option.Name  }
          // onInputChange={(event, values)=>contactChange(event, values)}
          // onInputChange={contactChange}
          onChange={contactChange}

        Value={selectedOptions}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="Contact"
         
              margin="normal"
              fullWidth
            />
          )}
        />
        <button onClick={handleSubmit}>Submit!</button>

              {/* <Autocomplete
      id="highlights-demo"
      sx={{ width: 300 }}
      options={rescon}
      value={state.contact}
      onInputChange={(event , newValue ) => {
        console.log(newValue)
        setState((item) => ({ ...item, contact: event.target.value })) }}
     
      getOptionLabel={(option) => option.Name}
      renderInput={(params) => (
        <TextField {...params} label="Highlights" margin="normal" />)}/> */}
      
    <TextField
              required
              id="outlined-required"
              label="Subject"
              variant="outlined"
              error={state.subject === '' ? "error" : null}
              value={state.subject}
              onChange={(event) => {
                setState((item) => ({ ...item, subject: event.target.value })) }} />
                </div>;
      case 1:
        return        <div>
        <TextField
              id="outlined-required"
              select
     
              error={state.contact === '' ? "error" : null}
              className={classes.textField}
              label="Contact"
              value={state.contact}
              helperText="Please select Contact"
              variant="outlined"
              onChange={(event) => {
                setState((item) => ({ ...item, contact: event.target.value }))  }}
            >
              {rescon&&rescon.map((option) => (
                <MenuItem key={option.Id} value={option.Id}>
                  {option.Name}
                </MenuItem>
              ))}
            </TextField>




         

     {/* <Autocomplete
      options={rescon}
      getOptionLabel={option => option.Name}
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label="Auto Comp Contact"
          placeholder="Favorites"
          margin="normal"
          value={state.contact}
          fullWidth
          // onChange={(event) => {
          //   console.log(event)
          //   setState((item) => ({ ...item, contact: event.target.value }))  }}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue)
             setState((item) => ({ ...item, contact: event.target.value }))
          }}
        />
      )}
 
   
    /> */}
         </div>;
      case 2:  return  <div>
        
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
              </div>;
                case 3:  return  <div>
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
                </div>;
 case 4:  return        <div>
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
 </div>;

       
      default:
        return 'Unknown step';
    }
  }
  


return (
  <div className='Agents-wrapper view-wrapper'>
    <button onClick={top} id="myBtn" title="Go to top">Top</button>

    {open && <MainPageDialogView open={open} DTO={EditVal} 
    GetAllData={() => GetAllData()} openvalchange = {openvalchange} o={o}  setO={setO}/> }
    {o && <ReportPage open={o}  openReport = {openReport}/>}
    {p && <Picture open={p}  openPicture = {openPicture}/>}
    {loading ? <CircularProgress /> : <div>
  
<div style={{display: 'inline-block'}}>
  {/* <div style={{display: 'inline-block'}}><Badge  badgeContent={undefined !== res && res !== null && res.length} color="primary" style={{float:'left'}}>
        <PersonIcon/>
      </Badge></div> */}

{/* <button  onClick={() => { setO(true) }}></button> */}
      <div>
      <Button
      aria-controls="customized-menu"
      aria-haspopup="true"
      variant="contained"
      color="primary"
      onClick={Open}>
        Open Menu
      </Button>
      </div>
     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={Close}>
        <MenuItem onClick={Close}>Add New</MenuItem>
    
      </Menu>
    </div>
<div className="cards">

{res && res.map((s ,index ) => ( 
<div class="card-container">
    <span class="pro"> {s.Status}</span>
    <img id="avatar" src={psi} alt="lead"></img>
   
    <h3>{s.Subject}</h3>
    <h6>Loc : Jordan</h6>
    {/* <h6>Contact Name : {s.Contact.Name}</h6> */}
    <h6>Contact Id : {s.ContactId}</h6>
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
        maxWidth={'xl'}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
 
        </Paper>
      )}
        <ToastContainer />
        {loading ? <CircularProgress size={50} /> :
  <div className="div1">
   

        
         
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
