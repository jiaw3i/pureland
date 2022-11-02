import styles from "./qacontent.less";
import homeStyles from "../home/home.less";
import {Content} from "antd/es/layout/layout";
import React, {useEffect, useState} from "react";
import {Checkbox, Col, Divider, List, Radio, Rate, Row, Skeleton, Tag} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {getAllTag, getQuestions} from "../../../../actions/interviewqa";
import {QuestionType} from "../questionmanager/qmanage";
import {useNavigate} from "react-router-dom";

export default function QAContent() {

    const navigate = useNavigate();
    const [tags,setTags] = useState<Array<{
        id: number,
        tagName: string
    }>>();

    const sortOptions = [
        "按照时间排序",
        "按照难度排序",
    ];

    const [questions, setQuestions] = React.useState<Array<QuestionType>>([]);
    const [hasMore, setHasMore] = React.useState<boolean>(false);

    /**
     * 初始化数据
     */
    useEffect(() => {
        getAllTag().then(res=>{
            if (res.success){
                setTags(res.data);
            }
        });
        getQuestions().then(res => {
            if (res.success) {
                setQuestions(res.data);
            }
        });

    }, []);

    const loadMoreData = () => {
        console.log("load more");
    }
    const filterQuestion = (id:number)=>{
        // 根据id过滤question
        return questions.filter(q=> id === q.id);
    }
    return (
        <Content className={homeStyles.siteLayoutBackground}
                 style={{
                     margin: '24px 16px',
                     padding: 24,
                     minHeight: 280,
                 }}
        >
            <div className={homeStyles.siteLayoutBackground} style={{width:"100%"}}>
                <div className={styles.qaFilter}>
                    <div className={styles.qaFilterTag}>
                        <label className={styles.qaFilterTagLabel}>标签</label>
                        <Checkbox.Group options={tags?.map(tag=> tag.tagName)} defaultValue={['Apple']}>

                        </Checkbox.Group>


                    </div>

                    <div className={styles.qaFilterSort}>
                        <label className={styles.qaFilterSortLabel}>排序</label>
                        <Radio.Group
                            defaultValue={sortOptions[0]}
                            options={sortOptions}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </div>
                </div>
                <Divider>题目列表</Divider>
                <div className={styles.qaContent}>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={questions.length}
                            next={loadMoreData}
                            hasMore={hasMore}
                            loader={<Skeleton avatar paragraph={{rows: 1}}/>}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List

                                dataSource={questions}
                                renderItem={item => (
                                    <List.Item key={item.id} onClick={()=>navigate(`question/${item.id}`,{
                                        state: filterQuestion(item.id)
                                    })}>
                                        <div className={styles.qaContentItemTitle}>
                                            <Tag color="#2db7f5">{item.type}</Tag>
                                            {item.id}. {item.content}
                                        </div>
                                        <div className={styles.qaContentItemInfo}>
                                            <div className={styles.qaContentItemLevel}>
                                                难度：<Rate disabled defaultValue={item.level}/>
                                            </div>
                                            <div>更新时间：{item.updateTime}</div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </Content>
    );
}