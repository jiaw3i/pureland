import {Layout, Menu, MenuProps} from "antd";
import Sider from "antd/es/layout/Sider";
import styles from './home.less';
import {
    QuestionOutlined,
    SmileOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import React, {useState} from "react";
import {Content, Header} from "antd/es/layout/layout";
import QAContent from "../qacontent/qacontent";
import QuestionManage from "../questionmanager/qmanage";

export default function ExerciseHome() {

    const [collapsed, setCollapsed] = useState(false);
    const [menuKey, setMenuKey] = useState("1");

    const menus: MenuProps['items'] = [
        {
            key: "1",
            label: "问答模式",
            icon: <QuestionOutlined/>,
        },
        {
            key: "2",
            label: "背题模式",
            icon: <SmileOutlined/>,
        },
        {
            key: "3",
            label: "面试经验",
            icon: <SmileOutlined/>,
        },
        {
            key: "4",
            label: "数据录入",
            icon: <SmileOutlined/>,
        }
    ];

    const menuMap = new Map<string, React.ReactNode>();
    menuMap.set("1", <QAContent/>);
    menuMap.set("4", <QuestionManage/>);

    const menuOnclick = (e: any) => {
        setMenuKey(e.key);
    }

    return (
        <div className={styles.exerciseMain}>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    trigger={null}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Menu onClick={menuOnclick} theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menus}/>
                </Sider>

                <Layout className={styles.siteLayout}>
                    <Header className={styles.siteLayoutBackground} style={{padding: 0}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles.trigger,
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    {menuMap.get(menuKey)}

                </Layout>
            </Layout>
        </div>
    )
}