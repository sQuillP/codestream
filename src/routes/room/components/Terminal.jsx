import "../css/Terminal.css";
import { memo } from "react";


function Terminal({
    textContent
}) {

    console.log('reloading terminal');
    const formattedContent = textContent.split("\n");
    // const formattedContent = new Array(50).fill('test')


    return (
        <div className="terminal-container">
            <div className="terminal-rendered-content">
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
        </div>
    )
}

export default memo(Terminal);