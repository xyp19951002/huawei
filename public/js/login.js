import './library/jquery.js';
import './library/jquery.md5.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js';
import { baseUrl } from './library/config.js';
import cookie from './library/cookie.js';

// 表单验证
$(function() {
    let phReg = /^1[3-9]\d{9}/; //手机正则
    let pasReg = /^[0-9a-zA-Z]{6,16}$/; // 密码正则
    let email = /^[A-z]\w{5,15}@[A-z0-9-]{2,}\.[A-z]{2,7}\.?[A-z]*$/; // 邮件正则

    $('[type=text]').on('input', function(e) {
        let target = e.target;
        if (target.type === 'text') {
            // 表单验证提示文字 清空,防止叠加累积
            $('.phtext').empty();
            if(phReg.test($('[type=text]').val())) {
                $('.phtext').append(`<span>手机号可登录</span>`);
            } else {
                $('.phtext').append(`<span style="color:red">用户名不存在</span>`);
            };
        } else if (target.type === 'password') {
            $('.pastext').empty();
            if (pasReg.test($('[type=password]').val())) {
                $('.pastext').append('<span></span>');
            } else {
                $('.pastext').append('<span style="color:red">密码输入错误</span>');
            }
        }
    })
});

$('[type=button]').on('click', function() {
    let password = $.md5($('[type=password]').val());

    $.ajax({
        type: "post",
        url: `${baseUrl}/users/login`,
        data: {
            password: password,
            phone: $('[type=text]').val(),
        },
        dataType: "json",
        success: function(res) {
            res.forEach(item => {
                if (String(item.user_phone) === $('[type=text]').val()) {
                   alert('登录成功');
                   window.location.href = '/';
                }
            })
        }
    });
});