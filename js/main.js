var storage = window.localStorage;
init(10, "mySigma", 800, 580, main);
var shapeArray = [[[5, 0], [55, 0], [60, 5], [60, 55], [55, 60], [5, 60], [0, 55], [0, 5]]];
var backLayer, cLayer, wallLayer, bitmap, loadingLayer, boxArray, scoreBoard, numberBoard, recordBoard, ruleBoard, continueRight = 0, gameStart = false, gameControl, highScore;
var imglist = {};
var imgData = new Array({
	name : "1",
	path : "img/mid/1.jpg"
}, {
	name : "2",
	path : "img/mid/2.jpg"
}, {
	name : "3",
	path : "img/mid/3.jpg"
}, {
	name : "4",
	path : "img/mid/4.jpg"
}, {
	name : "5",
	path : "img/mid/5.jpg"
}, {
	name : "6",
	path : "img/mid/6.jpg"
}, {
	name : "7",
	path : "img/mid/7.jpg"
}, {
	name : "8",
	path : "img/mid/8.jpg"
}, {
	name : "9",
	path : "img/mid/9.jpg"
}, {
	name : "o1",
	path : "img/mid/o1.jpg"
}, {
	name : "o2",
	path : "img/mid/o2.jpg"
}, {
	name : "o3",
	path : "img/mid/o3.jpg"
}, {
	name : "o4",
	path : "img/mid/o4.jpg"
}, {
	name : "o5",
	path : "img/mid/o5.jpg"
}, {
	name : "o6",
	path : "img/mid/o6.jpg"
}, {
	name : "o7",
	path : "img/mid/o7.jpg"
}, {
	name : "o8",
	path : "img/mid/o8.jpg"
}, {
	name : "o9",
	path : "img/mid/o9.jpg"
}, {
	name : "front",
	path : "img/front.png"
}, {
	name : "board",
	path : "img/board.png"
}, {
	name : "transparent",
	path : "img/transparent.png"
});
function drawBorder() {
	wallLayer = new LSprite();
	//sides
	wallLayer.graphics.drawRect(10, "#000000", [0, 0, 800, 580], true, "#cccc80");
	wallLayer.alpha = 0.3;
	backLayer.addChild(wallLayer);
	wallLayer = new LSprite();
	//left
	wallLayer.x = 0;
	wallLayer.y = 290;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(10, 580, 0);
	wallLayer = new LSprite();
	//down
	wallLayer.x = 400;
	wallLayer.y = 580;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(800, 10, 0);
	wallLayer = new LSprite();
	//down
	wallLayer.x = 280;
	wallLayer.y = 565;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(560, 10, 0, 1, 0.4, 0.2);
	wallLayer = new LSprite();
	//right
	wallLayer.x = 800;
	wallLayer.y = 290;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(10, 580, 0);
	wallLayer = new LSprite();
	//mid
	wallLayer.x = 562;
	wallLayer.y = 290;
	backLayer.addChild(wallLayer);
	wallLayer.addBodyPolygon(10, 580, 0);

	for (var i = 1; i < 9; i++) {
		wallLayer.x = 61 * i + 6;
		wallLayer.y = 0;
		backLayer.addChild(wallLayer);
		wallLayer.addBodyPolygon(0, 1060, 0);
		wallLayer = new LSprite();
	}

	box01 = new LSprite();
	box01.x = 00;
	box01.y = 00;
	backLayer.addChild(box01);
	box01.addBodyCircle(2, 0, 0, 0, 1, 0.4, 0.2);
	box02 = new LSprite();
	box02.x = 680;
	box02.y = 0;
	backLayer.addChild(box02);
	box02.addBodyCircle(10, 0, 0, 1, 0.5, 0.4, 0.2);
	cLayer = new LSprite();
	cLayer.x = 680;
	cLayer.y = 85;
	backLayer.addChild(cLayer);
	bitmap = new LBitmap(new LBitmapData(imglist["board"]));
	bitmap.x = -18;
	bitmap.y = -55;
	cLayer.addChild(bitmap);
	cLayer.addBodyPolygon(157, 48, 1, 0.1, 1, 0.2);
	LGlobal.box2d.setWeldJoint(box02.box2dBody, cLayer.box2dBody);
	LGlobal.box2d.setRevoluteJoint(box01.box2dBody, box02.box2dBody);
	recordBoard = new LTextField();
	recordBoard.size = 22;
	recordBoard.y = -8;
	recordBoard.color = "#000000";
	highScore = parseInt(storage.getItem("MySigma"));
	if (!highScore)
		highScore = 0;
	recordBoard.text = "Record: " + highScore;
	cLayer.addChild(recordBoard);
	scoreBoard = new LTextField();
	scoreBoard.size = 22;
	scoreBoard.y = 60;
	scoreBoard.color = "#000000";
	scoreBoard.text = "Score: 0";
	cLayer.addChild(scoreBoard);
	numberBoard = new LTextField();
	numberBoard.size = 22;
	numberBoard.y = 128;
	numberBoard.color = "#0000FF";
	numberBoard.text = "Your Σ: 0";
	cLayer.addChild(numberBoard);
	gameControl = new LTextField();
	gameControl.size = 22;
	gameControl.y = 194;
	gameControl.color = "#880088";
	gameControl.text = "    Let's Σ    ";
	cLayer.addChild(gameControl);
	ruleControl = new LTextField();
	ruleControl.size = 22;
	ruleControl.y = 262;
	ruleControl.color = "#880088";
	ruleControl.text = "Instructions ";
	cLayer.addChild(ruleControl);
	box02 = new LSprite();
	box02.x = 680;
	box02.y = 100;
	backLayer.addChild(box02);
	box02.addBodyCircle(10, 0, 0, 1, 0.5, 0.4, 0.2);
	LGlobal.box2d.setRevoluteJoint(box01.box2dBody, box02.box2dBody);

	cLayer = new LSprite();
	cLayer.x = 680;
	cLayer.y = 268;
	bitmap = new LBitmap(new LBitmapData(imglist["transparent"]));
	bitmap.x = 16;
	bitmap.y = 5;
	cLayer.addChild(bitmap);
	backLayer.addChild(cLayer);
	cLayer.addBodyPolygon(195, 60, 0, 0.1, 1, 0.2);
	cLayer.addEventListener(LMouseEvent.MOUSE_DOWN, gameControl_click);

	cLayer = new LSprite();
	cLayer.x = 680;
	cLayer.y = 335;
	bitmap = new LBitmap(new LBitmapData(imglist["transparent"]));
	bitmap.x = 16;
	bitmap.y = 5;
	cLayer.addChild(bitmap);
	backLayer.addChild(cLayer);
	cLayer.addBodyPolygon(195, 60, 0, 0.1, 1, 0.2);
	cLayer.addEventListener(LMouseEvent.MOUSE_DOWN, ruleBoard_click);
}

