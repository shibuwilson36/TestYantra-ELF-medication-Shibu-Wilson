import { TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import LoginModel from '../login-model/LoginModel'

export default function ProductView(props) {
    let productData = {
        productName: "jhhh",
        brandName: "",
        price: "",
        quantity: "",
        image: "",
        show: false,
        conection: true
    }

    const [getData, setData] = useState(productData)
const handeleKeyUp=(e)=>{
    console.log(e.target.value);
    
    setData({
        ...getData,
        productName:e.target.value
    })
        
    
}
    return (
        <div className=" card card-body">
            <h1>Add Product</h1>
            <form onSubmit={props.saveData}>
                <TextField
                
                    className="col-md-12" name="productName"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Product Name" />
                <p style={props.unameStyle}>{props.getProductName.errorName}</p>
                <TextField
                value={props.getData.brandName}
                    className="col-md-12" name="brandName"
                    onKeyUp={props.handeleKeyUp} id="standard-basic"
                    label="Brand" />
                <p style={props.unameStyle}>{props.getBrand.errorBrand}</p>

                <TextField
                value={props.getData.price}
                    className="col-md-12" name="price"
                    onKeyUp={props.handeleKeyUp} id="standard-basic"
                    label="Price" />
                <p style={props.unameStyle}>{props.getPrice.errorPrice}</p>

                <TextField
                value={props.getData.quantity}
                    className="col-md-12" name="quantity"
                    onKeyUp={props.handeleKeyUp} id="standard-basic"
                    label="Quantity" />
                <p style={props.unameStyle}>{props.getQuantity.errorQuantity}</p>
                <TextField
                value={props.getData.type}
                    className="col-md-12" name="type"
                    onKeyUp={props.handeleKeyUp} id="standard-basic"
                    label="Type" />
                    <TextField
                    value={props.getData.description}
                    className="col-md-12" name="description"
                    onKeyUp={props.handeleKeyUp} id="standard-basic"
                    label="Description" />
                <TextField
                value={props.getData.image}
                    className="col-md-12" name="image"
                    onKeyUp={props.handeleKeyUp} id="standard-basic"
                    label="Image" />
                <p style={props.unameStyle}>{props.getImage.errorImage}</p>

                <div className="offset-md-4 ">
                    <Button type="sumbit" variant="contained" color="primary">
                        Add Product
                </Button>
                    {props.getData.show ?
                        <LoginModel action={"Added"} conection={props.getData.conection} />
                        : null
                    }
                </div>
            </form>

        </div>
    )
}
