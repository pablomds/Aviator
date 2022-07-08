import React from "react";
import { Link } from 'react-router-dom'
import "../../Styles/SideBar.css"
import { IconContext } from "react-icons";
import { Layout,Menu,  } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  UserOutlined,
  TeamOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
const { Content, Footer, Sider, Header } = Layout;



const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));


const SideBar = ({ menu }) => {
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        {/* <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      /> */}
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            ...
            <br />
            Really
            <br />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
  // return (
  //   <IconContext.Provider
  //     value={{
  //       style: { verticalAlign: "middle", margin: "0.2em" },
  //       size: "2.4em",
  //     }}
  //   >
  //     <Layout.Sider
  //       className="sidebar"
  //       breakpoint={"lg"}
  //       theme="light"
  //       collapsedWidth={0}
  //       trigger={null}
  //     >
  //       <Link to='/'>
  //         <img alt="Logo of aviato" width={100} src="aviator-logo.png" />
  //       </Link>
  //       {menu}
  //     </Layout.Sider>
  //   </IconContext.Provider>
  // );
};
export default SideBar;