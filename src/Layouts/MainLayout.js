import React,  { useState, useEffect }  from 'react';
import { HomeOutlined, TeamOutlined , CommentOutlined  } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import StickyBox from "react-sticky-box";
import '../Styles/Layout.css'
const { Content, Sider } = Layout;


function getItem(label, key, path , icon, children) {
  return {
    key,
    label,
    path
  };
}

const iconsStyle = {
  fontSize: "1.4em",
  marginRight: '0.6rem'
};

const items = [
  { key: '1', label: 'Dashboard', path: '/', url: '', icon: <HomeOutlined style={iconsStyle}/> },
  { key: '2', label: 'Users', path: '/users', url: 'users', icon: <TeamOutlined style={iconsStyle}/>  },
  { key: '3', label: 'Posts', path: '/posts', url: 'posts', icon: <CommentOutlined style={iconsStyle} /> }
]

const MainLayout = ({ children }) => {
  const [noPage, setNoPage] = useState(false)
  let location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(items.find(_item => location.pathname.startsWith(_item.url)).key)
  const onClickMenu = (item) => {
    const clicked = items.find(_item => _item.key === item.key)
    navigate(clicked.path)
  }

  useEffect(() => {
    const currentLocation = location.pathname.split('/')
    if(currentLocation[1] !== '') {
      const pageKey = items.find(_item => currentLocation[1] === _item.url)?.key
      if(!pageKey) setNoPage(true)
      else setSelectedKey(pageKey)
    }
    else {
      setSelectedKey('1')
    }
  }, [location])

  return !noPage ? (
    <Layout style={{ display: "flex", alignItems: "flex-start",  background: "#fff"  }}>
      <StickyBox>
        <Sider
          className="sider-class"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div>
            <Link to="/">
              <div className="logo" />
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={onClickMenu}
          >
            {items.map((item) => (
              <Menu.Item key={item.key}>
                {item.icon} {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      </StickyBox>
      <Layout>
        <Content
          style={{
            // margin: "24px 16px 0",
            background: "#fff",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 400,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  ) : (
    <h1>
      404...This page doesnt exists please <a href="/">go back home</a>
    </h1>
  );
};

export default MainLayout;