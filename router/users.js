const express = require('express');
const conn = require('../dao/conn');
const crypto = require('crypto');

const router = express.Router();

router.route('/regs')
    .post((req, res, next) => {

      let searchUser = `select * from users where user_phone='${req.body.phone}'`;
     
      conn.query(searchUser, (err, results) => {
        if (err) console.log(err);
        if (results.length) {
            res.json({ msg: '电话号码已存在', phone: req.body.phone, error: 1 });
        } else {
          let md5 = crypto.createHash('md5'); // 创建一个哈希加密
          let passResult = md5.update(req.body.password).digest('hex'); // 加密内容获得16进制结果
          let sql = `insert into users(user_phone,user_password) 
          values('${req.body.phone}','${passResult}')`;
          // console.log(sql);
          conn.query(sql, (err, result) => {
 
            if (err) console.log(err);
            if (result.insertId) {
              res.cookie('phone', req.body.phone);
              res.cookie('isLogined', true);
              res.json({
                  msg: "注册成功",
                  phone: req.body.phone,
                  error: 0
              });
            }
          });
        }
      });
    });

router.route('/login')
  .post((req, res, next) => {
    //let searchPhone = `select * from users where user_phone='${req.body.phone}'`;
    let searchPhone = `select * from users`;
    conn.query(searchPhone,(err, results) => {
      if (err) console.log(err);
      if (results.length) {
        // let md5 = crypto.createHash('md5'); // 创建一个哈希加密
        // let passResult = md5.update(req.body.password).digest('hex'); // 加密内容获得16进制结果
        res.json(results);
      } else {
        res.json({ msg: '电话号码不存在', phone: req.body.phone, error: 1 });
      }
    });
    // console.log(req.cookies);
  });

module.exports = router; // 路由导出