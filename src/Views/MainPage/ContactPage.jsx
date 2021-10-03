
import React, { useEffect, useState, useCallback } from 'react';
import { showError, showSuccess } from '../../Helper/Tostify.Helper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { CreateMainInfo_Contact, GetMainInfo_Contact ,DeleteInfo_Contact,EditInfo_Contact } from '../../Services/APIServices_2';
import { Source } from './Option/Option';
import { GetMainInfo_Case } from '../../Services/APIServices';
import { ContactPageupsert } from './ContactPageupsert';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import psi from '../../Views/sales.png'
import Menu from '@material-ui/core/Menu';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';





const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


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

export const ContactPage = () => {

  
  const [openD, setOpenD] = React.useState(false);
  const handleOpenD = () => setOpenD(true);
  const handleCloseD = () => setOpenD(false);

 
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);

const [openContactAdd, setOpenContactAdd] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
const [open, setOpen] = useState(false);
const [result, setResult] = useState();
const [casedata , setCasedata] = useState();
const [EditVal, setEditVal] = useState();
const [loading, setLoading] = useState(true);
const [success, setSuccess] = useState(false);
console.log(success);
const [states, setStates] = useState({
    name: '',
    phone:'',
    email:'',
    leadSource:'',
    rate:0
  } );


  const openvalchangeContact = () => { 
    setOpen(false);   
}
/////////////////////////////////  API`s  ///////////////////////////////////////

/////  Get API
const GetAllData = useCallback(async () => {
  setLoading(true);
  const result = await GetMainInfo_Contact();
  if (result) {
    const sortedResult = result.data.sort((a, b) =>
      a.Id.localeCompare(b.Id)
    );
    setResult(sortedResult);
    console.log('item ', result.data.length);
  } else setResult(null);
  setLoading(false);
}, []);


const CaseData = useCallback(async () => {
  setLoading(true);
  const result = await GetMainInfo_Case();
  if (result) {
    const sortedResult = result.data.sort((a, b) =>
      a.Id.localeCompare(b.Id)
    );
    setCasedata(sortedResult);
    console.log('item length', result.data.length);
  } else setCasedata(null);
  setLoading(false);
}, []);



const handleEditButton = async () => {
  setLoading(true);
  openvalchangeContact();
  showSuccess(('Edit Successfully'));

  const result = await EditInfo_Contact(idedit,states);
  if (result) {
    GetAllData();
    showSuccess(('Edit Successfully'));
  } else showError(('Edit Failed'));
  setLoading(false);

};
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

useEffect(() => {
  if (idedit) {
    setStates((item) => ({...item,
      id:(idedit && idedit.Id) || '',
      name: (idedit && idedit.Name) || '',
      phone: (idedit && idedit.Phone) || '',
      email: (idedit && idedit.Email) || '',
      leadsource: (idedit && idedit.LeadSource) || '',
      rate: (idedit && idedit.Rating__c) || ''

    
    }))

    setidedit(idedit && idedit.Id)
    console.log('Data>>>' , idedit.Name);
  }

  

}, [idedit])

console.log("Contact-data" , result);
console.log("Case-data" , casedata);


//   const clearState = () => {
//     setName({
//       subject: '',
//       status: '',
//       origin: '',
//       priority: '',
//       email: '',
//       type: ''
//     });
//   };

// const hundle = ()=>{
//   if (name.subject !== '') {
//     handleCreateButton();
   
//   }else
//       showError(('Fill Subject'));
// }

