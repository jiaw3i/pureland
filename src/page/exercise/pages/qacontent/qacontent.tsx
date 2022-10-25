import styles from "./qacontent.less";
import homeStyles from "../home/home.less";
import {Content} from "antd/es/layout/layout";
import React, {useEffect} from "react";
import {Checkbox, Col, Divider, List, Radio, Rate, Row, Skeleton, Tag} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {getQuestions} from "../../../../actions/interviewqa";
import {QuestionType} from "../questionmanager/qmanage";

export default function QAContent() {

    const tags = ["Apple", "Pear", "Orange", "Banana"
        , "Apple", "Pear", "Orange", "Banana"
        , "Apple", "Pear", "Orange", "Banana"
        , "Apple", "Pear", "Orange", "Banana"
        , "Apple", "Pear", "Orange", "Banana"
        , "Apple", "Pear", "Orange", "Banana"
        , "Apple", "Pear", "Orange", "Banana"];

    const sortOptions = [
        "按照时间排序",
        "按照难度排序",
        "按照标签排序",
    ];

    const [questions, setQuestions] = React.useState<Array<QuestionType>>([]);
    const [hasMore, setHasMore] = React.useState<boolean>(false);

    useEffect(() => {
        getQuestions().then(res => {
            if (res.success) {
                setQuestions(res.data);
            }
        })
    }, []);
    const loadMoreData = () => {
        console.log("load more");
    }
    return (
        <Content className={homeStyles.siteLayoutBackground}
                 style={{
                     margin: '24px 16px',
                     padding: 24,
                     minHeight: 280,
                 }}
        >
            <div className={homeStyles.siteLayoutBackground}>
                <div className={styles.qaFilter}>
                    <div className={styles.qaFilterTag}>
                        <label className={styles.qaFilterTagLabel}>标签</label>
                        <Checkbox.Group options={tags} defaultValue={['Apple']}>

                        </Checkbox.Group>


                    </div>

                    <div className={styles.qaFilterSort}>
                        <label className={styles.qaFilterSortLabel}>排序</label>
                        <Radio.Group
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
                                    <List.Item key={item.id}>
                                        <div className={styles.qaContentItemTitle}>
                                            <Tag color="#2db7f5">{item.type}</Tag>
                                            {item.id}. {item.content}
                                        </div>
                                        <div className={styles.qaContentItemInfo}>
                                            <div className={styles.qaContentItemLevel}>
                                                <Rate disabled defaultValue={item.level}/>
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