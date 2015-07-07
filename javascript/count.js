var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

var img = new Image();
img.src="https://rawgit.com/zabo/mturk/master/javascript/imgs/cells.jpg";
var count = 1;
var Xs = new Array();
var Ys = new Array();
function getSize(){
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0);
	var form = document.getElementById('mturk_form');
	form.style.top = 10+img.height;
}

function drawNumber(x, y){
	context.font = "20px Arial"
	context.fillStyle='black';
	context.textAlign = 'center';
	context.fillText(count++, x, y);
}

function addCount(e){
	Xs.push(e.clientX);
	Ys.push(e.clientY);
	drawNumber(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop);
}

canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";
img.onload = getSize;
canvas.addEventListener('click', addCount, false);
document.body.appendChild(canvas);
