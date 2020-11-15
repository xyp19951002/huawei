import './library/jquery.js';
import './library/jquery.md5.js';
import { baseUrl } from './library/config.js';
import cookie from './library/cookie.js';

$(function() {
    let phoneReg = /^1[3-9]\d{9}/;
    let pasdReg = /^[0-9a-zA-Z]{6,16}$/;
    let email = /^[A-z]\w{5,15}@[A-z0-9-]{2,}\.[A-z]{2,7}\.?[A-z]*$/;

    $('.hwid-pwdlogin-root').on('input', function(e) {
        let target = e.target;
        if (target.name === 'phone') {
            $('.phoneinfo').empty();
            if(phoneReg.test($('[name=phone]').val())) {
                $('.phoneinfo').append(`<span>*&nbsp;&nbsp;手机号码输入正确</span>`);
            } else {
                $('.phoneinfo').append(`<span style="color:red">*&nbsp;&nbsp;输入错误</span>`);
            };
        } else if (target.name === 'password') {
            $('.psdinfo').empty();
            if (pasdReg.test($('[name=password]').val())) {
                $('.psdinfo').append('<span></span>');
            } else {
                $('.psdinfo').append('<span style="color:red">密码输入错误</span>');
            }
        }
    })
});

$('.login-btn').on('click', function() {
    let password = $.md5($('[name=password]').val());

    $.ajax({
        type: "post",
        url: `${baseUrl}/users/login`,
        data: {
            password: password,
            phone: $('[name=phone]').val(),
        },
        dataType: "json",
        success: function(res) {
            console.log(res);
            res.forEach(item => {
                if (String(item.user_phone) === $('[name=phone]').val()) {
                   alert('登录成功');
                   window.location.href = '/';
                }
            })
        }
    });
});