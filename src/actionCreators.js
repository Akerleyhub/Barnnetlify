import axios from 'axios';
import {useHistory} from 'react-router-dom';

//for getting blogs
export function getitemsAPI(){
    return async function(dispatch) {
        let res = await axios.get('http://localhost:5000/api/posts');
        dispatch(gotItems(res.data))
    }
}

//for getting 1 blog
export function getfoodAPI(id){
    return async function(dispatch) {
        let res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        dispatch(gotfood(res.data))
    }
}

export function geticecreamAPI(id){
    return async function(dispatch) {
        let res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        dispatch(goticecream(res.data))
    }
}

//for adding blogs
// export function addBlogsAPI(data){
//     return async function(dispatch) {
//         console.log('data:',data);
//         let res = await axios.post('http://localhost:5000/api/posts',data);
//         dispatch(plusBlogs(res.data))
//     }
// }

// //for deleting blogs
// export function deleteBlogsAPI(id){
//     return async function(dispatch) {
//         let res = await axios.delete(`http://localhost:5000/api/posts/${id}`);
//         dispatch(delBlogs(id))
//     }
// }

// //for updating blogs
// export function updateBlogsAPI(id, data){
//     return async function(dispatch) {
//         let res = await axios.put(`http://localhost:5000/api/posts/${id}`, data);
//         dispatch(updBlogs(res.data))
//     }
// }

// //for voting blogs
// export function upodownBlogsAPI(id,direction){
//     return async function(dispatch) {
//         let res = await axios.post(`http://localhost:5000/api/posts/${id}/vote/${direction}`);
//         console.log(res.data);
//         dispatch(voteBlogs(id,res.data))
//     }
// }


//--------------------Functions tobe called to dispatch--------------------------------------

export function gotItems(data){
    return {
        type: 'GET_CART',
        data
    }
}

export function gotfood(data){
    return {
        type:'GET_FOOD',
        data
    }
}

export function goticecream(data){
    return {
        type:'GET_ICECREAM',
        data
    }
}

// export function plusBlogs(data){
//     return {
//         type: 'ADD_CART',
//         data
//     }
// }

// export function delBlogs(data){
//     return {
//         type: 'DELETE_CART',
//         data
//     }
// }

// export function updBlogs(data){
//     return {
//         type: 'UPDATE_BLOG',
//         data
//     }
// }

// export function voteBlogs(id, data){
//     return {
//         type: 'VOTE_BLOG',
//         id:id,
//         votes:data.votes
//     }
// }

