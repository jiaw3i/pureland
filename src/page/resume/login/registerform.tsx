import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {useForm} from "antd/es/form/Form";
import {register, smsCode, verifySmsCode} from "../../../actions/resume";
import {openNotification} from "../../../utils/util";
import {useState} from "react";
import login from "./login.less"
import Countdown from "antd/es/statistic/Countdown";

export default function RegisterForm(props: { changeForm: Function }) {

    const [registerForm] = Form.useForm()
    const [codeBtnDisabled, setCodeBtnDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const sendCode = () => {
        smsCode(registerForm.getFieldValue('phone')).then((res) => {
            if (res.success) {
                openNotification('top', '验证码已发送');
                setCountdown(Date.now() + 60000); // 60s
                setCodeBtnDisabled(true);
                console.log(codeBtnDisabled);
                setTimeout(() => {
                    setCodeBtnDisabled(false);
                }, 60000)
            } else {
                openNotification('top', res.message);
            }
        });
    }
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        if (values.password !== values.rePassword) {
            openNotification('top', '两次密码不一致');
            return;
        }
        verifySmsCode(values.phone, values.code).then((res) => {
            if (res.success) {
                register(values.username, values.password, values.phone).then((res) => {
                    if (res.data) {
                        openNotification('top', '注册成功');
                        props.changeForm('login');
                    } else {
                        openNotification('top', res.message);
                    }
                })
            } else {
                openNotification('top', "验证码校验失败");
            }
        });

    };
    return (
        <Form
            name="resiterForm"
            form={registerForm}
            className={login.registerForm}
            onFinish={onFinish}
            initialValues={{remember: true}}
            validateTrigger={'onBlur'}
            // onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'input username'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Input allowClear placeholder="username" bordered={false}/>
            </Form.Item>
            <Form.Item
                name="phone"
                rules={[{required: true, message: '请输入手机号!'}, {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '请输入正确的手机号'
                }]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Input allowClear placeholder="phone" bordered={false}/>
            </Form.Item>
            <Form.Item
                name="captcha"
                rules={[{required: true, message: '请输入验证码!'}, {len: 6, message: '验证码长度为6位'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Row>
                    <Col span={18}>
                        <Input allowClear
                               bordered={false}
                               placeholder="code"
                        />
                    </Col>
                    <Col span={6}>
                        {/*<div className={login.codeBtnG}>*/}
                        {
                            codeBtnDisabled && <Countdown value={countdown} format="(mm:ss)"
                                                          onFinish={() => setCodeBtnDisabled(false)}/>
                        }
                        <Button disabled={codeBtnDisabled} type="link" onClick={() => sendCode()}
                                style={{fontWeight: 'bold'}}>
                            发送验证码
                        </Button>
                        {/*</div>*/}


                    </Col>
                </Row>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: '请设置密码!'}, {min: 6, message: '密码长度不能小于6位'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Input.Password
                    bordered={false}
                    allowClear
                    type="password"
                    placeholder="password"
                />
            </Form.Item>
            <Form.Item
                name="rePassword"
                rules={[{required: true, message: '请重复密码!'}, {min: 6, message: '密码长度不能小于6位'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Input.Password
                    bordered={false}
                    allowClear
                    type="password"
                    placeholder="reentry password"
                />
            </Form.Item>

            <Form.Item>
                已有帐号，<a onClick={() => {
                props.changeForm()
            }}>点击登录</a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block style={{height: '56PX', borderRadius: '12PX'}}>
                    注册
                </Button>
            </Form.Item>
            <Form.Item name="" valuePropName="checked" style={{textAlign: 'left'}}>
                <Checkbox style={{color: '#CCCCCC'}}>我已阅读并同意《<a>用户服务协议</a>》</Checkbox>
            </Form.Item>
        </Form>
    );
}