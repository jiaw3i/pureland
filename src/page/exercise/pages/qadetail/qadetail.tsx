import styles from "./qadetail.less"
import {useLocation, useParams} from "react-router-dom";
import homeStyles from "../home/home.less";
import {Button, Checkbox, Divider, List, Radio, Rate, Skeleton, Tag} from "antd";
import {Content} from "antd/es/layout/layout";
import React, {createRef, useEffect, useRef, useState} from "react";
import {QuestionType} from "../questionmanager/qmanage";
import VEditor from "../editor/editor";
import MDPreview from "../editor/mdpreview";
import {SelectOutlined} from "@ant-design/icons";
import {updateQuestion} from "../../../../actions/interviewqa";
import {openSuccess} from "../../../../utils/util";

export default function QADetail() {
    const params = useParams();
    const location = useLocation();
    const [question, setQuestion] = useState<QuestionType>({} as QuestionType);
    const [myAnswer, setMyAnswer] = useState<string>("");

    const editorRef = useRef<{
        setEditorValue(value: string): void;
    }>();

    useEffect(() => {
        setQuestion(location.state[0] as QuestionType);
        editorRef.current?.setEditorValue("");
        console.log(question);
    }, [location.state, question]);

    const myAnswerOnChange = (value: string | undefined) => {
        setMyAnswer(value ? value : "");
    };

    const saveMyAnswer = () => {
        console.log(myAnswer);
        let updatedQuestion:QuestionType = {} as any;
        updatedQuestion.id = question.id;
        updatedQuestion.answer = myAnswer;

        updateQuestion(updatedQuestion).then(res => {
           if (res.success){
               openSuccess("top","保存成功😊");
           }
        });
    }
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
                        <div className={styles.questionDetailContentMyAnswer}>
                            <VEditor onRef={editorRef} onChange={myAnswerOnChange}></VEditor>
                            <p>在这里写下自己的答案，可以将鼠标移入右方黄色框内查看参考答案。</p>
                            <Button className={styles.questionDetailContentMyAnswerBtn} type={"primary"}
                                    onClick={saveMyAnswer}>保存此答案为参考答案</Button>
                        </div>
                    </div>

                    <div className={styles.questionDetailContentRight}>
                        <div className={styles.questionDetailContentAnswer}>
                            <MDPreview value={question.answer}></MDPreview>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}