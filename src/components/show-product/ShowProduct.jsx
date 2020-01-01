import React, { useState, useEffect } from 'react'
import Search from '../search/Search'
import DisplayItem from '../display-item/DisplayItem'
import Axios from 'axios'
import Progress from '../progress/Progress'
import { withRouter } from 'react-router-dom'
import CustomizedSnackbars from '../snack-bar/SnackBar'
import TopHome from '../home/TopHome'
function ShowProduct(props) {
    let login = localStorage.getItem("login")
    let productData = {
        allData: [],
    }

    const [getData, setData] = useState(productData)
    const [getText, setText] = useState({ text: [] })
    const [conection, setConection] = useState(true)
    const [show, setShow] = useState(true)
    const [open, setOpen] = React.useState({ message: '', open: false });




    let getProductName = (event) => {
        setShow(false)
        let data = getData.allData

        let filterData = data.filter(value => (value.pName.toLowerCase()).startsWith(event))
        let newData = []
        for (const key in filterData) {
            newData.push({
                ...filterData[key]

            })
        }
        if (filterData) {
            setText({
                ...getText,
                text: newData



            })
        } else {
            setText({
                ...getText,
                text: []
            })
        }

    }

    let getAllAccount = async () => {
        try {
            const url = 'http://192.168.43.253:8080/showproducts'

            let response = await Axios.get(url)
            console.log('asdjgfjfjhfhfhg', response.data);


            let newData = []
            for (const key in response.data.products) {
                newData.push({
                    ...response.data.products[key],
                    done: false,
                    pId: key
                })
            }
            console.log(newData);





            if (response.status === 200) {
                setConection(false)

                setData({
                    allData: newData
                })
                setText({
                    ...getText,
                    text: newData
                })
            }
        } catch (error) {

        }

    }
    useEffect(() => {
        getAllAccount()
    }, [])





    const handleBuy = (value) => {
        if (login === "true") {
            // let cartData = value.price
            // let datas = value
            // localStorage.setItem("cartData", cartData)
            // localStorage.setItem("datas",JSON.stringify(datas))
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

    const handleShow = (data) => {

        props.handleShow(data)
        props.history.push("/showitem")

    }

    return (
        <>

            <Search getProductName={getProductName} />


            {conection ? <Progress /> : show ? <TopHome /> : null}
            {getText.text.map((value, index) => {

                return (
                    <div className="container-fluid col-md-11">

                        <DisplayItem
                            handleShow={handleShow}

                            handleBuy={handleBuy}
                            text={value}
                        />

                    </div>

                )


            })}
            <CustomizedSnackbars message={open.message} open={open.open} status='success' />

        </>
    )
}
export default withRouter(ShowProduct)
