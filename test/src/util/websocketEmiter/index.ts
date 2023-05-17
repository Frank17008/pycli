const actionList: Array<{ type: string; action: Function }> = [];
let errorCounter = 0;

// 添加监听事件
const addEventListener = (type: string, action: Function) => {
  actionList.push({ type, action });
};

// 移除监听事件
const removeEventListener = (action: Function) => {
  const index = actionList.findIndex((item) => item.action === action);
  actionList.splice(index, 1);
};

// 按消息类别分发事件
function execAction(type: string, messageBody?: any) {
  const subList = actionList.filter((item) => item.type === type);
  subList.forEach((listener) => listener.action(messageBody));
}

// 初始化websocket连接
const initWebsocket = (wsURL: string) => {
  if ('WebSocket' in window) {
    try {
      const ws = new WebSocket(wsURL);
      // WebSocket创建成功
      ws.onopen = () => {
        console.log('websocket open success...');
      };

      // WebSocket接收到消息
      ws.onmessage = (e) => {
        const { header, body } = JSON.parse(e.data);
        switch (header?.msgType || '') {
          // 心跳测试消息，证明websocket连接成功
          case 'heartbeat':
            execAction('heartbeat', header);
            break;
          // 复制成功
          case 'copyDbVersionEnd':
            execAction('copyDbVersionEnd', body?.data);
            break;
          // 创建版本库成功
          case 'createDbVersionEnd':
            execAction('createDbVersionEnd', body?.data);
            break;
          // 未知类型
          default:
            execAction('unknow', body?.data);
        }

        execAction('all', e.data);
      };

      // WebSocket断开连接
      ws.onclose = () => {
        execAction('wsClose');
      };

      // WebSocket发生异常
      ws.onerror = (err: any) => {
        execAction('wsError', {
          hasError: true,
          errorCounter,
          name: 'connectionError',
          errMessage: `无法连接到: ${err?.target?.url}`,
          err,
        });
      };
      return ws;
    } catch (err) {
      errorCounter++;
      execAction('wsError', { hasError: true, errorCounter, name: err.name, errMessage: err.message, err });
      return null;
    }
  } else {
    errorCounter++;
    execAction('wsError', {
      hasError: true,
      errorCounter,
      name: 'BrowserError',
      errMessage: '您的浏览器不支持WebSocket',
    });
    return null;
  }
};

export default { initWebsocket, addEventListener, removeEventListener };

// 数据样例
// {
//   "body": {
//       "data": {
//           "createTime": "createTime",
//           "name": "db_name"
//       },
//       "receiver": "web",
//       "sender": "server"
//   },
//   "header": {
//       "msgId": "295a525cd56a09c903ce559918c19a72",
//       "msgType": "heartbeat",
//       "sendTime": 1638499486000,
//       "status": "200"
//   }
// }
