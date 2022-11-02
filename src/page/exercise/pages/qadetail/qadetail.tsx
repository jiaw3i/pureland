import styles from "./qadetail.less"
import {useLocation, useParams} from "react-router-dom";
import homeStyles from "../home/home.less";
import {Checkbox, Divider, List, Radio, Rate, Skeleton, Tag} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {Content} from "antd/es/layout/layout";
import React, {useEffect, useState} from "react";
import {QuestionType} from "../questionmanager/qmanage";
import VEditor from "../editor/editor";

export default function QADetail() {
    const params = useParams();
    const location = useLocation();
    const [question, setQuestion] = useState<QuestionType>({} as QuestionType);
    useEffect(() => {
        setQuestion(location.state[0] as QuestionType);
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
                        难度：<Rate disabled defaultValue={question.level}/>
                    </div>
                </div>
                <Divider>题目</Divider>
                <div className={styles.questionDetailContentMain}>
                    <div className={styles.questionDetailContentMyAnswer}>
                        <VEditor></VEditor>
                    </div>

                    <div className={styles.questionDetailContentAnswer}>
                        <p>正确答案：</p>
                    </div>
                </div>
            </div>
        </Content>
    )
}