function main() {
	LGlobal.setDebug(false);
	backLayer = new LSprite();
	addChild(backLayer);
	loadingLayer = new LoadingSample5();
	backLayer.addChild(loadingLayer);
	LLoadManage.load(imgData, function(progress) {
		loadingLayer.setProgress(progress);
	}, function(result) {
		imglist = result;
		backLayer.removeChild(loadingLayer);
		loadingLayer = null;
		gameInit();
	});
	boxArray = new Array();
}

function gameInit(event) {
	LGlobal.box2d = new LBox2d();
	wallLayer = new LSprite();
	wallLayer.graphics.drawRect(10, "#000000", [0, 0, 800, 580], true, "#cccc80");
	wallLayer.alpha = 0.3;
	backLayer.addChild(wallLayer);
	drawBorder();
	LSprite.prototype.numValue = 0;
	//添加属性
	LSprite.prototype.isGo = false;
}

function ruleBoard_click(event) {
	//				if(gameStart){
	//					gameStart=false;
	//					gameControl.text = " Coutinue Σ";
	//					$("#pauseDiv").css("display","block");
	//				}
	$("#mySigma").css("display", "none");
	$("#loader").css("display", "none");
	$("#instructions").css("display", "block");
	$("#comeBack").css("display", "block");
	$("#pauseDiv").css("display", "none");
}

