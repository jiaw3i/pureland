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
    const [fontSize, setFontSize] = useState(0);

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

    const calculateMaxFontSize = (width:number,height:number) => {
        let titleLength = title.length;

        let maxFontSize = width / titleLength;
        return maxFontSize > height ? height : maxFontSize;

    }

    const nextStyle = () => {
        // 生成随机的渐变色
        // 1-14256之间的随机数
        let random = Math.floor(Math.random() * 14256 + 1) + "";
        // 生成随机字体大小
        let randomFontSize = Math.floor(Math.random() * calculateMaxFontSize(512,200) + 1) + "";
        setFontSize(parseInt(randomFontSize));
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
                <div style={{
                    background: gradientStyle,
                    fontSize: fontSize,
                }} className={styles.titleConversionOutputPreview}>
                    <div className={styles.titleConversionOutputTitle}>
                        <svg  width={512} height={200}>
                            <path id={"path1"}
                                  fill={"none"}
                                  d="m79.5,79.8c2.29221,0 2.62296,2.11198 4.58442,6.78261c2.77392,6.60527 7.18585,15.63238 11.46104,22.6087c14.85706,24.24401 25.10016,38.52577 34.38312,49.73913c11.32295,13.67756 28.65814,30.15889 32.09091,33.91304c20.01631,21.89037 33.79263,24.05324 55.01299,31.65217c15.68572,5.61702 41.28779,8.04327 59.5974,9.04348c20.72507,1.13216 59.5974,2.26087 84.81169,2.26087c25.21428,0 61.88961,-2.26087 68.76623,-4.52174l2.29221,0"
                                  stroke={"#000000"}
                            />
                            <text>
                                <textPath href={"#path1"}>
                                    {title}
                                </textPath>
                            </text>
                        </svg>
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