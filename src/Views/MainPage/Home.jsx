import React, { useEffect, useState, useCallback } from 'react';
import { Route, Link, BrowserRouter as Router ,useHistory, Redirect  ,NavLink, Switch} from "react-router-dom";
import{ MainPageView }from "./MainPageView";
import{ HistoryPage }from "./HistoryPage";
import About from "./About";
import WorkIcon from '@material-ui/icons/Work';
import {GlobalHistory} from '../../Helper/Middleware.Helper'
import HomeIcon from '@material-ui/icons/Home';
import{ ContactPage }from "./ContactPage";
import{ DataTable }from "./DataTable";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import psi from '../../Views/sales.png'
import {GetMainInfo_Contact} from '../../Services/APIServices_2';
import { GetMainInfo_Case } from '../../Services/APIServices';
import RefreshIcon from '@mui/icons-material/Refresh';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PrintIcon from '@mui/icons-material/Print';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


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


  const [res, setRes] = useState();
  const [rese, setRese] = useState();


  const Data = useCallback(async () => {
    const result = await GetMainInfo_Contact();
    if (result) {
      const sortedResult = result.data.sort((a, b) =>
        a.Id.localeCompare(b.Id)
      );
      setRes(sortedResult);
      console.log('item length', result.data.length);
    } else setRes(null);
  }, []);

  const GetAllData = useCallback(async () => {
    const result = await GetMainInfo_Case();
    if (result) {
      const sortedResult = result.data.sort((a, b) =>
        a.Id.localeCompare(b.Id)
      );
      setRese(sortedResult);
      console.log('item ', result.data.length);
    } else setRese(null);
  }, []);

const refresh = ()=> {
  Data();
  GetAllData();
}
const print = ()=> {
  window.print();
}


  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  useEffect(() => {
    Data()
    GetAllData()
    }, [Data,GetAllData]);


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
      <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<HomeIcon   onClick={() => { history.push('/home'); console.log("h",history) }}></HomeIcon>
</IconButton>
)} />
        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<HomeIcon  onClick={() => { history.push('/contact') }} ></HomeIcon>
</IconButton>
)} />
        <p>Contact</p>
      </MenuItem>
      <MenuItem>
   
   <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<WorkIcon   onClick={() => { history.push('/cases'); console.log("h",history) }}></WorkIcon>
</IconButton>
)} />
     <p>Case</p>
      </MenuItem>

      <MenuItem>

      <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={undefined !== res && res !== null && res.length} color="error">
                <PermContactCalendarIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={undefined !== rese && rese !== null && rese.length} color="error">
                <BusinessCenterIcon />
              </Badge>
            </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  
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
    
    <div className="App no-printme" >

    
       <Router>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{    background: 'black'}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          > */}

          {/* </Typography> */}
          <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                <RefreshIcon onClick={refresh} />
         
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
            <PrintIcon onClick={print}/>
            </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search???"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <img style={{width:'5%'}} src={psi} alt="lead"></img>
          
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                        <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<HomeIcon   onClick={() => { history.push('/home'); console.log("h",history) }}></HomeIcon>
</IconButton>
)} />
                {/* <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge> */}
            </IconButton>
      
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                        <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<WorkIcon   onClick={() => { history.push('/cases'); console.log("h",history) }}></WorkIcon>
</IconButton>
)} />
                {/* <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge> */}
            </IconButton>
   
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              {/* <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge> */}
                            <Route render={({ history}) => (
      <IconButton color="inherit" className={classes.myClassName}>

<HomeWorkIcon  onClick={() => { history.push('/contact') }} ></HomeWorkIcon>
</IconButton>
)} />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={undefined !== res && res !== null && res.length} color="error">
                <PermContactCalendarIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={undefined !== rese && rese !== null && rese.length} color="error">
                <BusinessCenterIcon />
              </Badge>
            </IconButton>
 
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
          
   
    <br/>
    <Switch>
              <Route
                exact
                path="/"
                render={() => {
                    return (
                      state.isUserAuthenticated ?
                      <Redirect to="/home" /> :
                      <Redirect to="/contact" /> 
                    )
                }}
              />
    <Route path="/about" component={HistoryPage} />
          <Route exact path="/cases" component={MainPageView} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/history" component={HistoryPage} />
          <Route exact path="/home" component={DataTable} />
   
          </Switch>
    </Router>
    </div>
  );
};