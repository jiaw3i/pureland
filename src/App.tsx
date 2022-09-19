import React from 'react';
import './App.css';
import {Link, Outlet} from 'react-router-dom'
import {Layout} from "antd";
// import PSider from "./page/sider/sider";
import {Content, Header,Footer} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

function App() {
    return (
        <Layout>
            {/*<Sider/>*/}
            <Sider>Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
        // <div>
        //     <h1>Bookkeeper</h1>
        //     <nav
        //         style={{
        //             borderBottom: "solid 1px",
        //             paddingBottom: "1rem"
        //         }}
        //     >
        //         <Link to="/invoices">Invoices</Link> |{" "}
        //         <Link to="/expenses">Expenses</Link>
        //         <Link to="/profile">Profile</Link>
        //         <Link to="/psider">PSider</Link>
        //     </nav>
        //     <Outlet/>
        // </div>
    );
}


export default App;
