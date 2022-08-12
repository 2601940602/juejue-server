'use strict';

const Controller = require('egg').Controller;
const defaultAvatar =
    'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'; // 默认头像

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    // 判空操作
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null,
      };
      return;
    }
    // 判重复操作
    const userInfo = await ctx.service.user.getUserByName(username);
    console.log('userinfo', userInfo);
    if (userInfo && userInfo.username && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '用户名已存在',
        data: null,
      };
      return;
    }
    // 写入数据库
    const result = await ctx.service.user.register({
      username,
      password,
      signature: '世界和平',
      avatar: defaultAvatar,
      ctime: new Date(),
    });
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }
  }
}

module.exports = UserController;
