// 引入JWT
const jsonwebtoken = require('jsonwebtoken')
const secret = 'wmy'
const JWT = {
    // 生成方法
    generate(value,expires) {
        return jsonwebtoken.sign(value,secret,{expiresIn:expires })
    },
    // 验证方法 是否过期
    verify(token) {
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(err) {
            return false
        }
    }
}

const token = JWT.generate({name:'wmy'},'10s')

module.exports = JWT