import '../css/bootstrap.css'
import '../css/headPage.less'
	// 展开收起导航菜单
let n =1;
$('.IsHideTab').click(function(){
	n++
	if(n%2==0){
		$('.headNav').css({'height':'180px'})
		$(this).css({'top':'190px'})
	}else{
		$('.headNav').css({'height':'0px'})
		$(this).css({'top':'10px'})
	}
})