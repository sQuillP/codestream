import "../css/Home.css";
import { useEffect, useState } from "react";

const availableChars = '!@#$%^&*()<>/{}[]?.,abcdefghijklmnopqrstuvwxyz';

export default function CodeStreak() {


    const [currentChar, setCurrentChar] = useState('|');

    useEffect(()=> {
        const interval = setInterval(()=> {
            const randomChar = Math.floor(Math.random()* availableChars.length);
            // setCurrentChar(availableChars[randomChar]);
        },250);
        return ()=> clearInterval(interval);
    },[]);

    return (
        <span style={{"--i":String(Math.floor(Math.random()*29)+ 2)}}>
            {currentChar}
        </span>
    )
}