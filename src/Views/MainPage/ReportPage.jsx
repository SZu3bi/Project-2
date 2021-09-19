import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';


export const ReportPage = ({openReport ,o, props}) => {


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));




    return (
          <div>

<Dialog
        fullScreen={fullScreen}
        open={openReport}
        maxWidth={'xl'}
        aria-labelledby="responsive-dialog-title">
        <DialogContent  >
        {/* <iframe title="Zaid Reports" width="1200" height="460" src="https://app.powerbi.com/view?r=eyJrIjoiYTk2YWJkMzMtNDRlNC00ODFmLWIyZDgtODBhYjg4ZDIwNmUxIiwidCI6IjkxMDdlODQ0LTg4Y2MtNGM0MS04ZjU1LThjMDhiMjNkNDgxZiIsImMiOjl9" frameborder="0" allowFullScreen="true"></iframe> */}
        <Button autoFocus onClick={openReport} color="primary">
          Exit
        </Button>
</DialogContent>
</Dialog>
</div>)}