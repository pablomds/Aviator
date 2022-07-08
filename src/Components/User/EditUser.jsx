import { Button, Drawer, Space } from 'antd';
import EditUserForm from './EditUserForm';


const EditUser = ({ onClose, visible, user }) => {

  return (
    <>
      <EditUserForm user={user} onClose={onClose} visible={visible} />
    </>
  );
};

export default EditUser;