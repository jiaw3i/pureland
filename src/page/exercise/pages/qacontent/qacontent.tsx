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
    const [tags, setTags] = useState<Array<{
        id: number,
        tagName: string
    }>>();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(15);
    const [questions, setQuestions] = React.useState<Array<QuestionType>>([]);
    const [filterOptions, setFilterOptions] = React.useState<{
        tags: Array<string>,
        sortField: string,
        sortType: string
    }>({} as any);


    const sortOptions = [
        {
            label: "按照时间排序",
            value: "create_time"
        }, {
            label: "按照难度排序",
            value: "level"
        }
    ];
    const [hasMore, setHasMore] = React.useState<boolean>(true);

    /**
     * 初始化数据
     */
    useEffect(() => {
        getAllTag().then(res => {
            if (res.success) {
                setTags(res.data);
            }
        });
        getQuestions(page, pageSize,{
            tags: ["Java"],
        }).then(res => {
            if (res.success) {
                setQuestions(res.data);
                setPage(page + 1);
            }
        });

    }, []);

    const loadMoreData = () => {
        console.log("load more");
        getQuestions(page, pageSize).then(res => {
            if (res.success) {
                if (res.data?.length === 0) {
                    setHasMore(false);
                    return;
                }
                setQuestions([...questions, ...res.data]);
                setPage(page + 1);
            }
        });
    }
    const filterQuestion = (id: number) => {
        // 根据id过滤question
        return questions.filter(q => id === q.id);
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
                <div className={styles.qaFilter}>
                    <div className={styles.qaFilterTag}>
                        <label className={styles.qaFilterTagLabel}>标签</label>
                        <Checkbox.Group
                            defaultValue={["Java"]}
                            options={tags?.map(tag => tag.tagName)}
                            onChange={(checkedValues) => {
                                setPage(1);
                                console.log(checkedValues);
                                filterOptions.tags = checkedValues as Array<string>;

                                setFilterOptions({...filterOptions});
                                getQuestions(1, pageSize, filterOptions).then(res => {
                                    if (res.success) {
                                        setQuestions(res.data);
                                    }
                                });
                            }}
                        >

                        </Checkbox.Group>


                    </div>

                    <div className={styles.qaFilterSort}>
                        <label className={styles.qaFilterSortLabel}>排序</label>
                        <Radio.Group
                            defaultValue={sortOptions[0]}
                            options={sortOptions}
                            optionType="button"
                            buttonStyle="solid"
                            onChange={(e) => {
                                setPage(1);
                                filterOptions.sortField = e.target.value;
                                filterOptions.sortType = "asc";
                                setFilterOptions({...filterOptions});
                                getQuestions(page, pageSize, filterOptions).then(res => {
                                    if (res.success) {
                                        setQuestions(res.data);
                                    }
                                });
                            }}
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
                            loader={<Divider plain>Loading~</Divider>}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List

                                dataSource={questions}
                                renderItem={item => (
                                    <List.Item key={item.id} onClick={() => navigate(`question/${item.id}`, {
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