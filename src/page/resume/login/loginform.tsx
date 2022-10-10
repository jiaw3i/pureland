import {Button, Checkbox, Col, Form, Input, notification, Row} from "antd";
import React, {useContext} from "react";
import {getUserInfo, login} from "../../../actions/resume";
import {NotificationPlacement} from "antd/es/notification";
import {useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../App";

export default function LoginForm(props: { changeForm: Function }) {
    const {isLogin,setIsLogin,setUserInfo} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const openNotification = (placement: NotificationPlacement, message: string) => {
        notification.config({duration: 1.5});
        notification.error({
            message: message,
            placement,
        });
    };
    const onFinish = (values: { username: string, password: string }) => {
        login(values.username, values.password).then((res) => {
            if (res.success) {
                localStorage.setItem("AuthToken", res.data);
                setIsLogin(true);
                getUserInfo().then((res) => {
                    setUserInfo(res.data);
                    navigate(from, { replace: true });
                })
            } else {
                openNotification('top', res.message);
            }
        });
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'input username'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Input allowClear placeholder="username" bordered={false}/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{required: true, message: '请设置密码!'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Input
                    bordered={false}
                    type="password"
                    placeholder="password"
                />
            </Form.Item>


            <Form.Item>
                没有帐号，<a onClick={() => props.changeForm()}>点击注册</a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block style={{height: '56PX', borderRadius: '12PX'}}>
                    登录
                </Button>
            </Form.Item>
            <Form.Item valuePropName="checked" style={{textAlign: 'left'}}>
                <p style={{color: '#CCCCCC'}}>注册和登录即代表已阅读并同意《<a>用户服务协议</a>》</p>
            </Form.Item>
        </Form>
    );
}