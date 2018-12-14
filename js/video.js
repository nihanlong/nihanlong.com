$().ready(function() {
	//技能切换
	function changeskill(title, text, img, vedio) {
		$(".n_irt_tit").html(title);
		$(".n_irt_des").html(text);
		$(".n_irt_img").attr("src", img);
		$("#n_audio").attr("src", vedio);
	}
	//播放视频
	$(".game1").click(function() {
		$("#video").attr("src", "video/game1.mp4");
		$("#video").show();
		$("#video")[0].load();
		$(".block").show();
	});
	$(".game2").click(function() {
		$("#video").attr("src", "video/game2.mp4");
		$("#video").show();
		$("#video")[0].load();
		$(".block").show();
	});
	$(".block").click(function() {
		$("#video").hide();
		$("#video")[0].pause();
		$(".block").hide();
	});

});