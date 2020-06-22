# 美团外卖项目

## 技术点

了解基本的css和JavaScript语法，了解jQuery的基础语法,使用rem对移动和web进行适配。

采用原生的JavaScript和jQuery来实现页面的交互。项目主要是针对前端。


## 本项目使用一个http-server的静态服务器

 http-server是一个简单的零配置命令行http服务器。它足够强大，足以用于生产用途，

但它既简单又易于破解，可用于测试，本地开发和学习。在这里我提供一个网址`https://www.npmjs.com/package/http-server`介绍了*http-server*的==安装==和==使用==

首页样式:

<div align=center>
    <img src="http://m.qpic.cn/psc?/V10ibBzU4Ickka/lwLYosea*1Tx8aEGf3rTEOGxr.VtZPUP5RT1M6Hn*OR5z3ApTcOTRL46RxehxP1Jgmo7nYVpHp1wN9R9.3EMkC6rg4IVhiTdCtlqTcqAKpU!/b&bo=QAEzAkABMwIDKQw!&rf=viewer_4" width="300"/>
</div>



## 滚动加载页面

<div align=center>
    <img src="http://a1.qpic.cn/psc?/V10ibBzU4Ickka/QBzlzF8iG*2NtSQ2AaEAUn5.4WuQbKRMt1mi*1NKESNFMJ8FgxJfMjt60Z7wsmltXWV47Wc4hfRy6t8o1zywAw!!/b&ek=1&kp=1&pt=0&bo=3ATVAtwE1QIDGTw!&tl=1&vuin=1227813434&tm=1592535600&sce=60-2-2&rf=viewer_4" width="800"/>
</div>

```
 function addEvent(){
        window.addEventListener('scroll',function(){
            //视窗的高度
            var clientHeight = document.documentElement.clientHeight;
            //可滚动的高度
            var scrollHeight = document.body.scrollHeight;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            var proDis = 30;
            if((scrollTop+clientHeight)>=(scrollHeight-proDis)){
                // 最多滚动加载三页
                if(page<3){
                    //在发送ajax请求时避免触发多次滚动加载
                    if(isLoading){
                        return;
                    }
                    getList();
                }else{
                    $('.loading').text('加载完成');
                }
                
            }
        })
    }
```



