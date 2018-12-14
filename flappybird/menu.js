// 开始画面

var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
//背景
var img_bg=new Image();
//标题
var img_title=new Image();
//小鸟
var img_bird=new Image();
//rate
var img_rate=new Image();
//开始
var img_play=new Image();
//排行
var img_rank=new Image();
//陆地
var img_land=new Image();
//编号
var img_bc=new Image();

var stage = 1;             //游戏阶段，1为菜单，2为游戏教程，3为游戏中
var choose = 1;            //小鸟图片
var high = 180;            //小鸟高度
var position = 120;        //小鸟位置
var backgroundOffset = 1.5; // 滚动速度 
var offset = 0;            // 坐标移动数
var timer1 = null;        //地面滚动
var timer2 = null;        //小鸟上下移动

window.onload = init;  

function init() { 
	draw();  
	timer1 = setInterval(updateLand, 10);                //陆地
	timer2 = setInterval(updateBird, 100);                //小鸟
	//点击事件
	 c.addEventListener("mousedown", doMouseDown, true);  
}

//点击位置判断
function JudgingPosition(x,y){
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
function doMouseDown(event) {  
    var x = event.pageX;  
    var y = event.pageY;  
    var canvas = event.target;  
    var loc = getPointOnCanvas(canvas, x, y);  
    console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")");  
    cxt.beginPath();  
    cxt.moveTo(loc.x, loc.y);    
	//点击位置判断
	
	JudgingPosition(loc.x, loc.y);
} 
//获取坐标
function getPointOnCanvas(canvas, x, y) {

    var bbox =canvas.getBoundingClientRect();

    return { x: x- bbox.left *(canvas.width / bbox.width),

            y:y - bbox.top  * (canvas.height / bbox.height)
            };
}
//绘图
function draw() { 
	//背景
//	img_bg.src="img/bg_day.png";
//	img_bg.onload=function(){
//		cxt.drawImage(img_bg,0+offset,0);
//	}
	//标题
	img_title.src="img/title.png";
	img_title.onload=function(){
		cxt.drawImage(img_title,55,120);
	}
	//小鸟
	img_bird.src="img/bird2_0.png";
	img_bird.onload=function(){
		cxt.drawImage(img_bird,position+offset,high);
	} 
	//rate
	img_rate.src="img/button_rate.png";
	img_rate.onload=function(){
		cxt.drawImage(img_rate,107,260);
	}
	//开始
	img_play.src="img/button_play.png";
	img_play.onload=function(){
		cxt.drawImage(img_play,15,340);
	}
	//排行
	img_rank.src="img/button_score.png";
	img_rank.onload=function(){
		cxt.drawImage(img_rank,155,340);
	}
	//陆地
	img_land.src="img/land.png";
	img_land.onload=function(){
			cxt.drawImage(img_land, 0, 400); // Initially offscreen:
			cxt.drawImage(img_land, 336,400);
	}
	//编号
	img_bc.src="img/brand_copyright.png";
	img_bc.onload=function(){
		cxt.drawImage(img_bc,81,420);
	}
}  
var n = 0;
//动画
function updateLand() {
	n = offset%288;
	//陆地滚动
	cxt.translate(-backgroundOffset, 0); // Initially onscreen:
	cxt.drawImage(img_land, offset-n, 400); // Initially offscreen:
	cxt.drawImage(img_land, offset-n+288,400);
	offset = offset + backgroundOffset;
	if(stage == 1) cxt.drawImage(img_bc,81+offset,420);
//	if(offset > 336){
//		cxt.translate(offset, 0);
//		offset = 0;
//	}
}
function updateBird() {
	//小鸟
	if(choose == 4) {
		img_bird.src="img/bird2_2.png";    //下
		//high = 185;
		high = high + 3;
		choose = 3;
	}
	else if(choose == 1) {
		img_bird.src="img/bird2_0.png";    //上
		//high = 175;
		high = high - 3;
		choose = 2;
	}
	else if(choose == 2){
		img_bird.src="img/bird2_1.png";    //中
		//high = 180;
		high = high + 3;
		choose = 4;
	}else{
		img_bird.src="img/bird2_1.png";    //中
		//high = 180;
		high = high - 3;
		choose = 1;
	}
	//清除原来的鸟
	cxt.clearRect(position+offset,high,48,48);
}
	 