function comeBack() {
	$("#mySigma").css("display", "block");
	$("#loader").css("display", "block");
	$("#instructions").css("display", "none");
	$("#comeBack").css("display", "none");
	if (gameControl.text == " Coutinue Σ") {
		$("#pauseDiv").css("display", "block");
	}
}

function gameControl_click(event) {
	if (gameControl.text == "    Let's Σ    ") {
		score = 0;
		$("#gameOver").css("display", "none");
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				try {
					backLayer.removeChild(boxArray[i][j]);
				} catch(e) {
				}
			}
		}
		for (var i = 0; i < 9; i++) {
			boxArray[i] = new Array();
			for (var j = 0; j < 9; j++) {
				jump(i + j * 9, i, j);
			}
		}
		firstSum(1);
		gameControl.text = "   Pause Σ   "
	} else if (gameControl.text == "   Pause Σ   ") {
		gameStart = false;
		gameControl.text = " Coutinue Σ";
		$("#pauseDiv").css("display", "block");
	} else if (gameControl.text == " Coutinue Σ") {
		continueGame();
	}
}

function continueGame() {
	gameStart = true;
	gameControl.text = "   Pause Σ   ";
	$("#pauseDiv").css("display", "none");
}

//第一个和
function firstSum(count) {
	window.setTimeout(function() {
		count--;
		if (count > 0) {
			jump(count);
		} else {
			time = 900;
			numberBoard.text = "Your Σ: " + choosePlusResult();
			setTimeout(animateFunc, 50);
			gameStart = true;
		}
	}, 1800);
}

function jump(count, x, y) {
	window.setTimeout(function() {
		count--;
		if (count > 0) {
			jump(count, x, y);
		} else {
			add(x, y);
		}
	}, 10);
}

var score = 0;
function delayJudge(count) {
	window.setTimeout(function() {
		count--;
		if (count > 0) {
			delayJudge(count);
		} else {
			if (answer == correct) {
				score += answerArray.length;
				scoreBoard.text = "Score: " + score;
				time += answerArray.length * correct * 2.5;
				if (time > totalKb) {
					time = totalKb;
				}
				if (score > highScore) {
					highScore = score;
					recordBoard.text = "Record: " + highScore;
					storage.setItem("MySigma", highScore);
				}
				deleteOldAddNew();
				continueRight++;
			} else if (answer > correct) {
				score -= answer - correct;
				scoreBoard.text = "Score: " + score;
				deleteOldAddNew();
				continueRight = 0;
			}
		}
	}, 200);
}

function addIns() {
	cLayer = new LSprite();
	cLayer.x = 36;
	cLayer.y = 0;
	backLayer.addChild(cLayer);
	bitmap = new LBitmap(new LBitmapData(imglist["front"]));
	cLayer.addChild(bitmap);
	//cLayer.addBodyVertices(shapeArray, 0,0, 1, 0.1, 0.5, 0);
	cLayer.addBodyPolygon(400, 400, 1, 0.1, .5, 0);
}

function add(x, y) {
	cLayer = new LSprite();
	cLayer.x = 36 + x * 61;
	cLayer.y = 250 - 30 * y;
	var num = Math.floor(Math.random() * 9) + 1;
	backLayer.addChild(cLayer);
	bitmap = new LBitmap(new LBitmapData(imglist[num]));
	cLayer.addChild(bitmap);
	//cLayer.addBodyVertices(shapeArray, 0,0, 1, 0.1, 0.5, 0);
	cLayer.addBodyPolygon(bitmap.getWidth(), bitmap.getHeight(), 1, 0.1, .5, 0);
	cLayer.numValue = num;
	cLayer.isGo = false;
	boxArray[x][y] = cLayer;
	cLayer.addEventListener(LMouseEvent.MOUSE_DOWN, box_click);
	//cLayer.setBodyMouseJoint(true);
}

//正确答案
var correct = 0;
//用户的答案
var answer = 0;

