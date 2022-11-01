import styles from "./qadetail.less"
import {useParams} from "react-router-dom";
import homeStyles from "../home/home.less";
import {Checkbox, Divider, List, Radio, Rate, Skeleton, Tag} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {Content} from "antd/es/layout/layout";
import React from "react";

export default function QADetail() {
    const params = useParams();

    return (
        <Content className={homeStyles.siteLayoutBackground}
                 style={{
                     margin: '24px 16px',
                     padding: 24,
                     minHeight: 280,
                 }}
        >
            <div className={homeStyles.siteLayoutBackground} style={{width:"100%"}}>

                <h1>{params.id}</h1>
            </div>
        </Content>
    )
}