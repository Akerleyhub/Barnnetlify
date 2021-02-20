import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
//const BASE_API_URL = "http://localhost:3001";
//all the api backend requests
class APIpage {
    static async login(logininfo) {
        const result = await axios.post(`${BASE_API_URL}/auth/login`, logininfo);
        return result.data;
    }

    static async updateUser(userinfo) {
        let token = localStorage.getItem('_token');
        const result = await axios.patch(`${BASE_API_URL}/users/${userinfo.username}?_token=${token}`, userinfo);
        return result.data;
    }

    static async register(signupinfo) {
        console.log(signupinfo);
        const result = await axios.post(`${BASE_API_URL}/users`, signupinfo);
        return result.data;
    }

    static async getUser(){
        let token = localStorage.getItem('_token')
        const result = await axios.get(`${BASE_API_URL}/users/singleuser?_token=${token}`);
        return result.data;
    }

    static async addOrder(orders) {
        let token = localStorage.getItem('_token');
        const result = await axios.post(`${BASE_API_URL}/orders/addOrder?_token=${token}`, orders);
        return result.data;
    }

    static async addOrderItems(orderitems) {
        let token = localStorage.getItem('_token');
        const result = await axios.post(`${BASE_API_URL}/orders/addOrderItems?_token=${token}`, orderitems);
        return result.data;
    }

    static async getQR(){
        let token = localStorage.getItem('_token');
        const result = await axios.get(`${BASE_API_URL}/orders/getQRcode?_token=${token}`);
        console.log(result.data);
        return result.data;
    }

    static async getQRCodeEmail(){
        let token = localStorage.getItem('_token');
        const noresturn = await axios.post(`${BASE_API_URL}/orders/sendQRemail?_token=${token}`);
        return null;
    }

    static async getOrders(){
        let token = localStorage.getItem('_token');
        const result = await axios.get(`${BASE_API_URL}/orders/undoneorders?_token=${token}`);
        console.log(result.data);
        return result.data;
    }

    static async markDone(vals){
        let token = localStorage.getItem('_token');
        const result = await axios.patch(`${BASE_API_URL}/orders/finishorder?_token=${token}`, vals);
        return result.data;
    }

}

export default APIpage;
