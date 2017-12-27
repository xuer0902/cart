$(function () {
    $('.container').fullpage({
        /*默认顶部对齐*/
        verticalCentered: false,
        /*右侧导航*/
        navigation: true,
        /*配置纵向每一屏的颜色 数组*/
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        /*滚动完 回调*/
        afterLoad: function (link, index) {
            /*给当前屏幕加载now*/
            $(this).addClass('now');
            /*显示 更多操作区域*/
            if(index==8) {
                //如果滚到了最后一屏,应该叫显示更多隐藏
                $('.more').fadeOut();
            } else {
                $('.more').fadeIn();
            }
        },
        /*离开屏幕的回调*/
        onLeave: function (index, nextIndex, direction) {
            /*隐藏 更多操作区域*/
            $('.more').hide();
            /*当页面在第二屏切换到第三屏的时候*/
            if (index == 2 && nextIndex == 3) {
                $('.section:eq(1) .sofa').addClass('animated');
            }
            //页面从第三屏到第四屏
            if(index==3&&nextIndex==4) {
                $('.section:eq(2) .sofa').addClass('animated');
            }
            //页面从第五屏切换到第六屏
            if(index==5&&nextIndex==6) {
                $('.section:eq(4) .sofa').addClass('animated');
                $('.section:eq(5) .box').addClass('animated');
            }
            //第七屏页面的评价
            if(index==6&&nextIndex==7) {
                $('.section:eq(6) .star img').each(function(i,item) {
                    //因为星星是一个一个出来,所以要加延迟
                    $(item).delay(i*500).fadeIn();
                });
            }

        },
    //    控制屏幕切换的时间
        scrollingSpeed:1000,
    //    第四屏购物车移走之后触发的事件
        afterRender:function() {
            $('.section:eq(3) .cart').on('animationend',function() {
            //文字修改
                $(this).next().find('img:eq(0)').hide();
                //$(this).next().find('img:eq(1)').css('opacity',1);
                $(this).next().find('img:eq(1)').fadeIn('slow');
            //    地址
            //    $('.address').css('opacity',1).find('img:eq(1)').fadeIn();
                $('.section:eq(3) .address').fadeIn(500,'linear',function () {
                    $(this).find('img:eq(1)').fadeIn();
                });
            });
        //    点击更多切换下一屏
            $('.more').on('click',function() {
                $.fn.fullpage.moveSectionDown();
            });
            //第八屏
            //1.手跟着鼠标移动
            //思路:获取鼠标在屏幕上的位置,将这个位置赋值给手
            $('.section:eq(7)').on('mousemove',function(e) {
                //console.log(e.clientX,e.clientY);
                $('.section:eq(7) .hand').css({
                    left: e.clientX-200,
                    top: e.clientY-35
                });
            })
            //2.手移动到开始购物上,切换图片
            //css中实现
            //3.手点击再来一次,回到首页,并且动画可以重新执行
            $('.section:eq(7)').on('click','.again',function() {
                //回到第一屏
                $.fn.fullpage.moveTo(1);
                //将自己加上的类名去掉
                $('.section.now').removeClass('now');
                $('.section').find('.animated').removeClass('animated');
                //去掉所有带有[style]属性的样式
                $('.section').find('[style]').removeAttr('style');
            })
        }
    });
});