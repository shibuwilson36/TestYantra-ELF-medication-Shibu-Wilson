import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton, TextField } from '@material-ui/core';
import BadgeAvatars from './BadgeAvatars';
// import CustomPaginationActionsTable from './TablePaginationActions';
// import CircularProgress from '@material-ui/core/CircularProgress';


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        
    },
    
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        
    },
    
}))(TableRow);



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    TableContainer:{
        boxShadow:'0 0 20px'
    }
    
});


export default function CustomizedTables(props) {
    const classes = useStyles();

    return (
        <TableContainer className={classes.TableContainer}  component={Paper}>
            <Table  className={classes.table} aria-label="customized table">
                <TableHead >
                    <TableRow >

                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                        <StyledTableCell align="left">Mobile</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                {/* <CircularProgress/> */}
                    {    
                    props.data.map(row => (
                        <StyledTableRow hover key={row.id}>
                            <StyledTableCell align="left"><BadgeAvatars/></StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                            {props.edit?<TextField id="standard-basic"  defaultValue={row.firstName}/>:row.firstName }
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.email}</StyledTableCell>
                            <StyledTableCell align="left">{row.mobile}</StyledTableCell>
                            <StyledTableCell align="right">

                                <IconButton aria-label="delete" style={{ outline: 'none' }} >
                                    <DeleteOutlineIcon onClick={() => props.delete(row)}/>
                                </IconButton >
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}