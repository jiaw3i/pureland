import {animated, useSpring,useTransition} from 'react-spring'
import {Content} from "antd/es/layout/layout";
import {useState} from "react";
import content from './content.less';
import './content.less'

export default function PLContent() {
    //useTransition()
    const transition = useTransition(true,  {
        from: {opacity: 0, position: 'relative', top: '400px', left: '-100px'},
        enter: {opacity: 1, position: 'relative', top: '0', left: '0'},
        // enter: {opacity: 1, position: 'static'},
        // delay: 1000,
        // enter: {opacity: 1, position: 'absolute', top: '90%', left: '10px', transform: 'translate(-50%, -50%)'},
    });
    return (
        <Content className={content.antLayoutContent}>

            <div className={content.contentHead}>

                {transition((style, item) =>
                    // @ts-ignore
                    item && <animated.div style={style}
                                          className={content.imageMessage}></animated.div>
                )}

            </div>
            <div className={content.skillCard}>

            </div>
        </Content>
    )
}