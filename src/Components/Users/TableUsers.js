import { Table, Tag, Button, Space, Empty } from 'antd';
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { DataContext } from '../../DataContext';



const TableUsers = ( { filter = undefined }) => {
  const { users,setUsers, posts, setPosts  } = useContext(DataContext);

  const handleDelete = (key) => {
    const newData = users.filter((item) => item.id !== key);
    const newPosts = posts.filter((item) => item.userId !== key);
    setUsers(newData);
    setPosts(newPosts);
  };


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => <Link to={"/users/" + item.id}>{item.name}</Link>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <p>
          City : {address.city}
          <br />
          Street : {address.street}
          <br />
          ZipCode : {address.zipcode}
        </p>
      ),
    },
    {
      title: "Residence",
      key: "address.suite",
      dataIndex: "address",
      render: (_, { address }) => (
        <>
          <Tag
            color={address.suite.startsWith("Sui") ? "green" : "red"}
            key={address.suite}
          >
            {address.suite.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, user) => (
        <Space size="middle">
          <Link onClick={() => handleDelete(user.id)} to="#">
            Delete
          </Link>
          <Link to={"/users/" + user.id + "?edit"}>Edit</Link>
        </Space>
      ),
    },
  ];


  return users || posts ? (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (user) => (
          <p
            style={{
              margin: 0,
            }}
          >
            Hello, I'm {user.name} and this is my website :{" "}
            <a
              href={"http://" + user.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.website}{" "}
            </a>
          </p>
        ),
        rowExpandable: (user) => user.name !== "Not Expandable",
      }}
      dataSource={
        filter
          ? users.filter((user) => user.address.suite.startsWith(filter))
          : users
      }
    />
  ) : (
    <Empty />
  );
}

export default TableUsers;