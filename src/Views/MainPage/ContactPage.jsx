
import React, { useEffect, useState, useCallback } from 'react';
import { showError, showSuccess } from '../../Helper/Tostify.Helper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { CreateMainInfo_Contact, GetMainInfo_Contact ,DeleteInfo_Contact } from '../../Services/APIServices_2';


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

 
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);

const [opennn, setOpennn] = React.useState(false);
const [o, setO] = useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
const [open, setOpen] = useState(false);
const [p, setP] = useState(false);
const [result, setResult] = useState();

const [EditVal, setEditVal] = useState();
const [loading, setLoading] = useState(true);
const [success, setSuccess] = useState(false);
console.log(success);
const [state, setState] = useState({
    name: ''
  } );



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



console.log("StateContact" , result);


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
  const result = await CreateMainInfo_Contact(state);
  if (result) {
    // clearState();
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
  const result = await DeleteInfo_Contact(deletedId);
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
//   console.log('subject: ', name.subject);
  setOpennn(true);
};
const handleClose = () => {
  setOpennn(false);
};


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

  console.log('sssssssssssss',collapseView);


return (
  <div className='Agents-wrapper view-wrapper'>
    <button onClick={top} id="myBtn" title="Go to top">Top</button>

    {/* {open && <MainPageDialogView open={open} DTO={EditVal} 
    GetAllData={() => GetAllData()} openvalchange = {openvalchange} o={o}  setO={setO}/> } */}
    {/* {o && <ReportPage open={o}  openReport = {openReport}/>}
    {p && <Picture open={p}  openPicture = {openPicture}/>} */}
    {loading ? <CircularProgress /> : <div>

<div style={{display: 'inline-block'}}>
  <div style={{display: 'inline-block'}}><Badge  badgeContent={undefined !== result && result !== null && result.length} color="primary" style={{float:'left'}}>
        <PersonIcon />
      </Badge></div>


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
        onClose={Close}
      >
        <MenuItem onClick={Close}>Add New</MenuItem>
        <MenuItem onClick={Close}></MenuItem>
        <MenuItem onClick={Close}></MenuItem>
      </Menu>
    </div>
<div className="cards">

{result && result.map((s ,index ) => ( 
<div class="card-container">
    <span class="pro"> {s.Email}</span>
    <img id="avatar" src={psi} alt="lead"></img>
    <h3>{s.Name}</h3>
    <h3>{s.Phone}</h3>
    <h6>{s.LeadSource}</h6>
    <p>{s.Id}</p>
    {/* <p> front-end developer</p> */}
    <div class="buttons">
    <ButtonGroup variant="contained" size='large' color="primary" aria-label="contained primary button group">
  <Button onClick={() => { setOpen(true); setEditVal(s) }}>Edit</Button>
  <Button  color="secondary" onClick={() => handleDeleteButton(s.Id)}>Delete</Button>
</ButtonGroup>
		
    </div>
    {/* <div class="skills">
        <h6>Case Info</h6>
        <ul>
            <li> Origin :{s.Origin}</li>
           
            <li>priority : {s.Priority}</li>
       
        </ul>
    </div> */}
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
          {/* <Typography>
          <p style={{    textAlign: 'justify' , fontSize: 'medium'}}>
<TripOriginIcon /> Origin : {s.Origin} <br/>

<PriorityHighIcon /> priority : {s.Priority} <br/>
       </p>
      
          </Typography> */}
        </AccordionDetails>
      </Accordion>
      </div>
</div>))}
</div>


    <div>
  
    <ToastContainer />

    <Dialog
        fullScreen={fullScreen}
        open={opennn}
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
          error={state.name === '' ? "error" : null}
          value={state.name}
          onChange={(event) => {
            setState((item) => ({ ...item, name: event.target.value })) }} />
            </div>
            <div>
{/* <TextField
          required
          id="outlined-required"
          label="Email"
          variant="outlined"
          error={name.email === '' ? "error" : null}
          value={name.email}
          onChange={(event) => {
            setName((item) => ({ ...item, email: event.target.value })) }} />  */}
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
