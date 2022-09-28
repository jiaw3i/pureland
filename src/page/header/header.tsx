import {useState} from "react";
import {Header} from "antd/es/layout/layout";
import header from './header.less'
import Search from "antd/es/input/Search";
import {
    MenuOutlined,
    ZoomInOutlined
} from '@ant-design/icons';
import {Avatar, Button, Popover, Radio, Space,Image} from "antd";

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
        setPlaceholder(value.target.value)
        console.log(value)
    }
    const clearRadioSel = function (value:any) {
        setPlaceholder("")
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

    const avatarImg = <Image src="https://joeschmoe.io/api/v1/random" />


    return (
        <div className={header.headerContent}>
            <Header>

                <div className={header.plHeaderText}>
                    <p className={header.plHeaderTitle}>{bigTitle}</p>
                    <p className={header.plHeaderDesc}>{desc}</p>
                </div>
                <div className={header.plHeaderSearch}>
                    <Search placeholder={placeholder} onSearch={onSearch} allowClear enterButton
                            suffix={popOver}></Search>
                </div>

                <div className={header.plHeaderProfile}>
                    <Avatar src={avatarImg} shape={"square"} size={"large"} icon={<ZoomInOutlined />}></Avatar>
                </div>
            </Header>
        </div>

    )
}