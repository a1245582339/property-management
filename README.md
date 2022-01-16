# 物业管理系统
## 接口文档
### 异常定义
| code  | 错误             |
| ----- | ---------------- |
| 1 | 请求方式错误         |
| 2 | 管理员手机号已存在 |
| 3 | 没有找到对应的数据     |
| 4 | 密码或用户名错误     |
| 5 | 用户不存在     |
| 6 | 请求方式错误     |
| 7 | 旧密码错误     |
### 接口
#### 管理员
##### 管理员登录
```http
POST /api_admin_token
```