//点击数字，变成反色
function box_click(event) {
	if (gameStart) {
		var obj = event.clickTarget;
		var x = obj.x, y = obj.y;
		if (answer == 0) {
			obj.removeChildAt(0);
			bitmap = new LBitmap(new LBitmapData(imglist["o" + obj.numValue]));
			obj.addChild(bitmap);
			answer += obj.numValue;
			answerArray.push(obj);
			delayJudge();
		} else {
			var xp = answerArray[answerArray.length - 1].x;
			var yp = answerArray[answerArray.length - 1].y;
			if ((Math.abs(x - xp) > 50 && Math.abs(x - xp) < 70 && Math.abs(y - yp) < 10) || (Math.abs(x - xp) < 10 && Math.abs(y - yp) < 70 && Math.abs(y - yp) > 50)) {
				obj.removeChildAt(0);
				bitmap = new LBitmap(new LBitmapData(imglist["o" + obj.numValue]));
				obj.addChild(bitmap);
				answer += obj.numValue;
				answerArray.push(obj);
				delayJudge();
			}
		}
	}
}

function deleteOldAddNew() {
	//删除先前选中的数字
	answer = 0;
	var len = answerArray.length;
	var keyLen = keyArray.length;
	for (var i = 0; i < keyLen; i++) {
		keyArray[i].isGo = false;
	}
	for (var i = 0; i < len; i++) {
		backLayer.removeChild(answerArray[i]);
		answerArray[i].isGo = true;
	}

	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < boxArray[i].length; j++) {
			if (boxArray[i][j].isGo) {
				boxArray[i].splice(j--, 1);
			}
		}
		for (var k = 0; k < 9 - boxArray[i].length; ) {
			cLayer = new LSprite();
			cLayer.x = 36 + i * 61;
			cLayer.y = 0 - 65 * k;
			var num = Math.floor(Math.random() * 9) + 1;
			backLayer.addChild(cLayer);
			bitmap = new LBitmap(new LBitmapData(imglist[num]));
			cLayer.addChild(bitmap);
			cLayer.addBodyPolygon(bitmap.getWidth(), bitmap.getHeight(), 1, 0.1, 0.5, 0);
			cLayer.numValue = num;
			cLayer.isGo = false;
			boxArray[i][boxArray[i].length] = cLayer;
			cLayer.addEventListener(LMouseEvent.MOUSE_DOWN, box_click);
		}
	}
	answerArray.splice(0);
	numberBoard.text = "Your Σ: " + choosePlusResult();
}

var answerArray = new Array();
var keyArray = new Array();
function choosePlusResult() {
	keyArray.splice(0);
	var x = Math.floor(Math.random() * 9);
	var y = Math.floor(Math.random() * 9);
	var sum = boxArray[x][y].numValue;
	boxArray[x][y].isGo = true;
	keyArray.push(boxArray[x][y]);
	var direction;
	//alert(sum+"("+x+","+y+")");
	for (var i = 0; i < 3; i++) {
		if (x == 0 && y == 0 && boxArray[1][0].isGo && boxArray[0][1].isGo)
			return sum;
		if (x == 8 && y == 8 && boxArray[8][7].isGo && boxArray[7][8].isGo)
			return sum;
		if (x == 0 && y == 8 && boxArray[1][8].isGo && boxArray[0][7].isGo)
			return sum;
		if (x == 8 && y == 0 && boxArray[7][0].isGo && boxArray[8][1].isGo)
			return sum;

		while (true) {
			direction = Math.floor(Math.random() * 4) + 1;
			if (direction == 1 && x < 8 && !boxArray[x+1][y].isGo) {
				sum += boxArray[++x][y].numValue;
				boxArray[x][y].isGo = true;
				break;
			}
			if (direction == 2 && y > 0 && !boxArray[x][y - 1].isGo) {
				sum += boxArray[x][--y].numValue;
				boxArray[x][y].isGo = true;
				break;
			}
			if (direction == 3 && x > 0 && !boxArray[x-1][y].isGo) {
				sum += boxArray[--x][y].numValue;
				boxArray[x][y].isGo = true;
				break;
			}
			if (direction == 4 && y < 8 && !boxArray[x][y + 1].isGo) {
				sum += boxArray[x][++y].numValue;
				boxArray[x][y].isGo = true;
				break;
			}

		}
		keyArray.push(boxArray[x][y]);
	}
	correct = sum;
	return sum;
}