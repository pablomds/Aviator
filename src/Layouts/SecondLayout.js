import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout  } from 'antd'
import TopicMenu from '../Components/TopicMenu/TopicMenu'
import NavBar from '../Components/NavBar/NavBar'
import SideBar from '../Components/Sidebar/Sidebar'
import { AiOutlineHome } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { FaRegComments } from 'react-icons/fa';
import { BsListTask } from 'react-icons/bs';
import { IoAlbumsOutline } from 'react-icons/io5';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { IconContext } from "react-icons";

import '../Styles/Layout.css'

const { Header, Content, Footer } = Layout;


const contentStyle = {
  justifyContent: 'center',
  padding: '3rem 3rem',
};


const topics = [
  { page: "Dashboard", link: "/", key:'0' , icon : <AiOutlineHome/> },
  { page: "Users", link: "/users", key:'1',  icon: <FiUsers/> },
  { page: "Posts", link: "/posts",key:'2', icon: <VscCommentDiscussion/> },
  { page: "Todos", link: "/todos", key:'3' , icon: <BsListTask/>},
  { page: "Albums", link: "/albums",key:'4', icon: <IoAlbumsOutline/> },
];


const SecondLayout = ({ children }) => {
  let navigate = useNavigate();
  let location = useLocation();
  const [selectedKey, setSelectedKey] = useState(null);
  const [current, setCurrent] = useState(location.pathname)
  const regex = /(?:\\.|[^/\\])*/g;

  useEffect(() => {
    if (location) {
      const regexResult = location.pathname.match(regex)[1]
      const currentIndex = topics.find(
        (topic) => {
          if(topic.link.includes(regexResult) ){
            return topic
          }
        }
      );
      if(!currentIndex) {
        return navigate('/')
      }
      setSelectedKey(currentIndex.key);
      setCurrent(location.pathname);
    }
  }, [location, selectedKey, current]);


  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
  };

  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  return (
    <div className="Layout">
      <Layout>
        {/* <NavBar menu={Menu} /> */}

        <SideBar menu={Menu} />
        <Content style={contentStyle} children={children} />
      </Layout>
    </div>
  );
};

export default SecondLayout;