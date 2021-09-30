import React, { useEffect, useState, useCallback } from 'react';
import { Route, Link, BrowserRouter as Router ,useHistory, Redirect  ,NavLink, Switch} from "react-router-dom";
import{ MainPageView }from "./MainPageView";
import{ HistoryPage }from "./HistoryPage";
import About from "./About";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/Info';
import {GlobalHistory} from '../../Helper/Middleware.Helper'
import HomeIcon from '@material-ui/icons/Home';
import{ ContactPage }from "./ContactPage";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const useStyles = makeStyles((theme) => ({
  myClassName: {
    // backgroundColor: "red",
    position: "relative",
    "&:hover": {
      backgroundColor: "#FEBB0B"
    }
  }
}));


//sadsaddas
 export const Home = (handleClickOpen , handleCloseD,handleOpenD,openD) => {

  const [state, setState] = useState({
    name: "React",
    isUserAuthenticated: true
  } );
  const classes = useStyles();

  const history = useHistory();

  const location = {
    pathname: '/cases',
  }
   const handleClick =()=> {
    GlobalHistory.push('/cases');

  }
  return (
    <div className="App">
           <Router>
       <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static"style={{ borderRadius: "10px" ,   backgroundColor: "#231E39" ,filter: 'drop-shadow(2px 4px 6px black)' ,  width: 'fit-content' , margin:'1px auto'}}
 >
        <Toolbar style={{height: '80px',width: '300px',
    display: 'flex',
    justifyContent: 'center' ,filter: 'drop-shadow(2px 4px 6px black)' ,alignItems: 'end'  }}>
   
          <Route exact path="/">
    <Redirect to="/about" />
</Route>
         <nav className='navbar navbar-toggleable-sm'>


        <div className='collapse navbar-collapse justify-content-center' id='navbarNav' >
          <ul className='nav flex-column flex-md-row' role='nav'>
          <div>
            <li className='nav-item'>
              {/* Note about Links: parent route is active when any child route is active (it has always class ¨'nav-link-active'). We want the link to '/' be active only when the index route is active. For this reason, we will use 'IndexLink' */}
              {/* <Link to='/about' className='nav-link' activeClassName='nav-link-active'>Home</Link> */}
       
              <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<HomeIcon  onClick={() => { history.push('/contact') }} ></HomeIcon>
</IconButton>
)} />
              {/* 'activeClassName' allow us to add class when the link is active (current Route). Another option is using 'activeStyle' and CSS styles. */}
            </li>
            </div>
            <div>

            <li className='nav-item'>
              {/* Link is similar to <a/> tag. The difference is that Link is aware of the Router (screen) it is rendered in. It allows you to wire together links with Routes (via 'to' attribute). */}
              {/* <Link className='nav-link' activeClassName='nav-link-active' to=''>About</Link> */}
              <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<InfoIcon  onClick={() => { history.push('/history') }} ></InfoIcon>
</IconButton>
)} />
            </li>
            </div>
            <div>

            <li className='nav-item'>
            
              <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<PhotoLibraryIcon   onClick={() => { history.push('/gallery') }} ></PhotoLibraryIcon>
</IconButton>
)} />
              {/* <Link className='nav-link' activeClassName='nav-link-active' to='/gallery'>Gallery</Link> */}
            </li>
</div>
<div>
            <li className='nav-item'>
              {/* <Link className='nav-link' activeClassName='nav-link-active' to={location} >Cases</Link> */}
              <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<WorkIcon   onClick={() => { history.push('/cases'); console.log("h",history) }}></WorkIcon>
</IconButton>
)} />
            </li>
            </div>
          </ul>
  
        
        </div>
      </nav>
      

         

          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
    <br/>
    <Switch>
              <Route
                exact
                path="/"
                render={() => {
                    return (
                      state.isUserAuthenticated ?
                      <Redirect to="/contact" /> :
                      <Redirect to="/history" /> 
                    )
                }}
              />
    <Route path="/about" component={HistoryPage} />
          <Route exact path="/cases" component={MainPageView} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/history" component={HistoryPage} />
          <Route exact path="/gallery" component={About} />
   
          </Switch>
    </Router>
    </div>
  );
};