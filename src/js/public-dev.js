/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-03-18 17:17:15
 * @version $Id$
 */
$(function(){
	$("#Headerpage").load("../pages/headerPage.html");
	/**
 *
 * @authors liningning@zgshfp.com.cn
 * @date    2018-05-10 15:18:30
 * @version $Id$
 */
var oldonwheel, oldonmousewheel1, oldonmousewheel2, oldontouchmove, oldonkeydown
        , isDisabled;
Public = {
    //超长限制
    Strb:function(str,num){
       if(str.length>num){
            return str.substring(0,num)+'...'
        }else{
            return str
        }
    },
    // 阻止事件冒泡
    stopEvent:function(event){
        var e=arguments.callee.caller.arguments[0]||event;
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
    },
    //设置cookie
    setCookie:function(cookie_name,value,Path,timeout){
        var date = new Date();
        date.setDate(date.getDate()+timeout);
        var domainStr = ";domain=."+document.domain;
        if(domainStr.indexOf('www.')!=-1){
            domainStr = domainStr.split('www.')[0]+domainStr.split('www.')[1]
        }
        document.cookie = cookie_name+"="+escape(value)+";path"+"="+Path+
        ';expires='+date.toGMTString()+domainStr;
    },
    //获取cookie
    getCookie:function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
    },
    //时间戳转日期格式
    Gtime:function(time,Year,Month,Dat){
        var date = new Date(time);
        Y = date.getFullYear() + Year;
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + Month;
        D = date.getDate() + Dat+' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        var Time = Y+M+D+h+m+s
        return Time
    },
    //日期格式转时间戳
    Htime:function(Stime){
        var date = new Date(Stime)
        var time1 = date.getTime()
        return time1
    },
    //字数限制
    checkLen:function(obj,id,minChars,maxChars){
        //obj==this,id=='监测的需要变化的元素id'，minChars==0,maxChars==最大字数限制
        if (obj.value.length > maxChars)
        obj.value = obj.value.substring(minChars,maxChars);
        var curr = minChars + obj.value.length;
        document.getElementById(id).innerHTML = curr.toString();
    },
    //设置url参数
    setparam:function(param,value){
        var query = location.search.substring(1);
        var p = new RegExp("(^|&"+param+")=[^&]*");
        if(p.test(query)){
            query = query.replace(p,"$1="+value);
            location.search = '?'+query;
        }else{
            if(query == ''){
                location.search = '?'+param+'='+value;
            }else{
                location.search = '?'+query+'&'+param+'='+value;
            }
        }
    },
    //获取url参数
    GetQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = decodeURIComponent(window.location.search).substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    // 层级导航
    Hierarchy:function(data){
        if(data&&data.length!=0){
            var arr = data.reverse()
            var Len = arr.length
            for(var i =0;i<arr.length;i++){
                var $TextA =$('<a href='+arr[i].url+' class="Cetntexta">'+arr[i].Text+'</a><span class="Cetntexts">></span>')
                $('#Hierarchy').prepend($TextA)
            }
            $('#Hierarchy').find('a').eq(Len-1).css({'color':'#4c4c4c'})
        }
    },
    getStyle:function(obj,name){
        return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
    },
    // 时间轴
    TimeAxis:function(id,ClassNameObj,BigCent,data){
        if(data.length!=0){
            Height=$('.'+BigCent).outerHeight()-$('.'+ClassNameObj).eq($('.'+ClassNameObj).length-1).outerHeight()
            console.log($('.'+BigCent).outerHeight())
            var $Span = $('<span class="TImeA" style="height:'+Height+'px"></span>')
            var Classname;
            var StyleS;
            var StyleS1;
            var Arr=[]
            Arr[0]=0
            Arr[1]=$('.'+ClassNameObj).eq(0).outerHeight()
            Arr[2]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()
            Arr[3]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()+$('.'+ClassNameObj).eq(2).outerHeight()
            Arr[4]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()+$('.'+ClassNameObj).eq(2).outerHeight()+$('.'+ClassNameObj).eq(3).outerHeight()
            Arr[5]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()+$('.'+ClassNameObj).eq(2).outerHeight()+$('.'+ClassNameObj).eq(3).outerHeight()+$('.'+ClassNameObj).eq(4).outerHeight()
            Arr[6]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()+$('.'+ClassNameObj).eq(2).outerHeight()+$('.'+ClassNameObj).eq(3).outerHeight()+$('.'+ClassNameObj).eq(4).outerHeight()+$('.'+ClassNameObj).eq(5).outerHeight()
            Arr[7]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()+$('.'+ClassNameObj).eq(2).outerHeight()+$('.'+ClassNameObj).eq(3).outerHeight()+$('.'+ClassNameObj).eq(4).outerHeight()+$('.'+ClassNameObj).eq(5).outerHeight()+$('.'+ClassNameObj).eq(6).outerHeight()
            Arr[8]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()+$('.'+ClassNameObj).eq(2).outerHeight()+$('.'+ClassNameObj).eq(3).outerHeight()+$('.'+ClassNameObj).eq(4).outerHeight()+$('.'+ClassNameObj).eq(5).outerHeight()+$('.'+ClassNameObj).eq(6).outerHeight()+$('.'+ClassNameObj).eq(7).outerHeight()
            Arr[9]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()+$('.'+ClassNameObj).eq(2).outerHeight()+$('.'+ClassNameObj).eq(3).outerHeight()+$('.'+ClassNameObj).eq(4).outerHeight()+$('.'+ClassNameObj).eq(5).outerHeight()+$('.'+ClassNameObj).eq(6).outerHeight()+$('.'+ClassNameObj).eq(7).outerHeight()+$('.'+ClassNameObj).eq(8).outerHeight()
            Arr[10]=$('.'+ClassNameObj).eq(0).outerHeight()+$('.'+ClassNameObj).eq(1).outerHeight()+$('.'+ClassNameObj).eq(2).outerHeight()+$('.'+ClassNameObj).eq(3).outerHeight()+$('.'+ClassNameObj).eq(4).outerHeight()+$('.'+ClassNameObj).eq(5).outerHeight()+$('.'+ClassNameObj).eq(6).outerHeight()+$('.'+ClassNameObj).eq(7).outerHeight()+$('.'+ClassNameObj).eq(8).outerHeight()+$('.'+ClassNameObj).eq(9).outerHeight()
            for(var i =0;i<data.length;i++){

                if(data[i].img=='default'){
                    Classname = 'Defalult'
                    StyleS='top:'+Arr[i]+'px'
                    StyleS1='top:'+Arr[i]+'px'
                }else{
                   Classname ='SpanAs'
                   StyleS='background:url('+data[i].img+');background-size:100%;background-repeat:no-repeat;top:'+Arr[i]+'px'
                   StyleS1='top:'+Arr[i]+'px'
                }
                var $SpanAs = $('<span class='+Classname+' style='+StyleS+'></span>')
                var $TextSpan = $('<span class="TextSapn" style='+StyleS1+'>'+data[i].Text+'</span>')
                $Span.append($SpanAs)
                $Span.append($TextSpan)
            }
            $('#'+id).prepend($Span)
        }
    },
    // 字数监测
    checkLen:function (obj,id,minChars,maxChars){
        //obj==this,id=='监测的需要变化的元素id'，minChars==0,maxChars==最大字数限制
        if (obj.value.length > maxChars)
            obj.value = obj.value.substring(minChars,maxChars);
            var curr = minChars + obj.value.length;
            document.getElementById(id).innerHTML = maxChars-curr.toString();
    },
    // 姓名隐藏
    SubRepleName:function(str){
        var StrA = str.split('')
        if(StrA.length==2){
            StrA.splice(1,1,'*')
            return StrA.join('')
        }else if(StrA.length==3){
            StrA.splice(1,1,'*')
            return StrA.join('')
        }else if(StrA.length==4){
            StrA.splice(1,2,'*')
            return StrA.join('')
        }else if(StrA.length==5){
            StrA.splice(1,3,'*')
            return StrA.join('')
        }
    },
    preventDefault:function(e){
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    },
    preventDefaultForScrollKeys:function(e){
        if (keys[e.keyCode]) {
            public.preventDefault(e);
            return false;
        }
    },
    // 禁止滚动
    disableScroll:function(){
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', public.preventDefault, false);
        oldonwheel = window.onwheel;
        window.onwheel = public.preventDefault; // modern standard

        oldonmousewheel1 = window.onmousewheel;
        window.onmousewheel = public.preventDefault; // older browsers, IE
        oldonmousewheel2 = document.onmousewheel;
        document.onmousewheel = public.preventDefault; // older browsers, IE

        oldontouchmove = window.ontouchmove;
        window.ontouchmove = public.preventDefault; // mobile

        oldonkeydown = document.onkeydown;
        document.onkeydown = public.preventDefaultForScrollKeys;
        isDisabled = true;
    },
    //允许滚动
    enableScroll:function(){
        if (!isDisabled) return;
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', public.preventDefault, false);

        window.onwheel = oldonwheel; // modern standard

        window.onmousewheel = oldonmousewheel1; // older browsers, IE
        document.onmousewheel = oldonmousewheel2; // older browsers, IE

        window.ontouchmove = oldontouchmove; // mobile

        document.onkeydown = oldonkeydown;
        isDisabled = false;
    },
    //错误提示弹窗
    ErroyMessage:function(data){
        var timer =null
        var timeNum=3;
        clearTimeout(timer)
        public.disableScroll()
        //文字提示
        var $Erroybox=$('<div class="ErroyBox" style="width:100%;height:100%;background:rgba(0,0,0,0.5);position:fixed;left:0;top:0;z-index: 999;overflow:hidden;"></div>')
        var $SmallBox =$('<div style="width:400px;height:250px;background:#fff;position: fixed;top:50%;left:50%;margin:-125px 0 0 -200px;border-radius: 4px;box-shadow:0px 9px 17px 0px #666"></div>')
        var $Header = $('<header style="width:100%;height:45px;background:#f47306;border-radius: 4px 4px 0 0"><div style="width:80%;height:45px;line-height:45px;float:left;font-size:15px;color:#fff;padding-left:10px;box-sizing: border-box;">'+data.Title+'</div></header>')
        var $Close =$('<a href="javascript:;" style="width:45px;height:45px;line-height:45px;text-align:center;font-size:30px;color:#fff;float:right">×</a>').on('click',function(){$Erroybox.hide();public.enableScroll();$Erroybox.remove()})
        var $Mess = $('<p style="width:80%;line-height:22px;max-height:230px;margin:0 auto;margin-top:68px;color:#333;font-size:16px;text-align:center">'+data.Message+'</p>')
        var $Repled = $('<a href="" style="width:66px;height:20px;font-size:15px;color:#f47306;display:block;margin:0 auto;margin-top:35px;text-align:center;text-decoration:underline">立即刷新</a>')
        var $Img=$('<div style="width:170px;height:170px;display:block;border:1px solid #eee;padding:10px;border-radius:4px;margin:0 auto;margin-top:25px;" id="Contons"><canvas style="width:170px;height:170px;display:block;" width="170" height="170"></canvas></div>')
        // 图片提示
        if(data.showType&&data.showType=='img'){
            $SmallBox.css({'height':'290px'})
            $($Header).append($Close)
            $($SmallBox).append($Img)
            $($SmallBox).prepend($Header)
            $($Erroybox).append($SmallBox)
            $(data.Parent).append($Erroybox)
        }else{
            $SmallBox.css({'height':'250px'})
            $($Header).append($Close)
            $($SmallBox).append($Mess)
            if(data.IsReplod==true){
                $($SmallBox).append($Repled)
            }
            $($SmallBox).prepend($Header)
            $($Erroybox).append($SmallBox)
            $(data.Parent).append($Erroybox)
        }   
        //是否自动隐藏
        if(data.isTemount){
            if(data.time){
                timeNum=data.time
            }
            if(data.isTemount==true){
                setTimeout(function(){
                    $Erroybox.hide();public.enableScroll();$Erroybox.remove()
                    clearTimeout(timer)
                },timeNum*1000)
            }
        }

        // 调用示例
        // public.ErroyMessage({
        //     Parent:'body',   //默认body，需要添加的父元素（必选）
        //     IsReplod:false,  //是否显示刷新按钮（必选）
        //     isTemount:true,  //是否自动隐藏    （可选）
        //     time:5,          //自动隐藏延时时间，默认3，单位秒（跟随isTemount）
        //     showType:'img',  //显示类型，默认文字提示，为'img'时显示图片（可选）
        //     Title:'错误信息提示',  //提示title（必选）
        //     Message:'网络错误或网络未连接，请刷新重试！'   //提示内容（必选）
        // })
    },
    // loding
    LodingBox:function(data){
        var $LodinBox = $('<div class="InAler" style="width:100%;height:100%;position: fixed;left:0;top:0;background:rgba(0,0,0,0.5);z-index:999999;"><img src="https://www.zgshfp.com.cn/images/DemandIng/loding.gif" alt="" style="width: 100px;height: 100px;margin: 100px auto;position: fixed;top: 50%;left: 50%;margin: -50px 0 0 -50px;z-index: 9999999"></div>')
        if(data.Isshow==true){
            $(data.Parent).append($LodinBox)
            $(data.Parent).find('.InAler').show()
            public.disableScroll()
        }else if(data.Isshow==false){
            public.enableScroll()
            $(data.Parent).find('.InAler').hide()
        }


    },
    //number
    displayResult:function(that){
        if(that.value>999999999){
            that.value=999999999
        }
        if(that.value.length==1){
            that.value=that.value.replace(/[^1-9]/g,'')
        }else{
            that.value=that.value.replace(/\D/g,'')
        }
    },
    //时间戳转换为几天前
    getDateDiff:function(dateTimeStamp){
      var result;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){
        return;
      }
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(monthC>=1){
            if(monthC<=12)
                result="" + parseInt(monthC) + "月前";
            else{
                result="" + parseInt(monthC/12) + "年前";
            }
        }else if(weekC>=1){
            result="" + parseInt(weekC) + "周前";
        }else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
        }else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else{
            result="刚刚";
      }
        return result;
    },
    // 数字每三位加逗号
    toThousands:function(nStr) {
        nStr += '';
         x = nStr.split('.');
         x1 = x[0];
         x2 = x.length > 1 ? '.' + x[1] : '';
         var rgx = /(\d+)(\d{3})/;
         while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
         }
         return x1 + x2;
         },
         replaceStr:function(content){
            var reg = /习近平班底|中国末代接班群第六代|江泽民|茉莉花革命|习近平|操纵十八大|毛泽东|中共九十年功罪|政权保卫战|枪|法轮功|赖昌星|邓小平|信用卡套现|轻松筹|水滴筹|腾讯公益|爱心筹|骗子|水滴互助|小姐|卖淫/g;
            var showC = content.replace(reg,function( $reg ){
                var r = '';
                for ( var i=0;i<$reg.length;i++ )
                {
                    r += '*';
                }
                return r;
            })
            return showC;
        },
        dateDiff :function (timestamp) {
            // 补全为13位
            var arrTimestamp = (timestamp + '').split('');
            for (var start = 0; start < 13; start++) {
                if (!arrTimestamp[start]) {
                    arrTimestamp[start] = '0';
                }
            }
            timestamp = arrTimestamp.join('') * 1;

            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - timestamp;

            // 如果本地时间反而小于变量时间
            if (diffValue < 0) {
                return '刚刚';
            }

            // 计算差异时间的量级
            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;

            // 数值补0方法
            var zero = function (value) {
                if (value < 10) {
                    return '0' + value;
                }
                return value;
            };

            // 使用
            if (monthC > 12) {
                // 超过1年，直接显示年月日
                return (function () {
                    var date = new Date(timestamp);
                    return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
                })();
            } else if (monthC >= 1) {
                return parseInt(monthC) + "月前";
            } else if (weekC >= 1) {
                return parseInt(weekC) + "周前";
            } else if (dayC >= 1) {
                return parseInt(dayC) + "天前";
            } else if (hourC >= 1) {
                return parseInt(hourC) + "小时前";
            } else if (minC >= 1) {
                return parseInt(minC) + "分钟前";
            }
            return '刚刚';
        }
}

})