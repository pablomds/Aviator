import React, {useState} from "react"
import { Link } from 'react-router-dom'
import { Layout, Menu} from 'antd'

const { Header, Content, Footer } = Layout;

const contentStyle = {
  justifyContent: 'center',
  padding: '3rem 3rem',
};

const PVLayout = ({ children, authCookie }) => {

  const [ currentPage, setCurrentPage ] = useState(['1'])

  return (
    <Layout>
      <Header>
        <Menu theme='dark' mode="horizontal" defaultSelectedKeys={currentPage}>
          <Menu.Item key='1'>
            <Link to='/'>Accueil</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/auth/'>Login</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/auth/register'>Register</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to='/questions/'>Questions</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link to='/sessions'>Sessions</Link>
          </Menu.Item>
          <Menu.Item key='6'>
            <Link to='/quiz'>Quiz</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={contentStyle} children={children} />

      <Footer style={{ textAlign: 'center'}}>
        All copyrights to P@blo - {new Date().getFullYear() }
      </Footer>
    </Layout>
  );
}

export default PVLayout