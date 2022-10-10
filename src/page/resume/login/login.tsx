import login from "./login.less";
import LoginForm from "./loginform";
import React, {createContext, useEffect, useState} from "react";
import RegisterForm from "./registerform";
export default function Login() {
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