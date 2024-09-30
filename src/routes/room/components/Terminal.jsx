import "../css/Terminal.css";
import { memo } from "react";


export default memo(function Terminal({
    textContent
}) {

    console.log('reloading terminal');
    return (
        <div className="terminal-container">
            <p className="courier text">{textContent}</p>
        </div>
    )
});