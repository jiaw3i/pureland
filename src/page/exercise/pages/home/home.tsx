import {Breadcrumb, Layout, Menu, MenuProps} from "antd";
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
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";

export default function ExerciseHome() {

    const [collapsed, setCollapsed] = useState(false);
    const [menuKey, setMenuKey] = useState("1");
    const navigate = useNavigate();
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

    const menuMap = new Map<string, string>();
    menuMap.set("1", "qa");
    menuMap.set("4", "manager");

    const menuOnclick = (e: any) => {
        // setMenuKey(e.key);
        navigate(menuMap.get(e.key) as string);
    }

    const breadcrumbNameMap: Record<string, string> = {
        '/exercise': '面试练习首页',
        '/exercise/qa': '问答模式',
        '/exercise/qa/question': '问题详情页',
        '/exercise/manager': '数据管理',
        '/apps/1/detail': 'Detail',
        '/apps/2/detail': 'Detail',
    };
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i: any) => i);
    const extraBreadcrumbItems = pathSnippets.map((_: any, index: number) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

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
                    <Header className={`${styles.siteLayoutBackground} ${styles.exerciseHeader}`} style={{padding: 0}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles.trigger,
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <div>

                            <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
                        </div>
                    </Header>

                    {/*{menuMap.get(menuKey)}*/}
                    <Outlet/>

                </Layout>
            </Layout>
        </div>
    )
}