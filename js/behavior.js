$(function() {

	function browserRedirect() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
			//跳转移动端页面
			$('.phone-tip').show();
		} else {
			//跳转pc端页面
			$('.phone-tip').hide();
		}
	}
	browserRedirect();

	// 返回首页
	$(".logo").click(function() {
		$("#homepage-body").animate({
			marginTop: '0px'
		}, "slow");
		$("header").css("transform", "rotateX(30deg) translateY(-100%) translateY(6px)");
		$("#homepage").css("transform", "");
		$(".homepage-block").css("opacity", "0");
		$(".homepage-block").css("visibility", "hidden");
		$(".details-page").animate({
			marginLeft: "0"
		}, "slow");
		$(".hovercontact").fadeOut();
	});

	// 首页到作品集
	$(".enter").click(function() {
		var height = $(document).height();
		height = "-" + height + "px";

		$("#homepage-body").animate({
			marginTop: height
		}, "slow");
	});

	// 导航到作品集
	$(".header-portfolio, .header-jinli").click(function() {
		var height = $(document).height();
		height = "-" + height + "px";

		$("#homepage-body").animate({
			marginTop: height
		}, "slow");
		$("header").css("transform", "rotateX(30deg) translateY(-100%) translateY(6px)");
		$("#homepage").css("transform", "");
		$(".homepage-block").css("opacity", "0");
		$(".homepage-block").css("visibility", "hidden");
	});
});
