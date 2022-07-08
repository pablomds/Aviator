import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Divider, Typography, Skeleton, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaComments } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { BsHouseDoorFill } from "react-icons/bs";
import { IoBarChart } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";

import CardDashboard from "./CardDashboard";
import { IconContext } from "react-icons";
import { DataContext } from "../../DataContext";

const countAveragePosts = (array) => {
  var totalPosts = 0;
  array.map((element) => (totalPosts += element.length));
  return totalPosts / array.length;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { users, posts } = useContext(DataContext);
  const [usersInSuite, setUsersInSuite] = useState(null);
  const [usersInApt, setUsersInApt] = useState(null);
  const [avgPosts, setAvgPosts] = useState(null);
  const [maxPostUser, setMaxPostUser] = useState(null);
  useEffect(() => {
    if (users && posts) {
      let usersInSuiteTab = [];
      let usersInAptTab = [];
      let averagePosts = [];
      const ids = users.map((user) => {
        user.address.suite.startsWith("Sui")
          ? usersInSuiteTab.push(user.id)
          : usersInAptTab.push(user.id);
        averagePosts.push(posts.filter((post) => post.userId === user.id));
        return user.id;
      });
      const sortByMorePosts = averagePosts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.length - a.length;
      });
      setMaxPostUser(sortByMorePosts);
      setAvgPosts(countAveragePosts(averagePosts));
      setUsersInSuite(usersInSuiteTab);
      setUsersInApt(usersInAptTab);
      setLoading(false);
    }
  }, []);

  const style = {
    // background: '#0092ff',
    // padding: '1rem 1rem',
  };

  return (
    <>
      <Divider orientation="left">
        <Typography.Title>Dashboard</Typography.Title>
      </Divider>
      {!users || !posts || !usersInSuite || !usersInApt || !avgPosts ? (
        <Empty />
      ) : (
        <IconContext.Provider
          value={{ style: { verticalAlign: "middle" }, size: "2rem" }}
        >
          <Row gutter={[16, 16]}>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 6, offset: 1 }}
            >
              <div style={style}>
                <CardDashboard
                  loading={loading}
                  title={"Users"}
                  value={users.length}
                  cardIcon={<FaUsers />}
                  link={"/users"}
                  onClickFunction={() => {
                    localStorage.removeItem("usersTabSelection");
                  }}
                />
              </div>
            </Col>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 6, offset: 1 }}
            >
              <div style={style}>
                <CardDashboard
                  loading={loading}
                  title={"Users in Apartment"}
                  value={usersInApt.length}
                  link={"/users"}
                  onClickFunction={() => {
                    localStorage.setItem("usersTabSelection", 2);
                  }}
                  cardIcon={<MdApartment />}
                />
              </div>
            </Col>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 6, offset: 1 }}
            >
              <div style={style}>
                <CardDashboard
                  loading={loading}
                  title={"Users in Suite"}
                  value={usersInSuite.length}
                  link={"/users"}
                  onClickFunction={() =>
                    localStorage.setItem("usersTabSelection", 3)
                  }
                  cardIcon={<BsHouseDoorFill />}
                />
              </div>
            </Col>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 6, offset: 1 }}
            >
              <div style={style}>
                <CardDashboard
                  loading={loading}
                  title={"Posts"}
                  value={posts.length}
                  link={"/posts"}
                  onClickFunction={() =>
                    localStorage.removeItem("postsTabSelection")
                  }
                  cardIcon={<FaComments />}
                />
              </div>
            </Col>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 6, offset: 1 }}
            >
              <div style={style}>
                <CardDashboard
                  loading={loading}
                  title={"Avg Post / User"}
                  value={avgPosts}
                  link={"/posts"}
                  onClickFunction={() =>
                    localStorage.setItem("postsTabSelection", 1)
                  }
                  cardIcon={<IoBarChart />}
                />
              </div>
            </Col>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 6, offset: 1 }}
            >
              <div style={style}>
                <CardDashboard
                  loading={loading}
                  title={"Active Users"}
                  value={users.length}
                  link={"/users"}
                  cardIcon={<HiUsers />}
                />
              </div>
            </Col>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 6, offset: 1 }}
            >
              <div style={style}>
                <CardDashboard
                  loading={loading}
                  title={"Most Active User"}
                  value={users[1].name}
                  link={"/users/" + users[1].id}
                  cardIcon={<FaComments />}
                />
              </div>
            </Col>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              lg={{ span: 6, offset: 1 }}
            >
              <div style={style}>
                <CardDashboard
                  title={"Max Post / User"}
                  value={maxPostUser[0].length}
                  link={"/posts"}
                  loading={loading}
                  cardIcon={<IoBarChart />}
                />
              </div>
            </Col>
          </Row>
        </IconContext.Provider>
      )}
    </>
  );
};

export default Dashboard;
