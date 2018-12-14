
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

var gap = 80;          //���ӿ��ڴ�С
var gap_x = 0;			//��һ����ӿ���λ��
var gap_y = 0;			//�ڶ�����ӿ���λ��
var pipe_x = 0;		   //��һ�����λ��
var pipe_y = 168;      // �ڶ������λ��
var timer3 = null;    //ˢ����Ϸ����
var timer4 = null;    //����ˮ��
var timer5 = null;    //С������
var timer6 = null;    //��������
var gravity = 0.1;     //С���������ٶ�
var score = 0;         //��Ϸ�÷� 
var score_img = 48;    //��Ϸ�÷�ͼƬ���
var time = 0;
 
 
function Initialization(){
	gap = 100;          //���ӿ��ڴ�С
	gap_x = 0;			//��һ����ӿ���λ��
	gap_y = 0;			//�ڶ�����ӿ���λ��
	pipe_x = 0;		   //��һ�����λ��
	pipe_y = 0;        // �ڶ������λ��
	timer3 = null;    //ˢ����Ϸ����
	timer4 = null;    //����ˮ��
	timer5 = null;    //С������
	timer6 = null;    //��������
	gravity = 0.1;     //С���������ٶ�
	score = 0;         //��Ϸ�÷� 
	score_img = 48;    //��Ϸ�÷�ͼƬ���
	time = 0;
	
	timer1 = setInterval(updateLand, 10);
//	timer3 = setInterval(uodate);
}
//�̳̽���
function getReady(){
	//С��λ��
	high = 230;
	position = 60; 
	//½��
	img_land.src="img/land.png";
	img_land.onload=function(){
		cxt.drawImage(img_land, 0, 400); // Initially offscreen:
		cxt.drawImage(img_land, 336,400);
	}
	//�÷�
	img_score.src="img/font_048.png";
	img_score.onload=function(){
		cxt.drawImage(img_score, 132+offset,80);
	}	
	//��ʼ�ı�
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
//��ʼ��Ϸ
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
//������Ӧ
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
//�����Ӧ
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
//ˢ����Ϸ����
function updateGame(){
	cxt.clearRect(0+offset,0,288,400);
	
	gravity = gravity + 0.05;
	high = high + gravity;
	//����
	cxt.drawImage(img_bird,position+offset,high);
	//������
	producePipe();
	cxt.drawImage(img_pipedown1,0,320-gap_x,52,gap_x,pipe_x,0,52,gap_x);
	cxt.drawImage(img_pipeup1,0,0,52,400-gap-gap_x,pipe_x,gap_x+gap,52,400-gap-gap_x);

	cxt.drawImage(img_pipedown2,0,320-gap_y,52,gap_y,pipe_y,0,52,gap_y);
	cxt.drawImage(img_pipeup2,0,0,52,400-gap-gap_y,pipe_y,gap_y+gap,52,400-gap-gap_y);

	//�ж���Ϸ���
	Judge();
	//���õ÷�
	cxt.drawImage(img_score, 132+offset,80);
	if(score >= 10) cxt.drawImage(img_score_bit, 162+offset,80);
}
//��������
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
//�ж���Ϸ���
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
//��Ϸ����
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
//С������
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
		//������
		cxt.drawImage(img_pipedown1,0,320-gap_x,52,gap_x,pipe_x,0,52,gap_x);
		cxt.drawImage(img_pipeup1,0,0,52,400-gap-gap_x,pipe_x,gap_x+gap,52,400-gap-gap_x);
	
		cxt.drawImage(img_pipedown2,0,320-gap_y,52,gap_y,pipe_y,0,52,gap_y);
		cxt.drawImage(img_pipeup2,0,0,52,400-gap-gap_y,pipe_y,gap_y+gap,52,400-gap-gap_y);
		
		cxt.drawImage(img_bird,position+offset,high);
	}
}
//�÷ֽ���
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
	