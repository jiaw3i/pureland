import {Button, Checkbox, Col, Form, Input, Row} from "antd";

export default function LoginForm() {
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
                name="password"
                rules={[{required: true, message: '请设置密码!'}]}
                style={{borderBottom: '1px solid #DCDCDC'}}
            >
                <Input
                    bordered={false}
                    type="password"
                    placeholder="请设置密码"
                />
            </Form.Item>


            <Form.Item>
                没有帐号，<a href="#">点击注册</a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block style={{height: '56PX', borderRadius: '12PX'}}>
                    去注册
                </Button>
            </Form.Item>
            <Form.Item name="" valuePropName="checked" style={{textAlign: 'left'}}>
                <Checkbox style={{color: '#CCCCCC'}}>我已阅读并同意《<a>用户服务协议</a>》</Checkbox>
            </Form.Item>
        </Form>
    )
}