/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2019-03-18 17:16:57
 * @version $Id$
 */
import '../css/bootstrap.css'
import '../css/index.less'
import '../css/swiper-3.3.1.min.css'
$(function () {
	// 获取banner
	function GetBanner(id){
		$.ajax({
	        url:  BaseUrl.ScUrl+'/shfp/revision/zspt/columnget/getArticlePage',
	        type: 'post',
	        data: {'pageId':id,'pageIndex':'1','pageSize':'20'},
	        dataType: 'jsonp',
	        jsonp: "callback",
	        success: function (e) {
	        	if(e.statusCode==200){
	        		let data = e.result.informationInfos
	        		for(let i=0;i<data.length;i++){
	        			var html=''
	        			html+='<a href="javascript:;" name ='+data[i].ARTICLE_DYNIAMIC_URL+' class="swiper-slide" style="background:url('+data[i].TITLE_IMAGE_URL+') center center / cover no-repeat;;"></a>'
	        			$('#SidBaner').append(html)
	        		}
	        		var mySwiper = new Swiper('.BannerSw', {
	        			pagination: '.pagesFull',//分页容器的css选择器
        				paginationType : 'custom',//自定义-分页器样式类型（前提）
        				nextButton: '.swiper-button-next',
        				prevButton: '.swiper-button-prev',
				        slidesPerView: 1,
				        paginationClickable: true,
				        spaceBetween: 30,
				        loop: true,
				        autoplay: 8000,
        				autoplayDisableOnInteraction: false,
        				//自定义分页器
        				paginationCustomRender: function (swiper, current, total) {
				            $('.pagesFull').empty()
				            let html =''
				            let Class=""
				            for(let i=1;i<=total;i++){
				            	if(current == i){
				            		html+='<a href="javascript:;" class="swiper-pagination-custom active" name='+i+'><li></li></a>'
				            	}else{
				            		html+='<a href="javascript:;" class="swiper-pagination-custom" name='+i+'><li></li></a>'
				            	}
				            }
				            $('.pagesFull').append(html)
				            $('.pagesFull a').eq(current-1).find('li').animate({'width':'100%'},8000)
				            $('.pagesFull').css({'width':$('.pagesFull a').eq(0).outerWidth(true)*total+'px','left':'50%','marginLeft':-($('.pagesFull a').eq(0).outerWidth(true)*total)/2+'px'})
				        }
				    });
				    //自定义分页器点击
				    $('body').delegate('.pagesFull a','click',function(){
				        var index = $(this).attr('name')
				        mySwiper.slideTo(index, 500, false);//切换到第一个slide，速度为1秒
				    })
	        	}else{
		        	console.log(e)
		        }
	        }
	    })
	}
	GetBanner('363192')
	// 数字滚动函数
	function NumRun(num,el){
		$(el).empty()
		var str='';
		let Numb = num.split('')
		let NumbR =num.split('')
		let NumBr;
		for(let i=0;i<NumbR.length;i++){
			if(isNaN(NumbR[i])!=true){
				NumbR.splice(i,1,i+1)
				NumBr=NumbR
			}
		}
		for(let i=0;i<num.length;i++){
			if(isNaN(Numb[i])==true){
				str +='<div style="width:10px;height:500px;float:left;transition:all .2s ease">';
			}else{
				str +='<div style="width:26px;height:500px;float:left;transition:all .2s ease">';
			}
            for(var j=0;j<10;j++){
            	if(Numb[i]==','){
            		str+='<span style="width:100%;height:50px;display:block;line-height:50px">,</span>';//千字符
            	}else if(Numb[i]==='.'){
            		str+='<span style="width:100%;height:50px;display:block;line-height:50px">.</span>';//千字符
            	}else{
            		str+='<span style="width:100%;height:50px;display:block;line-height:50px">'+Numb[i]+'</span>';
            	}
            }
            str+='</div>';
		}

		$(el).append(str)
		$('.userBox span div').eq($('.userBox span div').length-1).attr('class','ColREs')
	    $('.userBox span div').eq($('.userBox span div').length-2).attr('class','ColREs')
	    $('.Visitbox span div').eq($('.Visitbox span div').length-1).attr('class','ColREs')
	    $('.Visitbox span div').eq($('.Visitbox span div').length-2).attr('class','ColREs')
	    $('.AduserBox span div').eq($('.AduserBox span div').length-1).attr('class','ColREs')
	    $('.AduserBox span div').eq($('.AduserBox span div').length-2).attr('class','ColREs')
		for(var x=0;x<$(el).find('div').length;x++){
            var topPx=Numb[x]*50;
            $(el).find('div').eq(x).animate({'marginTop':-topPx+'px'},30);
        }
	}
	// 累计用户获取
	function getLjUser(){
		$.ajax({
	        url: BaseUrl.ScUrl+'/shfp/newIndexData/increase',
	        type: 'get',
	        data: {},
	        dataType: 'jsonp',
	        successCallback: "callbackparam",
	        success: function (e) {
	           if(e.code==200){
	           		$('.userBox span').text(Public.toThousands(e.value.countUsers/10000))
	           		NumRun(Public.toThousands((e.value.countUsers/10000).toFixed(2)),'.userBox span') 	           }
	        }
	    });
	}
	getLjUser()
	// 访问者数据获取
	function getPageViewData(){
		$.ajax({
	        url: BaseUrl.ScUrl+'/shfp/newIndexData/visit',
	        type: 'post',
	        data: {},
	        dataType: 'jsonp',
	        jsonp: "successCallback",
	        success: function (e) {
	        	if(e.code==200){
	        		// NumRun1(e.value.toString(),'.NumPai')
	        		// $('.Visitbox span').text(public.toThousands(e.value))
	        		let Visitboxs = Public.toThousands((e.value/10000).toFixed(2))
	        		NumRun(Visitboxs,'.Visitbox span')
	        	}
	        }
	    })
	}
	getPageViewData()
	function getDayAdUser(){
		$.ajax({
	        url: BaseUrl.ScUrl+'/shfp/newIndexData/increase',
	        type: 'get',
	        data: {},
	        dataType: 'jsonp',
	        successCallback: "callbackparam",
	        success: function (e) {
	           if(e.code==200){
	           		NumRun(Public.toThousands(e.value.addUsers),'.AduserBox span')
	           }
	        }
	    });
	}
	getDayAdUser()
	let timer =null
	clearInterval(timer)
	timer=setInterval(function(){
		getDayAdUser()
	},10000)
})
