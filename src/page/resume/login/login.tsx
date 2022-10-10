import login from "./login.less";
import LoginForm from "./loginform";
import React, {createContext, useState} from "react";
import RegisterForm from "./registerform";
import {UserInfo} from "../../../utils/types";
export const LoginContext = createContext<{
    isLoginForm: boolean,
    setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}>({} as any);
export default function Login() {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const [isLoginForm,setIsLoginForm] = useState(true);

    const changeForm = () => {
        setIsLoginForm(!isLoginForm);
    }
    const currentForm = isLoginForm?<LoginForm changeForm={changeForm}/>:<RegisterForm changeForm={changeForm}/>;
    return (
        <div className={login.bg}>
            <div className={login.login_card}>
                <div className={login.header}>
                    <p className={login.cardTitle}>Welcome to here.</p>
                </div>
                <div className={login.form}>
                    {currentForm}
                </div>
            </div>
        </div>
    );


}