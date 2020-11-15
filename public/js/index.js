import './library/jquery.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js';
import './library/swiper.min.js';
import './library/jquery.lazyload.js';
import { baseUrl } from './library/config.js';

new Swiper('#banner', {
  loop: true, // 循环模式选项
  effect: 'fade',
  speed: 500,
  autoplay: {
    delay: 2000
  },

  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

new Swiper('#up', {
  direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  speed: 500,
  autoplay: {
    delay: 1000
  }
});

new Swiper('#intro', {
  speed: 500,
  slidesPerView: 5,
  slidesPerGroup: 5,
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    slideChangeTransitionEnd: function () {
      if (this.isEnd) {
        this.navigation.$nextEl.css('display', 'none');
      } else {
        this.navigation.$nextEl.css('display', 'block');
      }
    },
  },
});

new Swiper('#sm-b', {
  loop: true, // 循环模式选项
  speed: 500,
  autoplay: {
    delay: 3000
  },
  effect: 'fade',

  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },

});

// ajax请求

(function () {
  $.ajax({
    type: "get",
    url: `${baseUrl}/product/getProduct`,
    dataType: "json",
    success: function (res) {
      let tempLi = '';
      res.forEach((elm, i) => {
        
        let picture = JSON.parse(elm.picture);

        tempLi += `<li class="fl-l">
        <a href="./html/products.html?id=${elm.id}">
          <img class="lazy" data-original="${picture[0].src}" alt="">
        </a>
      </li>`
      });
      $('.product>.new-pro').append(tempLi);
      $('.lazy').lazyload({
        effect: "fadeIn",
      });
    }
  });
})();


