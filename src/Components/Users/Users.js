import React, { useContext, useState, useMemo, useEffect } from "react";
import { Tabs, Typography } from "antd";
import { useLocation, useSearchParams  } from "react-router-dom";
import TableUsers from "./TableUsers";
const { TabPane } = Tabs;

const OperationsSlot = {
  left: <Typography.Title className="tabs-extra-demo-button">#Users</Typography.Title>,
};

const Users = () => {
  const [selectedKey, setSelectedKey ] = useState(localStorage.getItem('usersTabSelection') || '1');
  const [position, setPosition] = useState(["left", "right"]);
  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {}
    );
  }, [position]);
  const onChange = (selection) => {
    setSelectedKey(selection)
    localStorage.setItem('usersTabSelection', selection);
  }
  return (
    <>
      <div className="card-container">
        <Tabs tabBarExtraContent={slot} defaultActiveKey={selectedKey} onChange={onChange} centered>
          <TabPane tab={<span>All</span>} key="1">
            <TableUsers />
          </TabPane>
          <TabPane tab={<span>Apartment</span>} key="2">
            <TableUsers filter={"Apt"} />
          </TabPane>
          <TabPane tab={<span>Suite</span>} key="3">
            <TableUsers filter={"Sui"} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Users;
