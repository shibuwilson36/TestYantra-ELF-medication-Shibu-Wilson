import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'
    },

}));

export default function TransitionsModal(props) {
    const classes = useStyles();





    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={!props.conection}

                BackdropComponent={Backdrop}

            >
                {props.conection ? <h1>{props.action}</h1> :
                    <CircularProgress
                        style={{
                            outline: 'none'
                        }}
                        size={55}
                        thickness={4}
                        variant="indeterminate"
                        
                    />}


            </Modal>
        </div>
    )
}