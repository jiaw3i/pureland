import qmanageStyles from "./qmanage.less";
import {Button, Divider, Form,Upload, Input, Rate, Select, Space} from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {PlusOutlined} from "@ant-design/icons";
import VEditor from "../editor/editor";
import React, {useState} from "react";
import {useForm} from "antd/es/form/Form";
import {importQuestionFromExcel} from "../../../../actions/interviewqa";

export default function QImport(){

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const [fileForm] = useForm();
    const [file,setFile] = useState();

    const fileUpload=(e:any)=>{
        // e.dragger[0].originFileObj
        importQuestionFromExcel(e.dragger[0].originFileObj).then(res=>{
            console.log(res);
        });
        console.log("finish",e.dragger[0].originFileObj);
    }
    const beforeUpload=(file:any)=>{
        setFile(file);
        return false;
    }
    return (
        <div className={qmanageStyles.qManageContent}>
            <div className={qmanageStyles.qManageContentForm}>
                   <Form
                       form={fileForm}
                    layout={"vertical"}
                    onFinish={fileUpload}
                   >
                       <Form.Item label="上传Excel文件">
                           <Form.Item name="dragger"  valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                               <Upload.Dragger maxCount={1} beforeUpload={beforeUpload} name="files">
                                   <p className="ant-upload-drag-icon">
                                       <InboxOutlined />
                                   </p>
                                   <p className="ant-upload-text">选择文件</p>
                                   <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                               </Upload.Dragger>
                           </Form.Item>
                       </Form.Item>
                       <Form.Item>
                           <Button type="primary" htmlType="submit">
                               提交
                           </Button>
                       </Form.Item>
                   </Form>
            </div>
        </div>
    )

}