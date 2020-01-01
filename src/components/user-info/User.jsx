import React, { Component } from 'react'
import Axios from 'axios'
// import { Modal } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
// import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UserUI from './UserUI';

export default class User extends Component {

    state = {
        account: [],
        show: false,
        userName: "",
        userEmail: "",
        userMobile: "",
        userPassword: "",
    }
    componentDidMount() {
        this.getAllAccount()
    }
    getAllAccount = () => {
        const url = 'https://react-shoping-cart-66dac.firebaseio.com/user-account.json'
        Axios.get(url).then(response => {
            console.log("Response", response.data);

            let newData = []
            for (const key in response.data) {
                console.log(response.data[key]);
                newData.push({
                    ...response.data[key],
                    id: key,
                    edit:false
                })
            }
            console.log(newData);
            this.setState({
                account: newData
            })

        }).catch(error => {
            console.log(error);

        })
    }
    async delete(accToDelete) {
        console.log("accToDelete", accToDelete);
        let id = accToDelete.id
        const url = `https://react-app-2a568.firebaseio.com/account/${id}/.json`
        try {
            const response = await Axios.delete(url)
            console.log("response", response);
            const myAccount = [...this.state.account]
            const index = myAccount.indexOf(accToDelete)
            myAccount.splice(index, 1)
            this.setState({
                account: myAccount
            })
        } catch (error) {
            console.log(error);

        }
    }
    handelClose = () => {
        this.setState({
            show: !this.state.show
        })
    }
    handlShow = (accToEdit) => {
        console.log("accToEdit", accToEdit);

        this.setState({
            show: !this.state.show,
            ...accToEdit
        })
    }
    handelChange = (event) => {
        const value = event.target.value
        this.setState({
            [event.target.name]: value
        })

    }
    saveData = async () => {
        console.log("State Data", this.state);
        const { userName, userEmail, userMobile, userPassword, id } = this.state
        const accToUpdate = {
            userName, userEmail, userPassword, userMobile
        }
        console.log(accToUpdate);

        const url = `https://react-app-2a568.firebaseio.com/account/${id}/.json`
        try {
            const response = await Axios.put(url, accToUpdate)
            console.log(response);
            console.log(this.state);
            if (response.status === 200) {
                console.log(this.state.account);
                console.log(accToUpdate);
                const items = [...this.state.account];
                console.log("items", items);
              

                items.map(item => {
                    if (item.id === id) {

                        item.userName = accToUpdate.userName
                        item.userEmail = accToUpdate.userEmail
                        item.userMobile = accToUpdate.userMobile
                        item.id = accToUpdate.id

                        return item;
                    } return null
                })
                console.log(items);

                this.setState({
                    account: items,
                    show: false,
                })


            }

        } catch (error) {

        }


    }
    render() {
        return (
            <div className="container mt-3 mt-5">
                 <UserUI data={this.state.account} delete={this.delete}/>
            </div>
           
            // <div className="container mt-3 mt-5">
            //     <table class="table table-bordered table-hover  bg-light">
            //         <thead className="thead-dark">
            //             <tr>
            //                 <th>Name</th>
            //                 <th>Email</th>
            //                 <th>Mobile</th>
            //                 <th>Action</th>

            //             </tr>
            //         </thead>
            //         <tbody>
            //             {this.state.account.map(value => {

            //                 return <tr key={value.id}>
            //                     <td>{value.userName}</td>
            //                     <td>{value.userEmail}</td>
            //                     <td>{value.userMobile}</td>
            //                     <td onClick={() => this.delete(value)}>
            //                         <DeleteOutlineIcon />
            //                     </td>



            //                 </tr>


            //             })}
            //         </tbody>
            //     </table>
            //     <Modal show={this.state.show} onHide={() => this.handelClose()}>
            //         <Modal.Header closeButton>
            //             <Modal.Title>Modal heading</Modal.Title>
            //         </Modal.Header>
            //         <Modal.Body>

            //             <form >
            //                 <div id="form" className="form-group  card card-body">
            //                     <h1>Create Account</h1>
            //                     <label >Name</label>
            //                     <input
            //                         name="userName"
            //                         className="form-control" type="text"
            //                         value={this.state.userName}
            //                         id="" placeholder="enter name"
            //                         onChange={this.handelChange}
            //                     ></input>
            //                     <label >Email</label>
            //                     <input
            //                         name="userEmail"
            //                         className="form-control" type="text"
            //                         value={this.state.userEmail}
            //                         id="" placeholder="enter Email"
            //                         onChange={this.handelChange}
            //                     ></input>
            //                     <label >Mobile</label>
            //                     <input
            //                         name="userMobile"
            //                         className="form-control" type="text"
            //                         value={this.state.userMobile}
            //                         id="" placeholder="enter Mobile"
            //                         onChange={this.handelChange}
            //                     ></input>
            //                     <label >Password</label>
            //                     <input
            //                         name="userPassword"
            //                         className="form-control" type="text"
            //                         value={this.state.userPassword}
            //                         id="" placeholder="enter Password"
            //                         onChange={this.handelChange}
            //                     ></input>
            //                 </div>



            //             </form>


            //         </Modal.Body>
            //         <Modal.Footer>
            //             <Button variant="secondary" onClick={() => this.handelClose()}>
            //                 Close
            //          </Button>
            //             <Button variant="primary" onClick={() => this.saveData()}>
            //                 Save Changes
            //          </Button>
            //         </Modal.Footer>
            //     </Modal>
            // </div>
        )
    }
}
