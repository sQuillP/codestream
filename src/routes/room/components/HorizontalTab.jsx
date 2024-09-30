import "../css/HorizontalTab.css";



export default function HorizontalTab({
    title,
    onClick,
    active
}) {




    return (
        <button
            onClick={onClick}
            className="hz-tab"
            style={{
                borderBottom: active ? '2px solid lightblue' : 'var(--bg-4)',
                color: active ? "white":"lightgray",
                background:'var(--bg-1)'
            }}
        >
            {title}
        </button>
    )
}