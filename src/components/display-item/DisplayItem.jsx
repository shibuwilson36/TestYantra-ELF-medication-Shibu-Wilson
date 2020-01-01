import React  from 'react'
// import Model from '../model/Model'
import Grow from '@material-ui/core/Grow';
import './Display.css'


export default function DisplayItem(props) {
   
    return (
        <Grow in={true} >
            <div className="card mb-5 ml-1 col-md-3  float-left  my-card" onClick={() =>props.handleShow(props.text)}>


                <div className="view overlay mt-3">
                    <img className="card-img-top" width="10%" height="150px" src={props.text.pImage} alt='c' />

                </div>

                <div className="card-body">
                    <h4 className=" text-center">{props.text.pName}</h4>
                    <p className="text-center">{props.text.company}</p>
                    <button className="offset-5 btn1 ">4.1<i className="fas fa-star text-light"></i></button>
                    <h5 className="text-center">₹{props.text.price}</h5>
                    <p className="text-center text-success">Min 50% off</p>



                </div>
                
            </div>
        </Grow>
    )
}
