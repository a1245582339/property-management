# 物业管理系统

## 接口文档

### 异常定义

| code | 错误               |
| ---- | ------------------ |
| 1    | 请求方式错误       |
| 2    | 管理员邮箱已存在   |
| 3    | 没有找到对应的数据 |
| 4    | 密码或用户名错误   |
| 5    | 用户不存在         |
| 6    | 请求方式错误       |
| 7    | 旧密码错误         |
| 8    | 无权限             |

### 接口

#### 管理员

##### 管理员登录

```http
POST /api_admin_token
```

##### 响应

```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 0,
    "data": {
        "user_id": "61cbd6a6819bc002601d2655",
        "authorization_token": "730c4ab2-6146-4cb8-991c-2a3ba930531e"
    }
}
```

##### 管理员退出登录

```http
POST /api_admin_logout
```

##### 响应

```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 0
}
```

##### 获取管理员列表

```http
POST /api_admin_logout
```

##### 响应

```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 0
}
```
