// ��ʼ����

var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
//����
var img_bg=new Image();
//����
var img_title=new Image();
//С��
var img_bird=new Image();
//rate
var img_rate=new Image();
//��ʼ
var img_play=new Image();
//����
var img_rank=new Image();
//½��
var img_land=new Image();
//���
var img_bc=new Image();

var stage = 1;             //��Ϸ�׶Σ�1Ϊ�˵���2Ϊ��Ϸ�̳̣�3Ϊ��Ϸ��
var choose = 1;            //С��ͼƬ
var high = 180;            //С��߶�
var position = 120;        //С��λ��
var backgroundOffset = 1.5; // �����ٶ� 
var offset = 0;            // �����ƶ���
var timer1 = null;        //�������
var timer2 = null;        //С�������ƶ�

window.onload = init;  

function init() { 
	draw();  
	timer1 = setInterval(updateLand, 10);                //½��
	timer2 = setInterval(updateBird, 100);                //С��
	//����¼�
	 c.addEventListener("mousedown", doMouseDown, true);  
}

//���λ���ж�
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

//�����Ӧ
function doMouseDown(event) {  
    var x = event.pageX;  
    var y = event.pageY;  
    var canvas = event.target;  
    var loc = getPointOnCanvas(canvas, x, y);  
    console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")");  
    cxt.beginPath();  
    cxt.moveTo(loc.x, loc.y);    
	//���λ���ж�
	
	JudgingPosition(loc.x, loc.y);
} 
//��ȡ����
function getPointOnCanvas(canvas, x, y) {

    var bbox =canvas.getBoundingClientRect();

    return { x: x- bbox.left *(canvas.width / bbox.width),

            y:y - bbox.top  * (canvas.height / bbox.height)
            };
}
//��ͼ
function draw() { 
	//����
//	img_bg.src="img/bg_day.png";
//	img_bg.onload=function(){
//		cxt.drawImage(img_bg,0+offset,0);
//	}
	//����
	img_title.src="img/title.png";
	img_title.onload=function(){
		cxt.drawImage(img_title,55,120);
	}
	//С��
	img_bird.src="img/bird2_0.png";
	img_bird.onload=function(){
		cxt.drawImage(img_bird,position+offset,high);
	} 
	//rate
	img_rate.src="img/button_rate.png";
	img_rate.onload=function(){
		cxt.drawImage(img_rate,107,260);
	}
	//��ʼ
	img_play.src="img/button_play.png";
	img_play.onload=function(){
		cxt.drawImage(img_play,15,340);
	}
	//����
	img_rank.src="img/button_score.png";
	img_rank.onload=function(){
		cxt.drawImage(img_rank,155,340);
	}
	//½��
	img_land.src="img/land.png";
	img_land.onload=function(){
			cxt.drawImage(img_land, 0, 400); // Initially offscreen:
			cxt.drawImage(img_land, 336,400);
	}
	//���
	img_bc.src="img/brand_copyright.png";
	img_bc.onload=function(){
		cxt.drawImage(img_bc,81,420);
	}
}  
var n = 0;
//����
function updateLand() {
	n = offset%288;
	//½�ع���
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
	//С��
	if(choose == 4) {
		img_bird.src="img/bird2_2.png";    //��
		//high = 185;
		high = high + 3;
		choose = 3;
	}
	else if(choose == 1) {
		img_bird.src="img/bird2_0.png";    //��
		//high = 175;
		high = high - 3;
		choose = 2;
	}
	else if(choose == 2){
		img_bird.src="img/bird2_1.png";    //��
		//high = 180;
		high = high + 3;
		choose = 4;
	}else{
		img_bird.src="img/bird2_1.png";    //��
		//high = 180;
		high = high - 3;
		choose = 1;
	}
	//���ԭ������
	cxt.clearRect(position+offset,high,48,48);
}
	 
