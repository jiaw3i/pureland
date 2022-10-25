import React, {createContext, useContext, useEffect} from 'react';
import './App.css';
import {getUserInfo} from "./actions/resume";
import {UserInfo} from "./utils/types";
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "./page/resume/home/home";
import Login from "./page/resume/login/login";
import TitleConversion from "./page/text2cover/pages/text2cover/text2cover";
import ExerciseHome from "./page/exercise/pages/home/home";
import QuestionManage from "./page/exercise/pages/questionmanager/qmanage";

export const AuthContext = createContext<{
    userInfo: UserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>,
    isLogin: boolean,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
}>({} as any);

function useAuth() {
    return React.useContext(AuthContext);
}

function RequireAuth({children}: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.isLogin) {
        // 重定向至login页面，但是保存用户试图访问的location，这样我们可以把登陆后的用户重定向至那个页面
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return children;
}

function App() {
    const [userInfo, setUserInfo] = React.useState<UserInfo>({} as UserInfo);
    const [isLogin, setIsLogin] = React.useState<boolean>(true);

    useEffect(() => {
        if (localStorage.getItem("AuthToken") === null) {
            setIsLogin(false);
            // !isLogin && navigate("/login");
        } else {
            getUserInfo().then((res) => {
                setUserInfo(res.data);
            })
        }
    }, []);

    return (
        <AuthContext.Provider value={{userInfo, setUserInfo, isLogin, setIsLogin}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <RequireAuth>
                            <Home/>
                        </RequireAuth>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/tc" element={<TitleConversion/>}/>
                    <Route path="/exercise" element={<ExerciseHome/>}/>
                    <Route path="/qmanage" element={<QuestionManage/>}/>
                </Routes>
            </BrowserRouter>,
        </AuthContext.Provider>
    );
}


export default App;
