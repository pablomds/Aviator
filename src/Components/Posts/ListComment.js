import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import { Avatar, List, Space,Card,Tooltip, Empty } from "antd";
import {
  LikeOutlined,
  StarOutlined,
  MessageOutlined,
  ShareAltOutlined,
  MoreOutlined ,
  FlagOutlined,
} from "@ant-design/icons";
import { DataContext } from '../../DataContext';



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const tooltipIcon = ({ icon, text }) => (
  <Tooltip title="prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
);

// const tooltipIcon = ({ icon, text }) => (
//   <Tooltip>
//     {React.createElement(icon)}
//     {text}
//   </Tooltip>
// );



const ListComment = ({ sortBy = undefined, filterByUserId = undefined }) => {
  const [pagination, setPagination] = useState(8)
  const { posts, users } = useContext(DataContext);
  const [action, setAction] = useState(null);
  var data;

  if(posts) {
    if(sortBy === 'date' ) {
      var newData = posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      data = newData
    }
    if(sortBy === 'favorites' ) {
      const sortedByFavorites = posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.favorites - a.favorites;
      });
      data = sortedByFavorites
    }
    if(sortBy === 'likes' ) {
      const sortedByLikes = posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.likes - a.likes;
      });
      data = sortedByLikes
    }
    if(sortBy === 'comments' ) {
      const sortedByComments = posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.comments - a.comments;
      });
      data = sortedByComments
    }
    const addingUserToPost = data.map((post) => {
      post.user = users.find((user) => user.id === post.userId);
      return post;
    });
    data = addingUserToPost
  }

  if (filterByUserId) {
    const filteredByUserId = posts.filter(post => post.userId === filterByUserId * 1 );
    data = filteredByUserId
  }


  return (
    users &&
    posts &&
    data ? (
      <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (_, pageSize) => {
          setPagination(pageSize)
        },
        pageSize: pagination,
      }}
      dataSource={data}
      renderItem={(item) => (
        <Card
          style={{
            width: '80%',
            margin: '0 auto 1em auto',
          }}
          actions={[
            <Tooltip title="Share this content">
              <ShareAltOutlined key="setting" />
            </Tooltip>,
            <Tooltip title="Report this content">
              <FlagOutlined key="ellipsis" />
            </Tooltip>,
            <Tooltip title="More actions">
              <MoreOutlined key="edit" />
            </Tooltip>,
          ]}
        >
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={StarOutlined}
                text={item.favorites}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text={item.likes}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.comments}
                key="list-vertical-message"
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<Link to={"/users/" + item.user.id}>{item.user.name}</Link>}
              description={item.createdAt.toString()}
            />
            {item.body}
          </List.Item>
        </Card>
      )}
    />
    ) : (<Empty description={"No posts available..."}/>)
  );

};

export default ListComment;
