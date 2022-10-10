import login from "./login.less";
import LoginForm from "./loginform";
import {useState} from "react";
import RegisterForm from "./registerform";
export default function Login() {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const [isLoginForm,setIsLoginForm] = useState(true);
    const form = isLoginForm?<LoginForm/>:<RegisterForm/>;
    return (
        <div className={login.bg}>
            <div className={login.login_card}>
                <div className={login.header}>
                    <p className={login.cardTitle}>Welcome to here.</p>
                </div>
                <div className={login.form}>
                    {<LoginForm/>}
                </div>
            </div>
        </div>
    );


}