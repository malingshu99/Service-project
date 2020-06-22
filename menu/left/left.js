(function () {
    //左侧类目item模板字符串
    var itemTmpl = '<div class="left-item">'+
                        '<div class="left-text">$getItemContent</div>'+
                    '</div>';

    //请求数据
    function getList(){
        $.get('../json/food.json',function(data){
            console.log(data);
            // var list = data.data.food_spu_tags ||[];
            window.food_spu_tags = data.data.food_spu_tags ||[];
            initContentList(window.food_spu_tags);

            window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee || 0);
        })
    }
    //渲染item内容
    function getItemContent(data){
        //如果有图片的话就返回文字加图片  否则就返回文字
        if(data.icon){
            return '<img class="item-icon" src='+data.icon+' />'+data.name;//'+data.icon+'单引号可以取图标
        }else{
            return data.name;
        }
    }
    //渲染列表
    function initContentList(list){
        list.forEach(function(item,index){
            var str =  itemTmpl
                .replace('$getItemContent',getItemContent(item));
            //将item数据挂载到left-item上面
            var $target = $(str);
            $target.data('itemData',item);

            $('.left-bar-inner').append($target);
        })
        $('.left-item').first().click();
    }
    //绑定点击事件
    function addClick(){
        $('.left-bar-inner').on('click','.left-item',function(e){
            //转化为jQuery对象
            var $target = $(e.currentTarget);
            $target.addClass('active');
            //清除同级元素的active
            $target.siblings().removeClass('active');

            window.Right.refresh($target.data('itemData'));
        })
    }


    function init(){
        getList();
        addClick();
    }
    init();
})();
