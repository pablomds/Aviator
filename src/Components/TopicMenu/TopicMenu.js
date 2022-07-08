import React from "react";
import { Menu } from "antd";
import { Link } from 'react-router-dom'


const TopicMenu = ({ topics, selectedKey, changeSelectedKey }) => {
  const styledTopics = [];
  topics.map((topic, index) =>
    styledTopics.push(
      // <Menu.Item key={index} onClick={changeSelectedKey}>
      <Menu.Item key={index} onClick={changeSelectedKey}>
        {topic.icon}
        {topic.page}
        <Link to={topic.link}></Link>
      </Menu.Item>
    )
  );
  return (
    // <Menu mode="inline" selectedKeys={[selectedKey]}>
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      {styledTopics}
    </Menu>
  );
}
export default TopicMenu;