import qmanageStyles from "./qmanage.less";
import {Button, Divider, Form,Upload, Input, Rate, Select, Space} from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {PlusOutlined} from "@ant-design/icons";
import VEditor from "../editor/editor";
import React from "react";

export default function QImport(){

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className={qmanageStyles.qManageContent}>
            <div className={qmanageStyles.qManageContentForm}>
                   <Form
                    layout={"vertical"}
                   >
                       <Form.Item label="Dragger">
                           <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                               <Upload.Dragger name="files" action="/upload.do">
                                   <p className="ant-upload-drag-icon">
                                       <InboxOutlined />
                                   </p>
                                   <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                   <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                               </Upload.Dragger>
                           </Form.Item>
                       </Form.Item>
                   </Form>
            </div>
        </div>
    )

}