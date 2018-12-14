$(function() {

	//获取屏幕高度
	var height = $(document).height();
	height += "px"
	$("#homepage-body").css("height", height);
	// header显示与隐藏动画
	/* 
	 * header：头部
	 * homepage：页面主体
	 * homepage-block：页面遮罩层
	 */
	$(".barre").mouseenter(function() {
		$("header").css("transform", "rotateX(0deg)");
		$("#homepage").css("transform", "translateY(70px) rotateX(-15deg)");
		$(".homepage-block").css("visibility", "visible");
		$(".homepage-block").css("opacity", "1");

	});
	$("#homepage").mouseenter(function() {
		$("header").css("transform", "rotateX(30deg) translateY(-100%) translateY(6px)");
		$("#homepage").css("transform", "");
		$(".homepage-block").css("opacity", "0");
		$(".homepage-block").css("visibility", "hidden");
		$(".hovercontact").fadeOut();
	});

	//联系我
	$("#header-list li:first").click(function() {
		$(".hovercontact").fadeIn();
	});
	// 动画移动

	// Declare parallax on layers
	//jQuery('.parallax-layer').parallax({
	//	mouseport: jQuery("#scene")
	//});

	$('#scene .parallax-layer').parallax({
		mouseport: $('#scene')
	});

});