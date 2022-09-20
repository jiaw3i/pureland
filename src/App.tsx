import React from 'react';
import './App.css';
import {Layout} from "antd";
import {Content, Header,Footer} from "antd/es/layout/layout";
import PSider from "./page/sider/sider";

function App() {
    return (
        <div className="pl-background">

            <Layout style={{
                minHeight: '80vh',
                // borderRadius: '20px'
            }}>
                <PSider/>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>


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
