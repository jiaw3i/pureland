import Sider from "antd/es/layout/Sider";
import sider from "./sider.less"
// import "./sider.less"
import {Menu} from "antd";
import {ReactInstance, useContext, useState} from "react";
import {
    DesktopOutlined,
    PieChartOutlined,
    FormOutlined,
} from '@ant-design/icons';
import {redirect} from "react-router-dom";
import Manage from "../manage/manage";
import {ContentContext} from "../home/home";
import PLContent from "../content/content";
import PlManage from "../manage/manage";

// const { Header, Content, Footer, Sider } = Layout;

function getItem(label: string, key: string, icon?: JSX.Element, children?: any) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const menuItemMap = new Map<string,JSX.Element>([
    ["1", <PLContent/>],
    ["2", <PLContent/>],
    ["3", <PlManage/>]
]);


const items = [
    getItem('个人主页', "1", <PieChartOutlined/>),
    getItem('详细信息', "2", <DesktopOutlined/>),
    getItem('信息管理', "3", <FormOutlined/>),

    // getItem('User', 'sub1', <UserOutlined/>, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined/>),
];


export default function PSider() {
    const {content, setContent} = useContext(ContentContext);
    const menuOnClick = (e: {
        key: string;
        keyPath: string[];
        item: ReactInstance;
    }) => {
        console.log(menuItemMap.get(e.key));
        menuItemMap.get(e.key) && setContent(menuItemMap.get(e.key) as JSX.Element);
    }
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider className={sider.content} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className={sider.logo}/>
            <Menu defaultSelectedKeys={['home']} onClick={menuOnClick} mode="inline" items={items}/>
        </Sider>
    )
}