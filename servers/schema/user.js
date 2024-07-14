// 用户信息验证模块
// 导入验证模块
const joi = require('joi')

// 定义规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id = joi.number().integer().min(1).required()
const avatar = joi.string().dataUri().required()

// 注册和登录的验证规则
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}