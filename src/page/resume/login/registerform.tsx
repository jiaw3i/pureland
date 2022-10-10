import {Button, Checkbox, Col, Form, Input, Row} from "antd";

export default function RegisterForm(props:  { changeForm: Function }) {

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
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
                rules={[{required: true, message: '请输入手机号!'},{pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Input allowClear placeholder="phone" bordered={false}/>
            </Form.Item>
            <Form.Item
                name="captcha"
                rules={[{required: true, message: '请输入验证码!'},{len: 6, message: '验证码长度为6位'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Row>
                    <Col span={18}>
                        <Input allowClear
                            bordered={false}
                            type="password"
                            placeholder="code"
                        />
                    </Col>
                    <Col span={6} style={{float: 'right'}}>
                        <Button type="link" style={{color: '#151830', fontWeight: 'bold'}}>发送验证码</Button>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: '请设置密码!'},{min: 6, message: '密码长度不能小于6位'}]}
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
                rules={[{required: true, message: '请重复密码!'},{min: 6, message: '密码长度不能小于6位'}]}
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
                已有帐号，<a onClick={()=>{props.changeForm()}}>点击登录</a>
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