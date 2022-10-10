import React, {createContext, useContext, useEffect} from 'react';
import '../../../App.css';
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import PSider from "../sider/sider";
import PHeader from "../header/header";
import PLContent from "../content/content";

function Home() {

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


export default Home;
