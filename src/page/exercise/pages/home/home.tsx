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

export default function ExerciseHome() {

    const [collapsed, setCollapsed] = useState(false);

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
        }
    ];


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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menus}/>
                </Sider>

                <Layout className={styles.siteLayout}>
                    <Header className={styles.siteLayoutBackground} style={{padding: 0}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles.trigger,
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <QAContent/>

                </Layout>
            </Layout>
        </div>
    )
}