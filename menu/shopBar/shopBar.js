(function () {
    //左侧类目item模板字符串
    var itemTopTmpl = '<div class="choose-content hide">'+
                            '<div class="content-top">'+
                                '<div class="clear-bar">清空购物车</div>'+
                            '</div>'+
                        '</div>';
    var itemBottomTmpl = '<div class="bottom-content">'+
                                '<div class="shop-icon">'+
                                    '<div class="dot-num hide">1</div>'+
                                '</div>'+
                                '<div class="price-content">'+
                                    '<p class="total-price">¥<span class="total-price-span">0</span></p>'+
                                    '<p class="other-price">另需配送&nbsp;¥<span class="shipping-fee">0</span></p>'+
                                '</div>'+
                                '<div class="submit-btn">去结算</div>'+
                        '</div>';
    var $strTop = $(itemTopTmpl);
    var $strBottom = $(itemBottomTmpl);

    function changeShippingPrice(str){
        $strBottom.find('.shipping-fee').text(str);
    }
    function changeTotalPrice(str){
        $strBottom.find('.total-price-span').text(str);
    }

    //渲染购物车顶部
    function renderItems(){
        $strTop.find('.choose-item').remove();
        var list = window.food_spu_tags || [];
        var tmpl = '<div class="choose-item">'+
                        '<div class="item-name">$name</div>'+
                        '<div class="price">¥<span class="total">$price</span></div>'+
                        '<div class="select-content">'+
                            '<div class="minus"></div>'+
                            '<div class="count">$chooseCount</div>'+
                            '<div class="plus"></div>'+
                        '</div>'+
                    '</div>';

        var totalPrice = 0;
        list.forEach(function(item){
            item.spus.forEach(function(_item){
                
                //如果有菜品数量大于0就开始渲染这条数据
                if(_item.chooseCount>0){

                    //计算每个菜品的 总价, 单价*数量
                    var price = _item.min_price * _item.chooseCount;
                    var row = tmpl.replace('$name',_item.name)
                                  .replace('$price',price)
                                  .replace('$chooseCount',_item.chooseCount)
                    
                                  
                    //计算整个总价
                    totalPrice += price;
                    var $row = $(row);
                    $row.data('itemData',_item);
                    $strTop.append($row);
                }
            })
            //改变总价
            changeTotalPrice(totalPrice);
            //改变红点个数
            changeDot();
        })
    }
    //实现购物车红点
    function changeDot(){
        //先拿到所有的count
        var $counts = $strTop.find('.count');
        var total = 0;
        //遍历每个count相加
        for(var i=0;i<$counts.length;i++){
            total+=parseInt($($counts[i]).text());
        }
        if(total>0){
            $('.dot-num').show().text(total);
        }else{
            $('.dot-num').hide();
        }
    }
   function addClick(){
       //点击购物车的时候才会显示点菜详情表
       $('.shop-bar').on('click','.shop-icon',function(){
        $('.mask').toggle();//toggle如果是显示就把他隐藏,
        $strTop.toggle();
       })
       $strTop.on('click','.plus',function(e){
            var $count = $(e.currentTarget).parent().find('.count');
            $count.text(parseInt($count.text()||'0')+1);

            var $item = $(e.currentTarget).parents('.choose-item').first();
            var itemData = $item.data('itemData');
            itemData.chooseCount = itemData.chooseCount+1;

            renderItems();

            //找到当前的右侧详情数据,进行联动
            $('.left-content.active').click();
       })
       $strTop.on('click','.minus',function(e){
            var $count = $(e.currentTarget).parent().find('.count');
            if($count.text()==0) return;
            $count.text(parseInt($count.text()||'0')-1);

            var $item = $(e.currentTarget).parents('.choose-item').first();
            var itemData = $item.data('itemData');
            itemData.chooseCount = itemData.chooseCount-1;

            renderItems();

            //找到当前的右侧详情数据,进行联动
            $('.left-content.active').click();
       })
   }
    function init(data){
        $('.shop-bar').append($strTop);
        $('.shop-bar').append($strBottom);
        addClick();
    }
    init();
    //暴露方法
    window.ShopBar = {
        renderItems: renderItems,
        changeShippingPrice: changeShippingPrice,
        
    }
})();