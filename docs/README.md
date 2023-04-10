# Songs

## 用户信息（cookie）

### 存储位置

用户扫描二维码登录后会返回cookie字符串，cookie会存储在**LocalStorage**和**pinia**上面，服务器不会存储cookie。

cookie是识别用户的唯一标识。

用户通过账号密码登录会返回token和cookie，但是账号密码登录存在问题，因此也就没写相关的页面和逻辑。

![img](./img/1.png)

### 使用时机

在获取一些个人信息（我的歌单、我的专辑、关注歌手…）或者进行一些个人操作（收藏歌单，关注歌手…）的时候，需要携带cookie用来证明身份，本项目携带cookie的方式是在url字符串进行拼接。

携带cookie相关操作的代码在 src\service\request\index.ts ，在发生发生请求时可以传入一个 myParams （与params等价） 对象，需要携带cookie时可以设置cookie为true或者传入cookie字符串。

```tsx
// 1. 传入Boolean
NETEASE.get({
  url: `/lyric/new`,
  myParams: {
    cookie: true,
  }
});

// 1.传入string
NETEASE.get({
  url: `/lyric/new`,
  myParams: {
    cookie: "xxxxxxxxxxx",
  }
});
```

![img](./img/2.png)

### 用户登录判断

进入页面的时候会在LocalStorage里查找是否有cookie信息，如果存在则认为已登录。
