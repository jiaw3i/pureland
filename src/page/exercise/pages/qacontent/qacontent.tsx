import styles from "./qacontent.less";
import homeStyles from "../home/home.less";
import {Content} from "antd/es/layout/layout";
import React from "react";
import {Checkbox, Col, Divider, List, Radio, Rate, Row, Skeleton, Tag} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

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

    const questions: Array<{
        id: number,
        title: string,
        type: string,
        level: number,
        tags: Array<string>,
        updateTime: string,
    }> =
        [
            {
                id: 1,
                title: "这是一个问题",
                type: "选择题",
                level: 1,
                tags: ["Apple", "Pear", "Orange", "Banana"],
                updateTime: "2021-01-01",
            }, {
            id: 2,
            title: "这是一个问题",
            type: "问答题",
            level: 1,
            tags: ["Apple", "Pear", "Orange", "Banana"],
            updateTime: "2021-01-01",
        },
            {
                id: 3,
                title: "这是一个问题",
                type: "问答题",
                level: 1,
                tags: ["Apple", "Pear", "Orange", "Banana"],
                updateTime: "2021-01-01",
            },
            {
                id: 4,
                title: "这是一个问题",
                type: "问答题",
                level: 1,
                tags: ["Apple", "Pear", "Orange", "Banana"],
                updateTime: "2021-01-01",
            },
            {
                id: 5,
                title: "这是一个问题",
                type: "问答题",
                level: 1,
                tags: ["Apple", "Pear", "Orange", "Banana"],
                updateTime: "2021-01-01",
            }, {
            id: 6,
            title: "这是一个问题",
            type: "问答题",
            level: 1,
            tags: ["Apple", "Pear", "Orange", "Banana"],
            updateTime: "2021-01-01",
        }, {
            id: 7,
            title: "这是一个问题",
            type: "问答题",
            level: 1,
            tags: ["Apple", "Pear", "Orange", "Banana"],
            updateTime: "2021-01-01",
        },
            {
                id: 8,
                title: "这是一个问题",
                type: "问答题",
                level: 1,
                tags: ["Apple", "Pear", "Orange", "Banana"],
                updateTime: "2021-01-01",
            },
        ]

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
                            hasMore={questions.length < 50}
                            loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List

                                dataSource={questions}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <div className={styles.qaContentItemTitle}>
                                            <Tag color="#2db7f5">{item.type}</Tag>
                                            {item.id}. {item.title}
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