import React, { useState } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { UserProvider } from './context/userauthentication'
import Navbar from './components/navbar/Navbar'
import Register from './components/sign-up/Register'
import Profile from './components/profile/Profile'
import PaymentOption from './components/payment-option/PaymentOption'
import MyOrder from './components/my-order/MyOrder'
import ShowProduct from './components/show-product/ShowProduct'
import MyCart from './components/my-cart/MyCart'
import Login from './components/login/Login'
import AddProduct from './components/add-product/AddProduct.jsx'
import EditProduct from './components/add-product/EditProduct'
import './App.css'
import Checkout from './components/buy/Checkout'
import User from './components/user-info/User'
import ShowItem from './components/display-item/ShowItem';

export default function App(props) {
  let state = {
    role: true,
    login: false,
    authentication: (isLogin) => {
      validatin(isLogin)
    },
    setRole: (isrole) => {
      setstate({
        role: true
      })
    }
  }
  const [getState, setstate] = useState(state)
  const [getData, setData] = useState({ data: [] })
  const [getItem, setItem] = useState({ data: "" })

  let validatin = (isLogin) => {
    setstate({
      getState,
      login: isLogin
    })
    localStorage.setItem("login", isLogin)
  }
  let login = localStorage.getItem("login")
  let role = localStorage.getItem("role")
  const handleData = (data) => {
    if(Array.isArray(data)){
      setData({
        data: data
      })
    }else{
      setData({
        data: [data]
      })
    }
    
  }
  const handleShow = (datas) => {
    console.log(datas);

    setItem({
      data: datas
    })
  }

  return (
    <>
      <BrowserRouter>

        <UserProvider value={getState}>
          <div className="">

            <Navbar />
            <div className="App-header">
              <Switch>
                <Route exact path='/' render={() => <ShowProduct handleData={handleData} handleShow={handleShow} />} />
                <Route exact path='/showitem' render={() => <ShowItem getData={getItem.data} handleData={handleData} />} />

                {login === "true" ?
                  <>

                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/mycart' render={() => <MyCart handleData={handleData} />} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/pay' component={PaymentOption} />
                    <Route exact path='/myorder' component={MyOrder} />
                    <Route exact path='/check' render={() => <Checkout getData={getData.data} />} />
                    {role ? <>
                      <div className=" offset-md-4 offset-1 offset-sm-1 col-10 col-sm-10 col-md-4 mt-3">
                        <Route exact path='/addproduct' component={AddProduct} />
                      </div>
                      <Route exact path='/user' component={User} />
                      <Route exact path='/edit' component={EditProduct} />
                    </>
                      : null}

                  </> :
                  <>
                    <Route exact path='/login' component={Login} />

                  </>}

                  <Redirect from='*' to='/' />

              </Switch>
              <Route exact path='/register' component={Register} />
              {/* <Route  path='*' component={Register} /> */}

            </div>
          </div>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}
