import {Content} from "antd/es/layout/layout";
import qmanageStyles from './qmanage.less';
import homeStyles from '../home/home.less';
import {Button, Divider, Form, Input, InputRef, Radio, Rate, Select, Space} from "antd";
import {Option} from "antd/es/mentions";

import {PlusOutlined} from '@ant-design/icons';
import React, {createRef, useEffect, useRef} from "react";
import {useForm} from "antd/es/form/Form";
import {getAllTag, insertQuestion, insertTag} from "../../../../actions/interviewqa";
import VEditor from "../editor/editor";
import QImport from "./qImport";
import QAdd from "./qAdd";

export type QuestionType = {
    id: number,
    type: string,
    content: string,
    level: number,
    tags: string,
    answer: string,
    updateTime: string,
}

export default function QuestionManage() {


    const manageOptions: Array<{
        index: number,
        label: string,
        element: JSX.Element
    }> = [{
        index: 0,
        label: "题目管理",
        element: <QAdd></QAdd>
    }, {
        index: 1,
        label: "题目导入",
        element: <QImport></QImport>
    }
    ];

    const [type, setType] = React.useState<string>("题目添加");

    const typeMap = new Map<string, JSX.Element>;
    typeMap.set("题目添加", <QAdd></QAdd>);
    typeMap.set("题目导入", <QImport></QImport>);


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
                        <Radio.Group onChange={(e) => {
                            setType(e.target.value);
                        }} defaultValue={Array.from(typeMap.keys())[0]} options={Array.from(typeMap.keys())}
                                     optionType="button"
                                     buttonStyle="solid"/>
                    </div>
                </div>

                <Divider></Divider>

                {typeMap.get(type)}
            </div>
        </Content>
    );
}