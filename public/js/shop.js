import './library/jquery.js';
import cookie from './library/cookie.js';
import { baseUrl } from './library/config.js';

(function() {
    let shop = cookie.get('shop');
    console.log(shop,'s');
    
    if (shop) { // 有cookie数据才发请求
        shop = JSON.parse(shop);

        let idList = shop.map(elm => elm.id).join();

        $.ajax({
            type: "get",
            url: `${baseUrl}/product/getItems`,
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                let template = '';
                // console.log(res);
                let sumPrice = 0;
                let jians = 0;
                res.forEach((elm, i) => {
                    // 现在遍历数据时是按照数据库查询得到的结果遍历
                    // cookie中存放的数据 的顺序  和 查询结果的顺序不同
                    // 需要让cookie中的id和查询结果的id 一一对应
                    // 索引不同
                    let arr = shop.filter(val => val.id === elm.id);

                    let picture = JSON.parse(elm.picture);
                    template += `
                        <div class="sc-pro-list clearfix">
                            <label class="checkbox">
                                <input type="checkbox" class="checklist" totaldata="${elm.price*arr[0].num}" name="checklist">
                            </label>
                            <div class="sc-pro-area">
                                <div class="sc-pro-main clearfix">
                                    <a href="#">
                                        <img src="../${picture[1].src}" alt="">
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="#">${elm.title}</a>
                                            <p>夏日彩虹 全网通 6GB+128GB 官方标配</p>
                                            <div class="p-label"><span>分期免息</span></div>
                                        </li>
                                        <li id="p-price"><span>￥</span><span class="pricenum">${(elm.price).toFixed(2)}</span></li>
                                        <li>
                                            <input type="text" class="p-stock-text" value=${arr[0].num} min="1" max="${elm.num}">
                                            <p class="p-stock-btn">
                                                <span class="reduce">−</span>
                                                <span class="add">+</span>
                                            </p>
                                        </li>
                                        <li class="p-price-total"><span>¥</span><span class="p-total">${(elm.price*arr[0].num).toFixed(2)}</span></li>
                                        <li><a href="javascript:;" seed="cart-item-del" class="p-del">删除</a></li>
                                    </ul>
                                </div>
                                <div class="p-service-main">
                                    <div class="p-service-list clearfix">
                                        <div class="p-service-info left">
                                            <label class="checkbox"><input type="checkbox" class="vam"></label>
                                            <div class="service-name">
                                                <span>华为无忧服务</span>
                                            </div>
                                            <div class="service-price">
                                                <span>¥699.00</span>
                                            </div>
                                        </div>
                                        <div class="p-service-link right">
                                            <span>（服务范围大于碎屏服务宝与延长服务宝，不能同时购买）</span>
                                            <a href="/product/10086256421124.html" target="_blank">了解详情</a>
                                        </div>
                                    </div>
                                    <div class="p-service-list clearfix">
                                        <div class="p-service-info left">
                                            <label class="checkbox"><input type="checkbox" class="vam"></label>
                                            <div class="service-name">
                                                <span>碎屏(含后盖)服务宝1年</span>
                                            </div>
                                            <div class="service-price">
                                                <span>¥299.00</span>
                                            </div>
                                        </div>
                                        <div class="p-service-link right">
                                            <span></span>
                                            <a href="/product/10086256421124.html" target="_blank">了解详情</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                });


                let total = `
                    <label class="checkbox"><input readonly="readonly" class="vam checked" type="checkbox" name="totalcheck"> 全选</label>
                    <a href="javascript:;">删除</a></div> <div class="sc-total-btn ">
                    <a href="javascript:;">立即结算</a></div> <div class="sc-total-price">
                    <p class="totals">
                        总计:<label></label>
                        ¥&nbsp;<span></span>
                        <em><b>不含运费</b></em>
                    </p>
                    <div class="total-choose">已选择<em class="totalnums"></em>件商品，优惠:<span>¥&nbsp;0.00</span></div>
                `;

                //利用事件代理实现事件绑定功能 给未来元素添加事件
                $('.shopcar-mains').on('click', function(e) {
                    let target = e.target;
                    // console.dir(target);
                    if (target.name === 'allcheck' || target.name === 'totalcheck') { //当点击到全选按钮时
                        $('.sc-pro-list .checklist').each((index, elm) => { //给每件商品前的复选框设置为选中状态
                            $(elm).attr('checked',true);
                        });
                        getTotalPrice(); //调用总的价格函数
                        getTotalnum(); //调用总的计数函数
                    };
                    if (target.name === 'checklist') {  //当点击到每件商品前的复选框按钮时
                        getTotalPrice(); //调用总的价格函数
                        getTotalnum(); //调用总的计数函数
                    };
                    if (target.className === 'add') {  //当点击加号时
                        let numInput = $(target).parent('.p-stock-btn').prev(); //选中当前元素指定父元素的上一个兄弟元素 商品数量
                        let addnum = Number(numInput.val());
                        addnum++;
                        numInput[0].value = addnum;
                        let pricenum = Number($(target).parent().parent().prev().find('.pricenum').html())*addnum; //计算选中这行商品的总价
                        $(target).parent().parent().next().find('.p-total').html(pricenum);
                        $(target).parents('.sc-pro-list').find('.checklist').attr('totaldata',pricenum);  //给当前选中商品的复选框自定义属性和属性值 让他的属性值与选中商品的总价一样
                        getTotalPrice();
                        getTotalnum();
                    };
                    if (target.className === 'reduce') { //当点击减号时
                        let numInput = $(target).parent('.p-stock-btn').prev();
                        let addnum = Number(numInput.val());
                        if (addnum > 0) {
                            addnum--;
                        };
                        numInput[0].value = addnum;
                        let pricenum = Number($(target).parent().parent().prev().find('.pricenum').html())*addnum;
                        $(target).parent().parent().next().find('.p-total').html(pricenum);
                        $(target).parents('.sc-pro-list').find('.checklist').attr('totaldata',pricenum);
                        getTotalPrice();
                        getTotalnum();
                    };
                });

                $('.sc-total-control').append(total);
                $('.sc-pro').append(template);
                //页面初始化
                getTotalPrice();
                getTotalnum();
            }
        });
    };
    //总价格函数
    function getTotalPrice() {
        let checklist = $('.sc-pro .checklist');
        let sum = 0;
        checklist.each((index, item) => {
            if($(item)[0].checked) {
                sum = sum + Number($(item).attr('totaldata'));
            }
        });
        $('.totals>span').html(sum);
    };
    //总的选择商品数量
    function getTotalnum() {
        let totalnums = $('.p-stock-text');
        let checklist = $('.sc-pro .checklist');
        let sums = 0;
        checklist.each((index, item) => {
            if($(item)[0].checked) {
                sums += Number($(item).parents('.sc-pro-list').find('.p-stock-text').val());
            }
        });
        $('.totalnums').html(sums);
    };
    
})();