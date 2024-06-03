import {useEffect, useState} from "react";
import Cursor from "./Cursor";


function TypingBox({message}) {
    const [content, setContent] = useState("");
    const [index, setIndex] = useState(0);
    const [cursor, setCursor] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            if (index < message.length) {
                setContent(content + message.charAt(index));
                setIndex(index + 1);
            } else {
                setCursor(false);
            }
        }, 50)
    }, [index]);

    return (
        <div className="bg-blue-400 w-1/3 mx-auto my-5 rounded text-justify text-white p-2">
            <p>{content}{cursor && <Cursor className={"inline"} />}</p>
        </div>
    );
}

export default TypingBox;