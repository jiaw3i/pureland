import {useState} from "react";
import styles from './text2cover.less';
import './text2cover.less';
import {Button, Input, Image} from "antd";
import TextArea from "antd/es/input/TextArea";
import {randomGradientColors} from "../../../../actions/ExternalApi";

export default function TitleConversion() {

    // 状态 是否在转换中
    const [inConversion, setInConversion] = useState(false);
    // 状态 是否转换成功
    const [conversionSuccess, setConversionSuccess] = useState(false);
    // title
    const [title, setTitle] = useState("");

    const [gradientStyle, setGradientStyle] = useState("");

    /**
     * 给title复制
     * @param e
     */
    const textAreaOnChange = (e: any) => {
        setTitle(e.target.value);
    }
    const conversionOnClick = () => {
        randomGradientColors("14256").then((res) => {
            console.log("random", res[0].gradient.split(":")[1]);
            setGradientStyle(res[0].gradient.split(":")[1]);
        });
        console.log("conversionOnClick", title);
        setInConversion(true);
        setTimeout(() => {
            setInConversion(false);
            setConversionSuccess(true);
        }, 1000);
    }

    const nextStyle = () => {
        // 生成随机的渐变色
        // 1-14256之间的随机数
        let random = Math.floor(Math.random() * 14256 + 1) + "";
        randomGradientColors(random).then((res) => {
            console.log("random", res[0].gradient.split(":")[1].replace(";", ""));
            setGradientStyle(res[0].gradient.split(":")[1].replace(";", ""));
        });
    }

    return (
        <div className={styles.titleConversionMain}>
            <div className={styles.titleConversionInput}>
                <TextArea onChange={textAreaOnChange} autoSize={{minRows: 4, maxRows: 4}} placeholder={"输入标题"}
                          style={{width: "50%"}}/>
                <Button onClick={conversionOnClick} size={"large"} type={"primary"}>转换</Button>
            </div>
            <div className={styles.titleConversionOutput}>
                <div style={{background: gradientStyle}} className={styles.titleConversionOutputPreview}>
                    <div className={styles.titleConversionOutputTitle}>
                        {title}
                    </div>

                </div>
                <div className={styles.titleConversionOutputAction}>
                    <Button size={"large"} type={"primary"}>下载</Button>
                    <Button size={"large"} type={"primary"} onClick={nextStyle}>换一个</Button>
                </div>
            </div>
        </div>
    )
}