import axios from 'axios';


export const JUDGE0_TOKEN_KEY = "judge0-token-key";


//Object of judge0 language codes
export const Judge0_languages = Object.freeze({
    "c": 50,
    "cpp": 54,
    "csharp":51,
    "java":62,
    "javascript":63,
    "python":71,
    //extra langauges can be added here.
})

export const judge0 = axios.create({
    baseURL: 'https://b5y39ec32c.execute-api.us-east-2.amazonaws.com/PROD'
});

