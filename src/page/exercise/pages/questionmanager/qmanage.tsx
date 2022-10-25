import {Content} from "antd/es/layout/layout";
import qmanageStyles from './qmanage.less';
import homeStyles from '../home/home.less';
import {Button, Divider, Form, Input, InputRef, Radio, Rate, Select, Space} from "antd";
import {Option} from "antd/es/mentions";

import {PlusOutlined} from '@ant-design/icons';
import React, {useRef} from "react";
import {useForm} from "antd/es/form/Form";


export default function QuestionManage() {
    const inputRef = useRef<InputRef>(null);
    const [qForm] = useForm()
    const manageOptions = [
        "题目管理",
        "标签管理",
    ];
    const qTypeOptions = [
        "问答题",
        "选择题",
    ];
    const qTagOptions = [
        "Java",
        "Redis",
        "分布式"
    ];

    /**
     * 标签选择器change事件
     * @param value
     */
    const handleQTagChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    /**
     * 增加标签按钮点击事件
     */
    const addTag = () => {
        console.log("add tag");
    }
    /**
     * 标签选择器中的输入框change事件
     * @param e
     */
    const onTagInputChange = (e: any) => {
        console.log(e.target.value);
    }


    /**
     * 清除表单
     */
    const onReset = () => {
        qForm.resetFields();
    };
    return (
        <Content className={homeStyles.siteLayoutBackground}
                 style={{
                     margin: '24px 16px',
                     padding: 24,
                     minHeight: 280,
                 }}>
            <div className={homeStyles.siteLayoutBackground} style={{width: '100%'}}>

                <div className={qmanageStyles.qManageFilter}>
                    <div className={qmanageStyles.qManageFilterType}>
                        <Radio.Group options={manageOptions} optionType="button"
                                     buttonStyle="solid"/>
                    </div>
                </div>

                <Divider>录入题目</Divider>

                <div className={qmanageStyles.qManageContent}>
                    <div className={qmanageStyles.qManageContentForm}>

                        <Form
                            layout={"vertical"}
                            name="qForm"
                            form={qForm}
                        >

                            <Form.Item label={"标签"}>
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="选择标签"
                                    onChange={handleQTagChange}
                                    dropdownRender={menu => (
                                        <>
                                            {menu}
                                            <Divider style={{margin: '8px 0'}}/>
                                            <Space style={{padding: '0 8px 4px'}}>
                                                <Input
                                                    placeholder="标签名称"
                                                    ref={inputRef}
                                                    onChange={onTagInputChange}
                                                />
                                                <Button type="text" icon={<PlusOutlined/>} onClick={addTag}>
                                                    增加标签
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                >
                                    <Option value={"Java"}>Java</Option>
                                    <Option value={"微服务"}>微服务</Option>
                                    <Option value={"Redis"}>Redis</Option>
                                    <Option value={"高并发"}>高并发</Option>
                                </Select>
                            </Form.Item>


                            <Form.Item label={"题目类型"}>
                                <Select showSearch
                                        placeholder={"选择题目类型"}
                                        optionFilterProp="children"
                                >
                                    <Option value={"问答题"}>问答题</Option>
                                    <Option value={"选择题"}>选择题</Option>
                                </Select>

                            </Form.Item>

                            <Form.Item label={"题目内容"}>
                                <Input.TextArea autoSize={{minRows: 3, maxRows: 3}}>

                                </Input.TextArea>
                            </Form.Item>
                            <Form.Item label={"题目解析"}>
                                <Input.TextArea autoSize={{minRows: 3, maxRows: 3}}/>
                            </Form.Item>
                            <Form.Item label={"题目难度"}>
                                <Rate/>
                            </Form.Item>


                            <Form.Item >
                                <Button type="primary" htmlType="submit" style={{marginRight:"10px"}}>
                                    提交
                                </Button>
                                <Button type="primary" danger htmlType="button" onClick={onReset}>
                                    重置
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div>
        </Content>
    );
}