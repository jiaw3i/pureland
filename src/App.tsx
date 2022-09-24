import React from 'react';
import './App.css';
import {Layout} from "antd";
import {Content,Footer} from "antd/es/layout/layout";
import PSider from "./page/sider/sider";
import PHeader from "./page/header/header";
import PLContent from "./page/content/content";

function App() {
    return (
        <div className="pl-background">
            <Layout style={{
                minHeight: '80vh',
            }}>
                <PSider/>
                <Layout>
                    <PHeader/>
                    <PLContent/>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
}


export default App;
