import React, { useState, useContext, useEffect } from "react";
import { DataContext } from '../../DataContext';
import { useNavigate, useParams, Link, useLocation, useSearchParams } from "react-router-dom";
import { Card, Skeleton,Avatar,Tag, Divider, Button, Tooltip, Empty  } from 'antd';
import { PlusOutlined, EditFilled } from '@ant-design/icons';
import {
  MailFilled,
  PhoneFilled
} from "@ant-design/icons";
import ListComment from "../Posts/ListComment";

import EditUser from "./EditUser";

const { Meta } = Card;


const User = () => {
  const { users } = useContext(DataContext);
  const { id } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();


  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSearchParams('')
  };

  useEffect(() => {
    if(location.search) {
      if(location.search == '?edit') {
        showDrawer()
      }
    }
    else return null
  }, [])



  let user = users.find(user => user.id == id );
  if(!user) return (<Empty description={`No user with this id(${id > 100 ? '>100' : id}) found...`}/>)
  return (
    <>
      <Divider orientation="center">
        {user ? user.name : "This user has no name"}
      </Divider>
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Card
          title={
            user ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{user.name}</span>
                <Tag
                  color={user.address.suite.startsWith("Sui") ? "green" : "red"}
                >
                  {user.address.suite}
                </Tag>
              </div>
            ) : undefined
          }
          style={{
            width: 400,
            marginTop: 16,
          }}
          actions={
            user
              ? [
                  <Tooltip title={"Send a mail to " + user.name}>
                    <Button
                      onClick={(e) => {
                        window.location.href = "mailto:no-reply@example.com";
                        e.preventDefault();
                      }}
                      type="text"
                    >
                      <MailFilled key="email" />
                    </Button>
                  </Tooltip>,
                  <Tooltip title={"Call " + user.name}>
                    <Button
                      type="text"
                      onClick={(e) => {
                        window.location.href = "tel:" + user.phone;
                        e.preventDefault();
                      }}
                    >
                      <PhoneFilled key="phone" />
                    </Button>
                  </Tooltip>,
                  <Tooltip title={"Edit " + user.name}>
                    <Button onClick={showDrawer} type="text">
                      <EditFilled />
                    </Button>
                  </Tooltip>,
                ]
              : undefined
          }
        >
          <Skeleton loading={user ? false : true} avatar active>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                verticalAlign: "middle",
              }}
            >
              <Avatar
                size={{
                  xs: 24,
                  sm: 32,
                  md: 40,
                  lg: 70,
                  xl: 80,
                  xxl: 100,
                }}
                shape="square"
                src="https://joeschmoe.io/api/v1/random"
              />
              <div style={{ display: "inline-block", verticalAlign: "middle" }}>
                <p>Company : {user.company.name}</p>
                <p>City : {user.address.city}</p>
              </div>
            </div>
          </Skeleton>
        </Card>
      </div>
      <Divider orientation="left">Latest Posts</Divider>
      <ListComment sortBy="date" filterByUserId={id} />
      <EditUser visible={visible} onClose={onClose} user={user} />
    </>
  );
};

export default User;
