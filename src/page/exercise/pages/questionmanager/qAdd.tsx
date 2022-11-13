import qmanageStyles from "./qmanage.less";
import {Button, Divider, Form, Upload, Input, Rate, Select, Space, InputRef} from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {PlusOutlined} from "@ant-design/icons";
import VEditor from "../editor/editor";
import React, {useEffect, useRef} from "react";
import {getAllTag, insertQuestion, insertTag} from "../../../../actions/interviewqa";
import {useForm} from "antd/es/form/Form";

export default function QAdd(){

    const [tags, setTags] = React.useState<Array<{ id: number, tagName: string }>>([]);
    const [tagName, setTagName] = React.useState<string>("");
    const qTypeOptions = [
        "问答题",
        "选择题",
    ];
    const inputRef = useRef<InputRef>(null);
    const editorRef = useRef<{
        clearEditor(): void;
    }>();
    const clearEditor = () => {
        editorRef.current?.clearEditor();
    }
    const [qForm] = useForm();

    const qTagOptions = [
        "Java",
        "Redis",
        "分布式"
    ];
    useEffect(() => {
        getAllTag().then(res => {
            setTags(res.data);
        })
    }, []);

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
        insertTag(tagName).then((res) => {
            if (res.success) {
                getAllTag().then(res => {
                    setTags(res.data);
                })
            }
        })
    }

    /**
     * 标签选择器中的输入框change事件
     * @param e
     */
    const onTagInputChange = (e: any) => {
        console.log(e.target.value);
        setTagName(e.target.value);
    }

    /**
     * 清除表单
     */
    const onReset = () => {
        qForm.resetFields();
        clearEditor();
    };
    const qFormFinish = (values: any) => {
        console.log(values);
        values.tags = values.tags.join(",");
        insertQuestion(values).then(res => {
            if (res.success) {
                // 如果成功 清除表单
                onReset();
            }
        });
    };

    return (
        <div className={qmanageStyles.qManageContent}>
            <div className={qmanageStyles.qManageContentForm}>

                <Form
                    layout={"vertical"}
                    name="qForm"
                    form={qForm}
                    onFinish={qFormFinish}
                >

                    <Form.Item label={"标签"} name={"tags"}>
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
                            {
                                tags.map(tag => {
                                    return (<Select.Option key={tag.id}
                                                           value={tag.tagName}>{tag.tagName}</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item label={"题目类型"} name={"type"}>
                        <Select showSearch
                                placeholder={"选择题目类型"}
                                optionFilterProp="children"
                        >
                            <Select.Option value={"问答题"}>问答题</Select.Option>
                            <Select.Option value={"选择题"}>选择题</Select.Option>
                        </Select>

                    </Form.Item>

                    <Form.Item label={"题目内容"} name={"content"}>
                        <Input.TextArea autoSize={{minRows: 3, maxRows: 3}}>

                        </Input.TextArea>
                    </Form.Item>
                    <Form.Item label={"题目解析"} name={"answer"}>
                        {/*<Input.TextArea autoSize={{minRows: 3, maxRows: 3}}/>*/}
                        <VEditor onRef={editorRef}/>
                    </Form.Item>
                    <Form.Item label={"题目难度"} name={"level"}>
                        <Rate/>
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginRight: "10px"}}>
                            提交
                        </Button>
                        <Button type="primary" danger htmlType="button" onClick={onReset}>
                            重置
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )

}