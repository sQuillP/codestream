import axios from 'axios';


export const JUDGE0_TOKEN_KEY = "judge0-token-key";


//Object of judge0 language codes
export const Judge0_languages = Object.freeze({
    "c": 50,
    "cpp": 54,
    "cs":51,
    "java":62,
    "javascript":63,
    "python":71,
    //extra langauges can be added here.
})

export const judge0 = axios.create({
    // baseURL:'https://ce.judge0.com'
    baseURL: 'https://b5y39ec32c.execute-api.us-east-2.amazonaws.com/PROD'
    // baseURL:'http://localhost:2358'
});


// judge0.interceptors.request.use((config)=> {
//     const judge0Token = localStorage.getItem(JUDGE0_TOKEN_KEY);
//     if(judge0Token === null){
//         Promise.reject("Judge0 token missing");
//     }

//     config.headers['Authorization'] =  `Bearer ${judge0Token}`;
//     return config;
// });



// export async function submitCode(sourceCode, languageId) {
//     try {
//         const response = await judge0.post('/submissions',{
//             "source_code":sourceCode,
//             "language_id":languageId
//         });

        

//     } catch(error) {
//         console.log("unable to submit code");
//         return false;
//     }
// }