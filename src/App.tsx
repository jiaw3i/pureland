import React from 'react';
import './App.css';
import {Layout} from "antd";
import {Content,Footer} from "antd/es/layout/layout";
import PSider from "./page/sider/sider";
import PHeader from "./page/header/header";

function App() {
    return (
        <div className="pl-background">
            <Layout style={{
                minHeight: '80vh',
            }}>
                <PSider/>
                <Layout>
                    <PHeader/>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
}


export default App;
