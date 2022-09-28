import React, {createContext, useContext, useEffect} from 'react';
import './App.css';
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import PSider from "./page/sider/sider";
import PHeader from "./page/header/header";
import PLContent from "./page/content/content";
import {getUserInfo} from "./actions/resume";
import {UserInfo} from "./utils/types";

export const AppContext = createContext<{
    userInfo: UserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}>({} as any);

function App() {
    const [userInfo, setUserInfo] = React.useState<UserInfo>({} as UserInfo);
    useEffect(() => {
        getUserInfo().then((res) => {
            setUserInfo(res.data);
        })
    },[]);

    return (
        <AppContext.Provider value={{userInfo,setUserInfo}}>

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
        </AppContext.Provider>
    );
}


export default App;
