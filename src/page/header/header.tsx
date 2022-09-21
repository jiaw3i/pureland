import {Header} from "antd/es/layout/layout";
import header from './header.less'
import "./header.less"
import {useState} from "react";

export default function PHeader() {

    const [bigTitle, setBigTitle] = useState('PureLand Yes！');
    const [desc, setDesc] = useState('come pl,bring beautiful life!');


    return (
        <div className={header.headerContent}>
            {/*<div className={header.plHeader}>*/}
                <div className={header.plHeaderText}>
                    <span className={header.plHeaderTitle}>{bigTitle}</span>
                    <br/>
                    <span className={header.plHeaderDesc}>{desc}</span>
                </div>
                <div className="right">

                </div>
            {/*</div>*/}
        </div>

    )
}