/////  Create API
const handleCreateButtons_2 = async () => {
  setLoading(true);
  const result = await CreateMainInfo_Contact(states);
  if (result) {
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

const handleRemove = () => {
  setResult(result.filter(p => p.Id !== casedata.ContactId));
};
/////  Delete API
const handleDeleteButton = async (deletedId) => {
  setLoading(true);
  const result = await DeleteInfo_Contact(deletedId);
 
   if (result) {    
    showSuccess(('Deleted Successfully'));
    setSuccess(false);
    GetAllData();
    setLoading(true);
// setTimeout(() => {
 
 
//       }, 100);
    }else{
      showError(('Delete Failed'));
        }
    };


    // var mybutton = document.getElementById("myBtn");
    // window.onscroll = function() {scroll()};

    // const  scroll =() => {
    //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //     mybutton.style.display = "block";
    //   } else {
    //     mybutton.style.display = "block";
    //   }
    // }
    const clearState = () => {
      setStates({
        name: '',
        phone:'',
        email:'',
        leadSource:''
      });
     
    };
    const top = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      console.log("sssss");
    }

/////////////////////////////////  API`s  ///////////////////////////////////////
useEffect(() => {
    GetAllData()
    CaseData()
    }, [GetAllData , CaseData]);



const handleClickOpen = (id) => {
//   console.log('subject: ', name.subject);
if(id==1){
  setOpenContactAdd(true);
}else if (id==3){
  window.print();
}
};
const handleClose = () => {
  setOpenContactAdd(false);
};

const actions = [
  { icon: <AddIcon />, name: 'Add' ,id:1 },

  { icon: <PrintIcon />, name: 'Print'  ,id:3 },
  { icon: <ShareIcon />, name: 'Share'  ,id:4 },
];

  const OpenAdd = (event) => {
    setAnchorEl(event.currentTarget);
  
  };
  const CloseAdd = () => {
    setAnchorEl(null);
    handleClickOpen();
  };

  const [collapseView, setCollapseView] = useState(false);

  const handleChange = (panel) => (index, collapseView) => {
    setCollapseView(collapseView ? panel : false);
    
  };
 

  const info  = (id , name) =>{
    showSuccess(`${id}` + "\n" +`${name}` );

  }
  console.log('collapseView',collapseView);


return (
  <div className='Agents-wrapper view-wrapper'>
   
{open && <ContactPageupsert open={open} DTO={EditVal} 
    GetAllData={() => GetAllData()} openvalchangeContact = {openvalchangeContact}/> }
    {/* <button onClick={top} id="myBtn" title="Go to top">Top</button> */}
    <div className="speedDial">
      <SpeedDial
   
        ariaLabel="SpeedDial uncontrolled open example"

        icon={<SpeedDialIcon />}
        onClose={handleCloseD}
        onOpen={handleOpenD}
        open={openD}
        direction="left"
      >
        {actions.map((action) => (
          
          <SpeedDialAction
          id={action.id}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClickOpen(action.id)}
// onClick={()=>console.log("id",action.id)}
    
          
                />
        ))}
        
      </SpeedDial>
      </div>
    {loading ? <CircularProgress /> : <div>

<div style={{display: 'inline-block'}}>
  {/* <div style={{display: 'inline-block'}}><Badge  badgeContent={undefined !== result && result !== null && result.length} color="primary" style={{float:'left'}}>
        <PersonIcon />
      </Badge></div> */}
      {/* <div>
      <Button  
      aria-controls="customized-menu"
      aria-haspopup="true"
      variant="contained"
      color="primary" 
      onClick={OpenAdd}>
        Open Menu
      </Button>
      </div> */}
     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={CloseAdd} >
        <MenuItem onClick={CloseAdd}>Add New</MenuItem>
      
      </Menu>
    </div>
<div className="cards printme">

{result && result.map((s ,index ) => ( 
<div class="card-container" key={index} >
    <span class="pro"> {s.Email}</span>
    <img id="avatar" src={psi} alt="lead"></img>
    <h3>{s.Name}</h3>
    <h3>{s.Phone}</h3>
    <h6>{s.LeadSource}</h6>
    <p>{s.Id}</p>
    <div class="buttons">
    <ButtonGroup variant="contained" size='large' color="primary" aria-label="contained primary button group">
  <Button onClick={() => { setOpen(true); setEditVal(s) }}>Edit</Button>
  <Button  color="secondary" onClick={() => handleDeleteButton(s.Id)}>Delete</Button>
  <Button  color="secondary" onClick={() => info(s.Name , s.Id)}>Info</Button>
 
</ButtonGroup>
<Rating
        name="text-feedback"
        value={s.Rating__c}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
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
 Origin : {s.Origin} <br/>
 priority : {s.Priority} <br/>
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
        open={openContactAdd}
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
          label="Name"
          variant="outlined"
          error={states.name === '' ? "error" : null}
          value={states.name}
          onChange={(event) => {
            setStates((names) => ({ ...names, name: event.target.value })) }} />
            </div>
            <div>
<TextField
          required
          id="outlined-required"
          label="Phone"
          variant="outlined"
          error={states.phone === '' ? "error" : null}
          value={states.phone}
          onChange={(event) => {
            setStates((item) => ({ ...item, phone: event.target.value })) }} /> 
             </div>
            <div>
<TextField
          required
          id="outlined-required"
          label="Email"
          variant="outlined"
          error={states.email === '' ? "error" : null}
          value={states.email}
          onChange={(event) => {
            setStates((item) => ({ ...item, email: event.target.value })) }} /> 
             </div>
             <div>
             <TextField
   select
   error={states.leadSource === '' ? "error" : null}
   className={classes.textField}
   label="Lead Source"
   helperText="Please select lead Source"
   variant="outlined"
   value={states.leadSource}
   onChange={(event) => {
    setStates((item) => ({ ...item, leadSource: event.target.value })) }}
 >
   {Source.map((option) => (
     <MenuItem key={option.value} value={option.value}>
       {option.label}
     </MenuItem>
   ))}
 </TextField>
 </div>
              </form>

   </div> }


       </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
  <ButtonGroup variant="contained" size='large' color="primary" aria-label="contained primary button group">
  <Button  onClick={handleCreateButtons_2}>Save</Button>
  {/* <Button color='inherit' onClick={() => {clearState()} }>Clear</Button> */}
  <Button  color="secondary" onClick={handleClose}>Exit</Button>
</ButtonGroup>
        </DialogActions>    
      </Dialog>

    </div>
    </div>}
</div>
);
};
