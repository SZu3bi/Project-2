import React, { useEffect, useState, useCallback } from 'react';
import { showError, showSuccess } from '../../Helper/Tostify.Helper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetMainInfo_Contact} from '../../Services/APIServices_2';
import { GetMainInfo_Case } from '../../Services/APIServices';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';



export const DataTable = () => {
  const [result, setResult] = useState();
  const [res, setres] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [page2, setPage2] = React.useState(0);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(2);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage ) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage2 = (event, newPage ) => {
    setPage2(newPage);
  };
  const handleChangeRowsPerPage2= (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };


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


  const GetAllData_Case = useCallback(async () => {
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


  useEffect(() => {
    GetAllData()
    GetAllData_Case()
  
    }, [GetAllData,GetAllData_Case]);

    return (

     
      <div style={{width: '90%',margin: '1px auto'}}>



         {loading ? <CircularProgress /> : <div>
     
        <TableContainer component={Paper} >
        <p className="pancakes-text">Contact</p>
          <Table >
 
            <TableHead>
              <TableRow style={{backgroundColor:'#3f51b5'}}>
                <TableCell style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">Name</TableCell>
                <TableCell style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">Email</TableCell>
                <TableCell style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">Phone</TableCell>
                <TableCell style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">LeadSource</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {result && result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s ,index ) => ( 
                <TableRow>
        
                  <TableCell align="center">{s.Name}</TableCell>
                  <TableCell align="center">{s.Email}</TableCell>
                  <TableCell align="center">{s.Phone}</TableCell>
                  <TableCell align="center">{s.LeadSource}</TableCell>
                </TableRow>
                
               ))}
            </TableBody>
          </Table>
          <TablePagination
        rowsPerPageOptions={[2, 10, 100]}
        component="div"
        count={undefined !== result && result !== null && result.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableContainer>
    
        <TableContainer component={Paper} >
      
        <p className="pancakes-text">Case</p>
          <Table >
            <TableHead>
              <TableRow style={{backgroundColor:'#3f51b5'}}>
                <TableCell style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">Subject</TableCell>
                <TableCell style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">Status</TableCell>
                <TableCell style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">ContactId</TableCell>
                <TableCell style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">Origin</TableCell>
                <TableCell  style={{ fontSize: 'large',fontFamily: 'revert',fontWeight: 'bold'}} align="center">Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {res && res.slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2).map((r ,index ) => ( 
                <TableRow>
        
                  <TableCell align="center">{r.Subject}</TableCell>
                  <TableCell align="center">{r.Status}</TableCell>
                  <TableCell align="center">{r.ContactId}</TableCell>
                  <TableCell align="center">{r.Origin}</TableCell>
                  <TableCell align="center">{r.Priority}</TableCell>
                </TableRow>
               ))}
            </TableBody>
          </Table>
          <TablePagination
        rowsPerPageOptions={[2, 10, 100]}
        component="div"
        count={undefined !== res && res !== null && res.length}
        rowsPerPage={rowsPerPage2}
        page={page2}
        onPageChange={handleChangePage2}
        onRowsPerPageChange={handleChangeRowsPerPage2}
      />
        </TableContainer>
        </div>}
        </div>
      
      );

}