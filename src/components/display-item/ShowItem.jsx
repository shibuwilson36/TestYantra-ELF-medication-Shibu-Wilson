import React from 'react'
import './ShowItem.css'
import { withRouter } from 'react-router-dom';
import CustomizedSnackbars from '../snack-bar/SnackBar';
import Axios from 'axios';
import { CircularProgress } from '@material-ui/core';
function ShowItem(props) {
    const [open, setOpen] = React.useState({ message: '', open: false });
    const [done, setDone] = React.useState(false);
    const [goTo, setGoTo] = React.useState(true);
    let login = localStorage.getItem("login")
    let userId = localStorage.getItem("userId")

    const handleBuy = (value) => {
        if (login === "true") {
            props.handleData(value)
            props.history.push("/check")
        } else {
            setOpen({
                open: true,
                message: "pls login "
            })
            setTimeout(() => {
                props.history.push("/login")
            }, 500);
        }

    }
    let addToCart = async (data) => {
        
        let userIdl = localStorage.getItem("userId")
        if (login === "false") {
            setOpen({
                open: true,
                message: "pls login "
            })
            setTimeout(() => {
                props.history.push("/login")
            }, 1000);
        }
        if (login === "true") {
            setDone(true)
            if (goTo) {
                setGoTo(false)
                const formData = {
                    pName: data.pName,
                    company: data.company,
                    price: data.price,
                    quantity: data.quantity,
                    pImage: data.pImage,
                    wish: data.wish,
                    userId: userIdl,
                    pid: data.pid


                }
                console.log(formData);
                
                    try {

                        const url = 'https://react-shoping-cart-66dac.firebaseio.com/cart-list/' + userId + '.json'

                        const response = await Axios.post(url, formData)
                        if (response.status === 200) {
                            setOpen({
                                open: true,
                                message: "Add to cart List"
                            })
                            setDone(false)

                        }

                    } catch (error) {

                        console.log(error);

                    }
                
            }else {

                props.history.push('/mycart')

            }

        }



    }
    return (
        <div className="container-fluid mt-3 p-2">
            <div className="card col-md-4 float-left "  >


                <div className=" card-body ">

                    <img width="90%" height="424px" src={props.getData.pImage} alt=""></img>
                    <div className="col-md-6 col-sm-5 col-5 mt-3 mb-3 float-left" >
                        <button
                            onClick={() => addToCart(props.getData)}
                            className="btn my-btn1">
                            <i class="fas fa-cart-plus"></i>
                            {done ? <CircularProgress size={24} color="secondary" />
                                : goTo?" Add To Cart":"Go to Cart"
                            }
                        </button >
                    </div>
                    <div className="col-md-5 col-sm-5 col-5 mt-3 mb-3  float-left" >
                        <button
                            onClick={() => handleBuy(props.getData)}
                            className=" my-btn2">
                            <i class="fas fa-bolt"></i>
                            Buy Now
                        </button >
                    </div>
                </div>

            </div>
            <div height="390px" className="card  col-md-8  float-left"  >


                <div className=" card-body ">
                    <h4>{props.getData.pName}</h4>
                    <p className="text-success">Special price</p>
                    <h1 className="float-left">₹{props.getData.price}</h1>
                    <p className=""> <strike>₹1,399</strike> <span className="text-success">54% off </span> Hurry, Only 2 left<i class="fas fa-exclamation-circle text-secondary"></i></p> 
                   <br/>
                    <p>
                        Available offers
                    </p>

                    <p className="ml-5">
                        <i class="fas fa-bookmark text-success"></i>
                        Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C</p>


                    <p className="ml-5">
                        <i class="fas fa-bookmark text-success"></i>
                        Bank OfferExtra 5% off* with Axis Bank Buzz Credit CardT&C</p>
                    <p>
                        <i className="fas fa-map-marker-alt text-primary"></i>

                        Deliver to
                        </p>
                    <input type="text" /><button className="my-btn3">check</button>
                    <p>Usually delivered in3-4 days <i class="far fa-question-circle text-secondary"></i></p>
                    <p>Enter pincode for exact delivery dates/charges</p>
                    <p>Services</p>

                    <p className="ml-5"><i class="fas fa-sync"></i> 30 Day Return Policy?</p>
                    <p className="ml-5"><i class="far fa-question-circle text-primary"></i>Cash on Delivery available</p>
                </div>

            </div>

            <CustomizedSnackbars message={open.message} open={open.open} status='success' />
        </div>

    )
}
export default withRouter(ShowItem)
