import React, {createContext, useContext, useEffect} from 'react';
import '../../../App.css';
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import PSider from "../sider/sider";
import PHeader from "../header/header";
import PLContent from "../content/content";

export const ContentContext = createContext<{
    content: JSX.Element,
    setContent: React.Dispatch<React.SetStateAction<JSX.Element>>,
}>({} as any);

function Home() {
    const [content, setContent] = React.useState<JSX.Element>(<PLContent/>);
    return (
        <ContentContext.Provider value={{content, setContent}}>
            <div className="pl-background">
                <Layout style={{
                    minHeight: '80vh',
                }}>
                    <PSider/>
                    <Layout>
                        <PHeader/>
                        {content}
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        </ContentContext.Provider>
    );
}


export default Home;
