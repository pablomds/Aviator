import React, { useState} from 'react'
import { Tabs, Typography } from "antd";
import ListComment from './ListComment';
const { TabPane } = Tabs;

const OperationsSlot = {
  left: <Typography.Title className="tabs-extra-demo-button">#Posts</Typography.Title>,
};

const Posts = () => {
  const [selectedKey, setselectedKey] = useState(localStorage.getItem('postsTabSelection') || '1')
  const onChange = (change) => {
    setselectedKey(change)
    localStorage.setItem('postsTabSelection', change)
  }
  return (
    <>
      <Tabs tabBarExtraContent={OperationsSlot} size="large" onChange={onChange} defaultActiveKey={selectedKey} centered>
        <TabPane tab="Recent" key="1">
          <ListComment sortBy="date" />
        </TabPane>
        <TabPane tab="Favorites" key="2">
          <ListComment sortBy="favorites" />
        </TabPane>
        <TabPane tab="Most Liked" key="3">
          <ListComment sortBy="likes" />
        </TabPane>
        <TabPane tab="Most Answers" key="4">
          <ListComment sortBy="comments" />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Posts