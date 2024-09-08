import { SocketResTemplete } from '@/types';

// 处理返回值解构
export default function (
  data: Record<string, unknown>,
  success = true,
  message = '',
): SocketResTemplete {
  return {
    success,
    data,
    message,
  };
}
