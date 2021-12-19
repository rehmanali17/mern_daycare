import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const getPostsApi = () => axios.get('http://localhost:5000')
export const contactApi = (data) => axios.post('http://localhost:5000/contact',data,config)