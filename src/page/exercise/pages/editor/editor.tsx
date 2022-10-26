import Vditor from "vditor";
import "vditor/dist/index.css";
import {useEffect, useState} from "react";


export default function VEditor({ value = {}, onChange= (changedValue: string | undefined)=>{} }){
    const [vd,setVd] = useState<Vditor>();
    const toolbar = [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'edit-mode',
        'content-theme',
        'code-theme',
        'export',
        'fullscreen',
    ];


    const triggerChange = (changedValue: string | undefined) => {
        onChange?.(changedValue);
    };
    useEffect(()=>{
        const vditor = new Vditor("vditor", {
            toolbar,
            input(value: string) {
                console.log(value)
                triggerChange(value)
            },
            after: () => {
                // vditor.setValue("`Vditor` 最小代码示例");
                setVd(vditor);
            }
        });
    },[]);
    return (
        <div id="vditor" className="vditor">

        </div>
    )
}