(function () {
    var itemTmpl = '<a class="$key btn-item" href="#">'+
                        '<div class="tab-icon"></div>'+
                        '<div class="btn-name">$text</div>'+
                    '</a>';
    function init(){
        var items = [{
            key:'index',
            text:'首页'
        },{
            key:'order',
            text:'订单'
        },{
            key:'my',
            text:'我的'
        }];
        var str='';
        items.forEach(function(item){
            str+=itemTmpl.replace('$key',item.key)
                         .replace('$text',item.text);
        });
        $('.bottom-bar').append($(str));

        //找到当前页面的URL来确定key值
        var arr = window.location.pathname.split('/');
        var page = arr[arr.length-1].replace('.html','');

        //将当前页面对应的key值的a元素设置active的class
        $('a.'+page).addClass('active');

    }
    init();
})();
