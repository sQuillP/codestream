import axios from 'axios';


export const JUDGE0_TOKEN_KEY = "judge0-token-key";

//
const judge0 = axios.create({
    baseURL:'https://ce.judge0.com'
});



async function getAuthToken() {
    
}


judge0.interceptors.request.use((config)=> {
    const judge0Token = localStorage.getItem(JUDGE0_TOKEN_KEY);
    if(judge0Token === null){
        Promise.reject("Judge0 token missing");
    }

    config.headers['Authorization'] =  `Bearer ${judge0Token}`;
    return config;
})