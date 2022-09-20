import Sider from "antd/es/layout/Sider";
import sider from "./sider.less"
import "./sider.less"
import {Menu} from "antd";
import {useState} from "react";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
// const { Header, Content, Footer, Sider } = Layout;


function getItem(label: string, key: string, icon?: JSX.Element, children?: any) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('个人主页', '1', <PieChartOutlined />),
    getItem('详细信息', '2', <DesktopOutlined/>),
    // getItem('User', 'sub1', <UserOutlined/>, [
    //     getItem('Tom', '3'),
    //     getItem('Bill', '4'),
    //     getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined/>),
];

export default function PSider(){
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider className={sider.content} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className={sider.logo} />
            <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    )
}