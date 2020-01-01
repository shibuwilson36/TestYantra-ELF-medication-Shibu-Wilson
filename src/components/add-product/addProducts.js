import Axios from "axios";
let userIdl = localStorage.getItem("userId")

let addProduct = async (data) => {


    if (data) {
        const formData = {
            pName: data.pName,
            company: data.company,
            price: data.price,
            quantity: data.quantity,
            pImage: data.pImage,
            wish: data.wish,
            userId: userIdl

        }
        console.log(formData);

        try {
            const url = 'https://react-shoping-cart-66dac.firebaseio.com/order-list/'+userIdl+'.json'

            const response = await Axios.post(url, formData)
            if (response.status === 200) {
                
                

            }
        } catch (error) {
            console.log(error);

        }
    }
}
export default addProduct