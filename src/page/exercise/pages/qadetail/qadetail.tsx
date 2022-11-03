import styles from "./qadetail.less"
import {useLocation, useParams} from "react-router-dom";
import homeStyles from "../home/home.less";
import {Checkbox, Divider, List, Radio, Rate, Skeleton, Tag} from "antd";
import {Content} from "antd/es/layout/layout";
import React, {createRef, useEffect, useRef, useState} from "react";
import {QuestionType} from "../questionmanager/qmanage";
import VEditor from "../editor/editor";
import MDPreview from "../editor/mdpreview";
import {SelectOutlined} from "@ant-design/icons";

export default function QADetail() {
    const params = useParams();
    const location = useLocation();
    const [question, setQuestion] = useState<QuestionType>({} as QuestionType);

    const editorRef = useRef<{
        setEditorValue(value: string): void;
    }>();

    useEffect(() => {
        setQuestion(location.state[0] as QuestionType);
        editorRef.current?.setEditorValue("");
        console.log(question);
    }, [location.state, question]);

    return (
        <Content className={homeStyles.siteLayoutBackground}
                 style={{
                     margin: '24px 16px',
                     padding: 24,
                     minHeight: 280,
                 }}
        >
            <div className={homeStyles.siteLayoutBackground} style={{width: "100%"}}>

                <div className={styles.questionDetailTitleMain}>
                    <div className={styles.questionDetailTitle}>
                        <Tag color="#2db7f5">{question.type}</Tag>
                        <p>{question.id}. {question.content}</p>

                    </div>

                    <div className={styles.questionDetailLevel}>
                        难度：<Rate disabled value={question.level}/>
                    </div>
                </div>
                <Divider>题目</Divider>
                <div className={styles.questionDetailContentMain}>
                    <div className={styles.questionDetailContentLeft}>
                        <p>在这里写下自己的答案，可以将鼠标移入黄色框内查看参考答案。</p>
                        <div className={styles.questionDetailContentMyAnswer}>
                            <VEditor onRef={editorRef}></VEditor>
                        </div>
                    </div>

                    <div className={styles.questionDetailContentRight}>
                        <p>鼠标移入黄色框内查看答案</p>
                        <div className={styles.questionDetailContentAnswer}>
                            <MDPreview value={question.answer}></MDPreview>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}