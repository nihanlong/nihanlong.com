
var img_score = new Image();
var img_score_bit = new Image();
var img_txtGR = new Image();
var img_pipeup1 = new Image();
var img_pipedown1 = new Image();
var img_pipeup2 = new Image();
var img_pipedown2 = new Image();
var img_tutorial = new Image();
var img_score_panel = new Image();
var img_text_game_over = new Image();

var gap = 80;          //管子开口大小
var gap_x = 0;			//第一组管子开口位置
var gap_y = 0;			//第二组管子开口位置
var pipe_x = 0;		   //第一组管子位置
var pipe_y = 168;      // 第二组管子位置
var timer3 = null;    //刷新游戏界面
var timer4 = null;    //产生水管
var timer5 = null;    //小鸟下落
var timer6 = null;    //结束动画
var gravity = 0.1;     //小鸟重力加速度
var score = 0;         //游戏得分 
var score_img = 48;    //游戏得分图片编号
var time = 0;
 
 
function Initialization(){
	gap = 100;          //管子开口大小
	gap_x = 0;			//第一组管子开口位置
	gap_y = 0;			//第二组管子开口位置
	pipe_x = 0;		   //第一组管子位置
	pipe_y = 0;        // 第二组管子位置
	timer3 = null;    //刷新游戏界面
	timer4 = null;    //产生水管
	timer5 = null;    //小鸟下落
	timer6 = null;    //结束动画
	gravity = 0.1;     //小鸟重力加速度
	score = 0;         //游戏得分 
	score_img = 48;    //游戏得分图片编号
	time = 0;
	
	timer1 = setInterval(updateLand, 10);
//	timer3 = setInterval(uodate);
}
//教程界面
function getReady(){
	//小鸟位置
	high = 230;
	position = 60; 
	//陆地
	img_land.src="img/land.png";
	img_land.onload=function(){
		cxt.drawImage(img_land, 0, 400); // Initially offscreen:
		cxt.drawImage(img_land, 336,400);
	}
	//得分
	img_score.src="img/font_048.png";
	img_score.onload=function(){
		cxt.drawImage(img_score, 132+offset,80);
	}	
	//开始文本
	img_txtGR.src="img/text_ready.png";
	img_txtGR.onload=function(){
		cxt.drawImage(img_txtGR, 46+offset,150);
	}	
	//tutorial
	img_tutorial.src="img/tutorial.png";
	img_tutorial.onload=function(){
		cxt.drawImage(img_tutorial, 87+offset,230);
	}	
}
//开始游戏
function startGame(){	
	img_pipedown1.src="img/pipe_down.png";
	img_pipeup1.src="img/pipe_up.png";
	img_pipedown2.src="img/pipe_down.png";
	img_pipeup2.src="img/pipe_up.png";
	img_score_panel.src="img/score_panel.png";
    img_text_game_over.src="img/text_game_over.png";
	
	pipe_x = offset +288;
	pipe_y = offset + 456;
	gap_x = Math.floor(Math.random()*200+50);
	gap_y = Math.floor(Math.random()*200+50);
	cxt.clearRect(0 + offset,150,offset,250);
	window.clearInterval(timer2);
	timer3 = setInterval(updateGame,10);
	window.addEventListener('keydown', doKeyDown,true);
 	document.addEventListener('touchstart',touch, false);
}
//触摸响应
function touch (event){  
	var event = event || window.event;
	if(stage == 3){
		var audio_wing = document.createElement('audio') ;
    	audio_wing.src = "music/sfx_wing.ogg" ;
    	audio_wing.play();
		gravity = -2;
	}
	if(stage == 1 || stage == 4){
		if(x>15 && x<125 && y>340 && y<410 ){
			//window.clearInterval(timer2);
			cxt.clearRect(offset,0,512,512);
			
			if(stage == 4) Initialization();
			stage = 2;
			getReady();
		}
	}else if(stage == 2){
		stage = 3;
		startGame();
	}
} 
//点击响应
function doKeyDown(e){
	var keyID = e.keyCode ? e.keyCode :e.which;  
	
	if( keyID == 32){
		if(stage == 3){
			var audio_wing = document.createElement('audio') ;
    		audio_wing.src = "music/sfx_wing.ogg" ;
    		audio_wing.play();
		}
		gravity = -2;
	}
}
//刷新游戏界面
function updateGame(){
	cxt.clearRect(0+offset,0,288,400);
	
	gravity = gravity + 0.05;
	high = high + gravity;
	//画鸟
	cxt.drawImage(img_bird,position+offset,high);
	//画管子
	producePipe();
	cxt.drawImage(img_pipedown1,0,320-gap_x,52,gap_x,pipe_x,0,52,gap_x);
	cxt.drawImage(img_pipeup1,0,0,52,400-gap-gap_x,pipe_x,gap_x+gap,52,400-gap-gap_x);

	cxt.drawImage(img_pipedown2,0,320-gap_y,52,gap_y,pipe_y,0,52,gap_y);
	cxt.drawImage(img_pipeup2,0,0,52,400-gap-gap_y,pipe_y,gap_y+gap,52,400-gap-gap_y);

	//判断游戏结果
	Judge();
	//设置得分
	cxt.drawImage(img_score, 132+offset,80);
	if(score >= 10) cxt.drawImage(img_score_bit, 162+offset,80);
}
//产生管子
function producePipe(){
	if(pipe_x < offset - 52){
		pipe_x = offset + 288;
		gap_x = Math.floor(Math.random()*200+50);
	}	
	if(pipe_y < offset - 52){
		pipe_y = offset + 288;
		gap_y = Math.floor(Math.random()*200+50);
	}	
}
//判断游戏结果
function Judge(){
	if(high >360){
		gameOver();
	}
	if( position+offset+40 > pipe_x && position+offset < pipe_x + 52){
		if(high + 12< gap_x || high + 36 > gap_x + gap ){
			gameOver();
		}
		if(position+offset > pipe_x +52-backgroundOffset){
			score ++;
			var audio_point = document.createElement('audio') ;
      	    audio_point.src = "music/sfx_point.ogg" ;
      		audio_point.play();
			if(score<10){
				score_img++;
				img_score.src="img/font_0"+score_img+".png";
			}else{
				score_img = 48 + parseInt(score/10);
				img_score.src="img/font_0"+score_img+".png";
				score_img = 48 + score - parseInt(score/10)*10;
				img_score_bit.src="img/font_0"+score_img+".png";
				
			}
		}
	}
	if( position+offset+40 > pipe_y && position+offset < pipe_y + 52 && pipe_y > 168){
		if(high + 12< gap_y || high + 36 > gap_y + gap ){
			gameOver();
		}
		if(position+offset > pipe_y +52-backgroundOffset){
			score ++;
			var audio_point = document.createElement('audio') ;
      	    audio_point.src = "music/sfx_point.ogg" ;
      		audio_point.play();
			if(score<10){
				score_img++;
				img_score.src="img/font_0"+score_img+".png";
			}
			else{
				score_img = 48 + parseInt(score/10);
				img_score.src="img/font_0"+score_img+".png";
				score_img = 48 + score - parseInt(score/10)*10;
				img_score_bit.src="img/font_0"+score_img+".png";
			}
		}
	}
}
//游戏结束
function gameOver(){
	var audio_hit = document.createElement('audio') ;
    audio_hit.src = "music/sfx_hit.ogg" ;
    audio_hit.play();
	var audio_die = document.createElement('audio') ;
    audio_die.src = "music/sfx_die.ogg" ;
    audio_die.play();
	window.clearInterval(timer1);
	window.clearInterval(timer3);
	timer5 = setInterval(birdDrop,10);
	stage = 4;
}
//小鸟下落
function birdDrop(){
	if(high > 360){
		window.clearInterval(timer5);
		cxt.clearRect(132+offset,80,80,44);
		cxt.drawImage(img_pipedown1,0,320-gap_x,52,gap_x,pipe_x,0,52,gap_x);
		cxt.drawImage(img_pipeup1,0,0,52,400-gap-gap_x,pipe_x,gap_x+gap,52,400-gap-gap_x);
	
		cxt.drawImage(img_pipedown2,0,320-gap_y,52,gap_y,pipe_y,0,52,gap_y);
		cxt.drawImage(img_pipeup2,0,0,52,400-gap-gap_y,pipe_y,gap_y+gap,52,400-gap-gap_y);
		timer6 = setInterval(displayScore,10);
	}else{
		high = high + 8;
		cxt.clearRect(position+offset,high,40,40);
		//画管子
		cxt.drawImage(img_pipedown1,0,320-gap_x,52,gap_x,pipe_x,0,52,gap_x);
		cxt.drawImage(img_pipeup1,0,0,52,400-gap-gap_x,pipe_x,gap_x+gap,52,400-gap-gap_x);
	
		cxt.drawImage(img_pipedown2,0,320-gap_y,52,gap_y,pipe_y,0,52,gap_y);
		cxt.drawImage(img_pipeup2,0,0,52,400-gap-gap_y,pipe_y,gap_y+gap,52,400-gap-gap_y);
		
		cxt.drawImage(img_bird,position+offset,high);
	}
}
//得分界面
function displayScore(){
	time = time + 10;
	
	cxt.drawImage(img_text_game_over, 46+offset,120);
	if( time > 500) cxt.drawImage(img_score_panel, 25+offset,200);
	if( time > 1000) {
		cxt.drawImage(img_play,15+offset,340);
		cxt.drawImage(img_rank,155+offset,340);	
		window.clearInterval(timer6);
	}
	
}
	