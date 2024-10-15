import { useEffect, useState } from "react";


export default function CodeStreak() {

    const availableChars = ['!@#$%^&*()<>/{}[]?.,abcdefghijklmnopqrstuvwxyz'];

    const [currentChar, setCurrentChar] = useState('#');

    useEffect(()=> {
        const interval = setInterval(()=> {
            const randomChar = Math.floor(Math.random()* availableChars.length);
            console.log(randomChar);
            console.log(availableChars[randomChar])
            setCurrentChar(availableChars[randomChar]);
        },250);
        return ()=> clearInterval(interval);
    },[]);

    return (
        <span color="white" style={{"--i":String(Math.floor(Math.random()*29)+ 2)}}>
            {currentChar}
        </span>
    )
}