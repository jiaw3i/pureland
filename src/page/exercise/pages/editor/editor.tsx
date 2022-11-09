import Vditor from "vditor";
import styles from "./editor.less";
import "vditor/dist/index.css";
import {Ref, useEffect, useImperativeHandle, useState} from "react";


export default function VEditor({
                                    onRef = null as Ref<any>,
                                    value = {},
                                    onChange = (changedValue: string | undefined) => {
                                    }
                                }) {
    const [vd, setVd] = useState<Vditor>();
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


    useImperativeHandle(onRef, () => {
        return {
            clearEditor: clearEditor,
            setEditorValue: setEditorValue,
        }
    })

    const setEditorValue = (value: string) => {
        vd?.setValue(value);
    };

    const clearEditor = () => {
        vd?.setValue("");
    };

    const triggerChange = (changedValue: string | undefined) => {
        onChange?.(changedValue);
    };
    useEffect(() => {
        const vditor = new Vditor("vditor", {
            toolbar,
            height:"100%",
            input(value: string) {
                triggerChange(value)
            },
            after: () => {
                // vditor.setValue("`Vditor` 最小代码示例");
                setVd(vditor);
            }
        });
    }, []);
    return (
        <div id="vditor" className={`${styles.editor}`}>

        </div>
    )
}