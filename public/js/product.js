import './library/jquery.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js';
import './library/swiper.min.js';
import './library/jquery.lazyload.js';
import './library/huawei.js';
import { baseUrl } from './library/config.js';

$('.lazy').lazyload({
  effect: "fadeIn",
});

(function () {
  let id = location.search.split('=')[1];

  $.ajax({
    type: "get",
    url: `${baseUrl}/product/getItems`,
    data: { id: id },
    dataType: "json",
    success: function (res) {
      res = res[0];
      let picture = JSON.parse(res.picture);
      let promotion = JSON.parse(res.promotion);
      let productdetail = JSON.parse(res.productdetail);
      let template1 = `
      <div>
      <a href="#" title="首页">首页</a>&nbsp;&gt;&nbsp;
      <a href="#" title="手机">手机</a>&nbsp;&gt;&nbsp;
      <a href="#" title="HUAWEI Mate系列">HUAWEI Mate系列</a>&nbsp;&gt;&nbsp;
      <span>${res.head}</span>
    </div>
      `;

      $('.hd-sm').append(template1);

      let template2 = `
      <p class="main-title">${res.title}</p>
      <p class="next-title">
        <a href="#">${res.subtitle}</a>
      </p>
      <div class="pro-more">
        <div class="pro-more-in">
          <div class="price">
            <span class="text">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
            <span class="sym mar-l">￥</span><span class="mon">${res.price}</span>
          </div>
          <div class="sale clearfix">
            <span class="text fl-l">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <p class="red-box fl-l mar-l">${promotion[0].t1}</p>
            <span class="content">&nbsp;&nbsp;&nbsp;&nbsp;${promotion[0].t2}</span>
          </div>
          <div class="pro-free clearfix">
            <p class="red-box fl-l mar-l">${promotion[1].t1}</p>
            <span class="content">&nbsp;&nbsp;&nbsp;&nbsp;${promotion[1].t2}</span>
          </div>
          <div class="pro-paper clearfix">
            <p class="red-box fl-l mar-l">商券赠免</p>
            <span class="content">&nbsp;&nbsp;&nbsp;&nbsp;购机赠荣耀新品手表优惠券 </span>
          </div>
          <div class="pro-paper clearfix">
            <p class="red-box fl-l mar-l">赠送积分</p>
            <span class="content">&nbsp;&nbsp;&nbsp;&nbsp;购买即赠商城积分，积分可抵现~ </span>
          </div>
        </div>
      </div>
      <div class="pro-serve">
        <div class="serve1 clearfix">
          <span class="text fl-l">服务说明&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <p class="box fl-l">浙江 > 杭州 > 江干</p>
          <span class="content">&nbsp;&nbsp;&nbsp;&nbsp;现货</span>
        </div>
        <div class="serve2 clearfix">
          <span class="fl-l iconfont icon-duihao"></span><span
            class="fl-l">&nbsp;已满48元已免运费&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span class="fl-l iconfont icon-duihao"></span><span class="fl-l">&nbsp;由华为商城负责发货，并提供售后服务</span>
        </div>
        <div class="serve3">
          <div class="serve1 clearfix">
            <span class="text fl-l">商品编号&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="mar-l">2601010230407</span>
          </div>
        </div>
        <div class="serve4 clearfix">
          <span class="text fl-l">选择颜色&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <div class="fl-l phone-co mar-l">
            <img src="../img/phone-co-1.png" alt="">&nbsp;&nbsp;<span>幻夜黑</span>
          </div>
          <div class="fl-l phone-co">
            <img src="../img/phone-co-2.png" alt="">&nbsp;&nbsp;<span>翡冷翠</span>
          </div>
          <div class="fl-l phone-co">
            <img src="../img/phone-co-3.png" alt="">&nbsp;&nbsp;<span>星河银</span>
          </div>
          <div class="fl-l phone-co">
            <img src="../img/phone-co-4.png" alt="">&nbsp;&nbsp;<span>樱雪晴空</span>
          </div>
        </div>
        <div class="serve5 clearfix">
          <span class="text fl-l">选择版本&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <p class="box fl-l mar-l">5G全网通 6GB+128GB</p>
          <p class="box fl-l">5G全网通 8GB+128GB</p>
        </div>
        <div class="serve6 clearfix">
          <span class="text fl-l">选择套餐&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <p class="box fl-l mar-l">官方标配</p>
        </div>
        <div class="serve7 clearfix">
          <span class="text fl-l">推荐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <p class="box fl-l mar-l">华为畅享20 5G</p>
          <p class="box fl-l">华为畅享20 Pro 5G</p>
          <p class="box fl-l">华为畅享Z 5G</p>
        </div>
        <div class="serve8">
          <span class="text">已选择商品:</span>
          <span class="mar-l">星河银 / 5G全网通 6GB+128GB / 官方标配</span>
        </div>
        <div class="serve-last clearfix">
          <div class="squire clearfix fl-l">
            <div class="count fl-l">1</div>
            <div class="plus fl-l">+</div>
            <div class="minus fl-l">-</div>
          </div>
          <a href="#">
            <p class="joincar fl-l">加入购物车</p>
          </a>
          <a href="#">
            <p class="rightnow fl-l">立即下单</p>
          </a>
        </div>
      </div>
      `;
      $('.right-intro').append(template2);

      productdetail.forEach((elm, i) => {
        let template3 = ``;
        template3 += `
      <img class="lazy" data-original="${elm.src}" alt="">
      `;
        $('#product-de').append(template3);
        $('.lazy').lazyload({
          effect: "fadeIn",
        });
      });
    }
  });
})();