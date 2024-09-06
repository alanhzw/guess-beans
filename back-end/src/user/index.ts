import { SocketOnParams, User } from '@/types';
// 用户列表
const userList: User[] = [];

// 添加用户
export const addUser = ({ io, socket }: SocketOnParams) => {
  return async (payload = {}, callback = () => {}) => {
    console.log('🚀🚀 ~ return ~ payload:', payload);
    userList.push();
  };
};

// 删除用户
export const removeUser = ({ io, socket }: SocketOnParams) => {
  return async () => {
    userList.push();
  };
};
