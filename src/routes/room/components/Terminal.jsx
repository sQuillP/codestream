import "../css/Terminal.css";
import { memo } from "react";


function Terminal({
    textContent
}) {

    console.log('reloading terminal');
    const formattedContent = textContent.split("\n");

    return (
        <div className="terminal-container">
            {
                formattedContent.map((content, i) => {
                    return (
                        <p key={`${content},${i}`} className="courier text">
                            {content}
                        </p>
                    )
                })
            }
        </div>
    )
}

export default memo(Terminal);