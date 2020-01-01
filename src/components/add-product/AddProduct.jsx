import { TextField, Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import LoginModel from '../login-model/LoginModel'
import Axios from 'axios'
// import ProductView from './ProductView'

export default function AddProduct(props) {
    let productData = {
        pName: "",
        company: "",
        price: "",
        quantity: "",
        pImage: "",
        category:'',
        show: false,
        conection: true
    }

    const [getData, setData] = useState(productData)
    const [getProductName, setProductName] = useState({ errorName: '', showName: false })
    const [getBrand, setBrand] = useState({ errorBrand: "", showBrand: false })
    const [getPrice, setPrice] = useState({ errorPrice: "", showPrice: false })
    const [getQuantity, setQuantity] = useState({ errorQuantity: "", showQuantity: false })
    const [getImage, setImage] = useState({ errorImage: "", showImage: false })



    let handeleKeyUp = (event) => {

        setData({
            ...getData,
            [event.target.name]: event.target.value.trim()
        })
        if (event.target.name === "pName") {
            let pName = event.target.value.trim()
            if ((pName < 1)) {

                setProductName({
                    showName: false,
                    errorName: "space is not valid"

                })
            } else if ((pName.match(/[0-9]/) || pName.match(/[!-=]/))) {

                setProductName({
                    showName: false,
                    errorName: "It should only contain letters"

                })
            } else {
                setProductName({
                    errorName: "",
                    showName: true

                })
            }
        }
        if (event.target.name === "company") {
            let company = event.target.value.trim()
            if (company.length < 1) {
                setBrand({
                    showBrand: false,
                    errorBrand: "space is not valid"

                })
            }
            else if ((company.match(/[0-9]/) || company.match(/[!-=]/))) {

                setBrand({
                    showBrand: false,
                    errorBrand: "It should only contain letters"

                })
            } else {
                setBrand({
                    errorBrand: "",
                    showBrand: true

                })
            }
        }
        if (event.target.name === "price") {
            let price = event.target.value.trim()
            if (price.length < 1) {
                setPrice({
                    showPrice: false,
                    errorPrice: "space is not valid"

                })
            }
            else if ((price.match(/[a-z]/) || price.match(/[A-Z]/))) {

                setPrice({
                    showPrice: false,
                    errorPrice: "It should only contain Number"

                })
            } else {
                setPrice({
                    errorPrice: "",
                    showPrice: true

                })
            }
        }
        if (event.target.name === "quantity") {
            let quantity = event.target.value.trim()
            if (quantity.length < 1) {
                setQuantity({
                    showQuantity: false,
                    errorQuantity: "space is not valid"

                })
            }
            else if ((quantity.match(/[a-z]/) || quantity.match(/[A-Z]/))) {

                setQuantity({
                    showQuantity: false,
                    errorQuantity: "It should only contain Number"

                })
            } else {
                setQuantity({
                    errorQuantity: "",
                    showQuantity: true

                })
            }
        }
        if (event.target.name === "pImage") {
            let pImage = event.target.value.trim()
            if (pImage.length < 1) {
                setImage({
                    showImage: false,
                    errorImage: "space is not valid"

                })
            }
            else if ((pImage.length > 500)) {

                setImage({
                    showImage: false,
                    errorImage: "Invalid Path"

                })
            } else {
                setImage({
                    errorImage: "",
                    showImage: true

                })
            }
        }


    }
   
    const saveData = (event) => {
        event.preventDefault()
        if (getProductName.showName && getBrand.showBrand && getImage.showImage
            && getPrice.showPrice && getQuantity.showQuantity) {

            setData({
                show: true
            })

            const formData = {
                pName: getData.pName,
                company: getData.company,
                price: getData.price,
                quantity: getData.quantity,
                pImage: getData.pImage,
                category:getData.category
            }
            console.log(formData);


        const url = 'http://192.168.43.253:8080/addproduct'
           
            Axios.post(url, formData).then((success) => {
                console.log(success);
                if (success.status === 200) {
                    setData({

                        conection: true,

                    })
                    props.history.push("/")
                }


            }).catch(error => {
                console.log(error);

            })


        } else {
            if (!getData.company) {
                setBrand({
                    ...getBrand,
                    errorBrand: "Brand Name cannot be left blank"
                })
            } if (!getData.pName) {
                setProductName({
                    ...getProductName,
                    errorName: "Product Name cannot be left blank"
                })
            } if (!getData.price) {
                setPrice({
                    ...getPrice,
                    errorPrice: "Price  cannot be left blank"
                })
            }
            if (!getData.quantity) {
                setQuantity({
                    ...getQuantity,
                    errorQuantity: "Quantity cannot be left blank"
                })
            } if (!getData.pImage) {
                setImage({
                    ...getImage,
                    errorImage: "pImage cannot be left blank"
                })
            }
        }
    }
    const unameStyle = {
        color: 'red',
        fontSize: '10px'
    }


    return (
        <div className=" card card-body mt-5">
            <h1>Add Product</h1>
            <form onSubmit={saveData}>
                <TextField
                    className="col-md-12" name="pName"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Product Name" />
                <p style={unameStyle}>{getProductName.errorName}</p>
                <TextField
                    className="col-md-12" name="company"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Brand" />
                <p style={unameStyle}>{getBrand.errorBrand}</p>

                <TextField
                    className="col-md-12" name="price"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Price" />
                <p style={unameStyle}>{getPrice.errorPrice}</p>

                <TextField
                    className="col-md-12" name="quantity"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Quantity" />
                <p style={unameStyle}>{getQuantity.errorQuantity}</p>
                <TextField
                    className="col-md-12" name="category"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="category" />
                <TextField
                    className="col-md-12" name="description"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Description" />
                <TextField
                    className="col-md-12" name="pImage"
                    onKeyUp={handeleKeyUp} id="standard-basic"
                    label="Image" />
                <p style={unameStyle}>{getImage.errorImage}</p>

                <div className="offset-md-4 ">
                    <Button type="sumbit" variant="contained" color="primary">
                        Add Product
                </Button>
                    {getData.show ?
                        <LoginModel action={"Added"} conection={getData.conection} />
                        : null
                    }
                </div>
            </form>
            {/* <ProductView
                saveData={saveData}
                handeleKeyUp={handeleKeyUp}
                getProductName={getProductName}
                getBrand={getBrand}
                getPrice={getPrice}
                getQuantity={getQuantity}
                getImage={getImage}
                getData={getData}
                unameStyle={unameStyle}

            /> */}
        </div>
    )
}

