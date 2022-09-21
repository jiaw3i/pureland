import {useState} from "react";
import {Header} from "antd/es/layout/layout";
import header from './header.less'
import Search from "antd/es/input/Search";
import {
    MenuOutlined
} from '@ant-design/icons';
import {Button, Popover, Radio, Space} from "antd";
import ButtonGroup from "antd/es/button/button-group";
// import "./header.less"

export default function PHeader() {

    const [bigTitle, setBigTitle] = useState('PureLand Yes！');
    const [desc, setDesc] = useState('come pl,bring beautiful life!');
    const [placeholder, setPlaceholder] = useState('Search DashBoard');
    const [open, setOpen] = useState(false);
    const [radioValue, setRadioValue] = useState("");
    const radioList = ["能力","证书","项目"];
    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const onSearch = function (value: string) {
        console.log(value)
    }
    const radioOnChange = function (value:any) {
        setRadioValue(value.target.value)
        console.log(value)
    }
    const clearRadioSel = function (value:any) {
        setRadioValue("")
    }

    const popOverContent = (
        <Space direction={"vertical"}>
            <Radio.Group options={radioList} onChange={radioOnChange} value={radioValue}/>
            <Button onClick={clearRadioSel}>清空选择</Button>
        </Space>

    )
    const popOver = (
        <Popover
            title="选择搜索类别"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            content={popOverContent}
        >
            <MenuOutlined/>
        </Popover>
    )



    return (
        <div className={header.headerContent}>
            <Header>

                <div className={header.plHeaderText}>
                    <p className={header.plHeaderTitle}>{bigTitle}</p>
                    <p className={header.plHeaderDesc}>{desc}</p>
                </div>
                <div className={header.plHeaderSearch}>
                    <Search placeholder={placeholder} onSearch={onSearch} allowClear enterButton
                            suffix={popOver} addonBefore={radioValue}></Search>
                </div>
            </Header>
        </div>

    )
}