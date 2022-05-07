var canvas = document.querySelector('canvas');
var ctx = null;
var imageSrc = 'paper.png';

document.addEventListener('DOMContentLoaded', function() {
	canvas = document.querySelector('canvas');
	ctx = canvas.getContext('2d');

	ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
	ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';

	addToCanvas(0, 0, false);
	
}, false);

// 캔버스에 이미지 추가하기
function addToCanvas(x, y, isRun, callback) {
	var img = new Image;
	img.src = imageSrc;

	img.onload = function() {
		ctx.drawImage(img, x, y);
		if (isRun) {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
			callback();
		}
	};
};

function onButtonClick () {
	var textarea = document.querySelector('textarea');
	var rawText = textarea.value;

	var array = rawText.split('\n');
	
	array = array.map(text => text.trim())
				.filter(text => text.length > 0)
				.map(text => text.split(' '));

	var newArray = [];
	for (var i=0; i<array.length; i++) {
		var numbers = array[i].map(text => Number(text));
		newArray.push(numbers)
	}
	
	if (isNaN(newArray[0][0])) {
		alert('양식에 맞춰 입력해주세요.');
		return;
	}

	// 한 용지에 5게임만 그릴 수 있으니 5가 넘어가면 용지를 추가
	if ((newArray.length - 1) / 5 >= 1) {
		var count = parseInt(newArray.length / 5);
		canvas.height = canvas.height + 960 * (count - 1);
		for (var i=0; i<count; i++) { 
			addToCanvas(0, 960 * i, (i == count - 1), function() { 
				drawLotto(newArray);
			});	
		}
	} else {
		drawLotto(newArray);
	}
} 

// 로또용지 위에 점을 찍는다
function drawLotto(lottoList) {
	for (var game = 0; game < lottoList.length; game++) {
		// 1. 좌표를 계산한다.
		var lottos = lottoList[game];
		var lottoPos = [];

		for (var i=0; i<lottos.length; i++) {
			lottoPos.push(calcLottoPostion(game, lottos[i]-1))
		}

		// 2. 선을 잇는다
		drawLottoLine(lottoPos);

		// 3. 점을 찍는다
		for (var i=0; i<lottoPos.length; i++) {
			drawLottoPoint(lottoPos[i].x, lottoPos[i].y);
		}
	}
}

// 해당 로또번호의 용지에서의 픽셀 좌표를 계산한다
function calcLottoPostion(game, number) {
	var x = number % 7;
	var y = parseInt(number / 7);
	var page = parseInt(game / 5);
	// console.log('number : ' + number + ' -> x : ' + x + ', y : ' + y);

	var xPos = ((game % 5) * LOTTO_CONST.game_gap) + LOTTO_CONST.game_room_x + x * (LOTTO_CONST.cell_width + LOTTO_CONST.cell_x_gap) + LOTTO_CONST.cell_x_center;
	var yPos = (page * 960) + LOTTO_CONST.game_room_y + y * (LOTTO_CONST.cell_height + LOTTO_CONST.cell_y_gap) + LOTTO_CONST.cell_y_center;

	return {'x':xPos, 'y':yPos};
}

// 주어진 좌표에 점을 찍는다
function drawLottoPoint(x, y) {
	var circle = new Path2D();
    circle.arc(x, y, 15, 0, 2 * Math.PI); // 반지름 12 원
    ctx.fill(circle);
}

// 주어진 좌표들을 잇는 선을 그린다.
function drawLottoLine(lotto) {
	ctx.lineWidth = 3
	ctx.beginPath();
    ctx.moveTo(lotto[0].x, lotto[0].y);
    ctx.lineTo(lotto[1].x, lotto[1].y);
    ctx.lineTo(lotto[2].x, lotto[2].y);
    ctx.lineTo(lotto[3].x, lotto[3].y);
    ctx.lineTo(lotto[4].x, lotto[4].y);
    ctx.lineTo(lotto[5].x, lotto[5].y);
    ctx.stroke();
}

LOTTO_CONST = {
	'width': 2224,
	'height': 960,
	'game_room_x': 460,		// A게임 1번칸 좌상단 시작위치
	'game_room_y': 109,		// A게임 1번칸 좌상단 시작위치
	'cell_x_center': 12,	// 그 위치에서 1번칸 센터까지 거리
	'cell_y_center': 23,	// 그 위치에서 1번칸 센터까지 거리
	'cell_width': 25,		// 1번칸 크기
	'cell_height': 44,		// 1번칸 크기
	'cell_x_gap': 15.5,		// 칸과 칸 가로 거리
	'cell_y_gap': 31,		// 칸과 칸 세로 거리
	'game_gap': 324,
}

//A번게임의 1번칸 시작 위치 490, 109
//1칸의 크기 : 25, 44
//1번게임과 2번게임 거리 : 324








//////////////////////////////////////////////////////
function calcCoordLotto() {
	for (var i = 0; i < 5; i++) { 
		for (var y = 0; y < 7; y++) {
			for (var x = 0; x < 7; x++) {
				var xPos = (i * lotto.game_gap) + lotto.game_room_x + x * (lotto.cell_width + lotto.cell_x_gap) + lotto.cell_x_center;
				var yPos = lotto.game_room_y + y * (lotto.cell_height + lotto.cell_y_gap) + lotto.cell_y_center;
				console.log(xPos, yPos);
				drawLottoPoint(xPos, yPos);
			}
		}
	}
}

function drawLottoPath() {
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');

    var circle = new Path2D();
    circle.arc(472, 131, 13, 0, 2 * Math.PI); // x,y위치에서 반지름 13인 원을 그린다

    ctx.fill(circle);
}


