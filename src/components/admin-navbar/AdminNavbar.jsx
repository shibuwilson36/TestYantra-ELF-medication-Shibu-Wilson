import React/*  , { useContext } */ from 'react'
import { Link } from 'react-router-dom'
// import UserContext from '../../context/userauthentication'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import Badge from '@material-ui/core/Badge';

export default function AdminNavbar(props) {
    let login = localStorage.getItem("login")
    let role = localStorage.getItem("role")

    return (
        <>
            {login === "true" ?
                <>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {role==="true" ?
                            <>
                            <li className="nav-item active">
                                <Link to='/addproduct' className="nav-link" >Add product </Link>
                            </li><li className="nav-item active">
                                <Link to='/user' className="nav-link" >User </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/edit' className="nav-link" >Edit Product </Link>
                            </li>
                            </> : null}

                        
                    </ul>
                    <ul className="navbar-nav  mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link to='/profile' className="nav-link" ><AccountCircleIcon />My Account</Link>

                        </li>
                       
                        <li className="nav-item active">
                            <Link to='/mycart' className="nav-link" >
                            <Badge badgeContent={0} color="error">
                            <i className="fas fa-cart-plus"></i>
                            My Cart
                                </Badge>
                                </Link>

                        </li><li className="nav-item active">
                            <Link to='/myorder' className="nav-link" >
                                <BookIcon />My Order</Link>

                        </li>
                        <li className="nav-item active">
                            <Link
                                onClick={() => localStorage.setItem("login",false)}

                                to='/login' className="nav-link" >
                                <i className="fas fa-user-circle"></i>Logout</Link>

                        </li>

                    </ul>
                </>
                :
                <ul className="navbar-nav ml-auto  mt-2 mt-lg-0">

                    <li className="nav-item active">
                        <Link
                            to='/login'
                            className="nav-link" >
                            <i className="fas fa-user-circle"></i>Login</Link>

                    </li>
                    <li className="nav-item active">
                        <Link
                            to='/register'
                            className="nav-link" >
                            <i className="fas fa-user-circle"></i>Register</Link>

                    </li>

                </ul>}
        </>
    )
}
