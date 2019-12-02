import httpService from './HttpService'
export default {
    getOrders,
    addOrder,
    getOrderById
};

// const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/order' : '//localhost:3000/order';
const axios = require('axios');

function getOrders() {
    return httpService.get('order')
};

async function addOrder(order) {

    order.createdAt= new Date().toLocaleDateString();
    const newOrder=await httpService.post(`api/order`, order)
    console.log(newOrder)
    return newOrder
}

function getOrderById(id) {
    console.log(id)
    return httpService.get(`api/order/${id}`)
};

function makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}