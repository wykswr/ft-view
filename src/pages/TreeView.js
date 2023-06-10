import parseSirius from "../utils/ftReader";
import TreeChart from "../components/TreeChart";
import {useRef, useState} from "react";
import {FolderOpenIcon} from "@heroicons/react/24/outline";
import {XMarkIcon} from "@heroicons/react/24/outline";

function TreeView() {
    const [jsonData, setJsonData] = useState(null);
    const tree = parseSirius(jsonData);
    const fileInput = useRef(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const contents = e.target.result;
            const parsedJson = JSON.parse(contents);
            setJsonData(parsedJson);
        };

        reader.readAsText(file);
    }

    function handleClear() {
        setJsonData(null);
        fileInput.current.value = "";
    }

    function handleUpload() {
        fileInput.current.click();
    }


    return (
        <div className="container mx-auto mt-8 ">
            <h1 className={"font-semibold font-sans text-xl mb-8"}>Sirius Fragmentation Visualization</h1>
            <div className={"flex flex-row-reverse"}>
                <div className={"flex flex-col gap-2"}>
                <input type="file" ref={fileInput} onChange={handleFileChange}
                       className="hidden"/>
                <button type="button" onClick={handleUpload}>
                    <FolderOpenIcon className={"h-8 w-8 hover:text-green-400"}/>
                </button>
                {tree &&
                    <button onClick={handleClear}>
                        <XMarkIcon className={"h-8 w-8 hover:text-red-500"}/>
                    </button>}
            </div>
            </div>

            {tree && <div className={"m-8"}><TreeChart data={tree}/></div>}

        </div>
    )
}

export default TreeView