import React, { useState } from "react";
import { DataContext } from "../../DataContext";
import { useContext } from "react";
import { isMobile, browserName } from "react-device-detect";
import { Col, Form, Input, Row, Select, Drawer, Space, Button } from "antd";
const { Option } = Select;
const EditUserForm = ({ user, onClose, visible }) => {
  // /!\ Send request with all new user infos
  // /!\ Set this new response to context to be displayed everywhere
  const { users, setUsers, posts, setPosts } = useContext(DataContext);
  const [userInfo, setUserInfo] = useState(user);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(userInfo);
    !name.includes(".")
      ? setUserInfo({ ...userInfo, [name]: value })
      : setUserInfo({
          ...userInfo,
          [name.split(".")[0]]: {
            ...userInfo[name.split(".")[0]],
            [name.split(".")[1]]: value,
          },
        });
  };

  const onFinish = (values) => {
    const updatedUser = users.map((user) => {
      if (user.id === values.id) {
        return values;
      }
      return user;
    });
    console.log(updatedUser);
    setUsers(updatedUser);
    onClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const selectBeforeUrl = (
    <Select defaultValue="http://" className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <>
      <Drawer
        title={'Edit ' + user.name}
        width={isMobile ? '100%' : '40%'}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                onFinish(userInfo);
              }}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={() => onFinish(userInfo)}
        >
          <Form.Item
            name="name"
            label="Name"
            onChange={handleChange}
            initialValue={user.name}
            rules={[
              {
                required: true,
                message: "Please enter user name",
              },
            ]}
          >
            <Input name="name" placeholder="Please enter user name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            onChange={handleChange}
            rules={[
              {
                required: true,
                message: "Please enter a mail",
              },
            ]}
          >
            <Input.Group compact>
              <Input name="email" defaultValue={user.email} />
            </Input.Group>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            initialValue={user.phone}
            rules={[
              {
                required: true,
                message: "Please enter a phone",
              },
            ]}
          >
            <Input
              onChange={handleChange}
              name="phone"
              placeholder="Please enter a number"
            />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[
              {
                required: true,
                message: "Enter a website",
              },
            ]}
          >
            <Input
              name="website"
              addonBefore={selectBeforeUrl}
              defaultValue={user.website}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="company.name"
            label="Company's name"
            initialValue={user.company.name}
            rules={[
              {
                required: true,
                message: "Please choose the approver",
              },
            ]}
          >
            <Input
              onChange={handleChange}
              name="company.name"
              placeholder="Please enter a company name"
            />
          </Form.Item>
          <Form.Item
            name="company.catchPhrase"
            label="Company's catch phrase"
            initialValue={user.company.catchPhrase}
            rules={[
              {
                required: true,
                message: "Please choose the catch phrase",
              },
            ]}
          >
            <Input.TextArea
              onChange={handleChange}
              name="company.catchPhrase"
              placeholder="Enter a catch phrase to this company"
              autoSize={{
                minRows: 1,
                maxRows: 6,
              }}
            />
          </Form.Item>
          <Form.Item
            name="company.bs"
            label="Company's bs phrase"
            initialValue={user.company.bs}
            rules={[
              {
                required: true,
                message: "Please choose the catch phrase",
              },
            ]}
          >
            <Input.TextArea
              onChange={handleChange}
              name="company.bs"
              placeholder="Enter a catch phrase to this company"
              autoSize={{
                minRows: 1,
                maxRows: 2,
              }}
            />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            initialValue={user.address.city}
            rules={[
              {
                required: true,
                message: "Please enter a city",
              },
            ]}
          >
            <Input
              onChange={handleChange}
              name="address.city"
              placeholder="Please enter a city"
            />
          </Form.Item>
          <Form.Item
            name="address.suite"
            label="Suite"
            initialValue={user.address.suite}
            rules={[
              {
                required: true,
                message: "Please enter a suite",
              },
            ]}
          >
            <Input
              onChange={handleChange}
              name="address.suite"
              placeholder="Please enter a city"
            />
          </Form.Item>
          <Form.Item
            name="address.street"
            label="Street"
            initialValue={user.address.street}
            rules={[
              {
                required: true,
                message: "Please enter a street",
              },
            ]}
          >
            <Input
              onChange={handleChange}
              name="address.street"
              placeholder="Please enter a street"
            />
          </Form.Item>
          <Form.Item
            name="address.zipcode"
            label="Zipcode"
            initialValue={user.address.zipcode}
            rules={[
              {
                required: true,
                message: "Please enter a zipcode",
              },
            ]}
          >
            <Input
              onChange={handleChange}
              name="address.zipcode"
              placeholder="Please enter a zipcode"
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default EditUserForm;
