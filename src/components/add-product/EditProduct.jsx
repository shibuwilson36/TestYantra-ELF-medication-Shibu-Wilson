import React, { Component } from 'react'
import Axios from 'axios'
import EditProductUI from './EditProductUI'
import LoginModel from '../login-model/LoginModel'

export default class View extends Component {

    state = {
        account: [],
        show: false,
        pName: "",
        company: "",
        price: "",
        quantity: "",
        pImage: "",
        category: "",
        description: "",
        conection: false,
        priceError: false,
        nameError: false,
        companyError: false,
        imageError: false,
        open: {
            open: false,
            message: ''
        },
        add: false
    }
    componentDidMount() {
        this.getAllAccount()
    }


    getAllAccount = () => {

        const url = 'http://192.168.43.253:8080/showproducts'
        Axios.get(url).then(response => {
            console.log("Response", response.data.products);

            let newData = []
            for (const key in response.data.products) {
                console.log(response.data.products[key]);

                newData.push({
                    ...response.data.products[key],
                    edit: false
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

        const url = 'http://192.168.43.253:8080/deleteproduct'
        try {
            const response = await Axios.delete(url, accToDelete)
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

    handelChange = (event) => {
        const value = event.target.value
        console.log(value);

        this.setState({
            [event.target.name]: value
        })


    }
    validateData = (accToUpdates) => {
        let valid = true
        const { pName, company, price, pImage } = accToUpdates

        console.log(pName.trim().length);

        if (pImage.trim().length === 0) {
            valid = false
            this.setState({
                imageError: true,
                show: false
            })
        } else {
            this.setState({
                imageError: false,

            })
        }
        if (company.trim().length === 0) {
            valid = false
            this.setState({
                companyError: true,
                show: false
            })
        } else {
            this.setState({
                companyError: false,

            })
        }
        if (pName.match(/[0-9]/) || pName.trim().length === 0) {
            valid = false
            this.setState({
                nameError: true,
                show: false
            })
        } else {
            this.setState({
                nameError: false,

            })
        }
        if (price.toString().match(/[a-z]/) || price.toString().trim().length === 0) {
            valid = false
            this.setState({
                priceError: true,
                show: false
            })
        } else {
            this.setState({
                priceError: false,

            })
        }

        return valid
    }
    saveData = async (oldData, accToUpdates) => {
        const { pName, company, price, pImage, pid, quantity, category, description } = accToUpdates
        const accToUpdate = {
            pName, company, price, pImage, pid, quantity, category, description
        }
        console.log(accToUpdate);
        if (this.validateData(accToUpdates)) {
            accToUpdates.edit = false
            let data = this.state.account
            data[data.indexOf(oldData)] = accToUpdates;
            console.log(data);

            try {

                const url = 'http://192.168.43.253:8080/editproduct'
                const response = await Axios.post(url, accToUpdate)
                console.log(response);
                console.log(this.state);

                if (response.data.statusCode === 201) {

                    this.setState({
                        account: data,
                        nameError: false,
                        conection: true,
                        show: false
                    })

                }


            } catch (error) {

            }
        }


    }


    editOption = oldData => {
        let newData = { ...oldData }
        newData.edit = true
        let data = this.state.account
        data[data.indexOf(oldData)] = newData;
        this.setState({
            account: data
        })

    }
    isEdit = (oldData, change) => {
        let newOldData = { ...oldData }
        if (change) {
            this.setState({
                show: true,
                conection: false
            })
            const { pName, company, price, pImage, id, quantity, category, description } = this.state
            const accToUpdate = {
                pName, company, price, pImage, id, quantity, category, description
            }
            for (const key in accToUpdate) {
                if (accToUpdate[key] !== '') {
                    newOldData[key] = accToUpdate[key]
                }
            }

            let newData = { ...newOldData }

            console.log(oldData);


            this.saveData(oldData, newData)

        } else {
            let newData = { ...oldData }
            newData.edit = false
            console.log(oldData);

            let data = this.state.account
            data[data.indexOf(oldData)] = newData;
            this.setState({
                account: data,
                priceError: false,
                nameError: false
            })
        }


    }
    addData = (value) => {
        if (value) {
            const { pName, company, price, pImage, quantity, category, description } = this.state

            const formData = {
                pName: pName,
                company: company,
                price: price,
                pImage: pImage,
                quantity: quantity,
                category: category,
                description: description,
                edit: false

            }
            let account = [...this.state.account]
            account.unshift(formData)
            if (this.validateData(formData)) {
                this.setState({
                    account: account,
                    add: false
                })
            }
        } else {
            this.setState({
                add: false
            })
        }
    }
    isAdd = () => {
        console.log("ooihugyfgf");

        this.setState({
            add: true
        })
    }
    render() {
        return (
            <div className="container  mt-5  ">
                <div className="mt-5  ">
                    <EditProductUI
                        data={this.state.account}
                        delete={this.delete}
                        editOption={this.editOption}
                        isEdit={this.isEdit}
                        handelChange={this.handelChange}
                        error={this.state}
                        open={this.state.open}
                        addData={this.addData}
                        add={this.state.add}
                        isAdd={this.isAdd}


                    />
                    {this.state.show ?
                        <LoginModel action={"Added"} conection={this.state.conection} />
                        : null
                    }
                </div>
<br/>
<br/>
            </div>
        )
    }
}
