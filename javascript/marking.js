var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

var img = new Image();
img.src="https://rawgit.com/zabo/mturk/master/javascript/imgs/cells.jpg";
var rectCount = 0;
var Xs = new Array();
var Ys = new Array();
var x1;
var y1;
var mouseDown = false;
function getSize(){
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0);
	var form = document.getElementById('mturk_form');
	form.style.position = 'absolute';
	form.style.top = (10+img.height)+"px";
}

function drawRects(){
	canvas.width = canvas.width; //clear canvas
	context.drawImage(img, 0, 0);
	var responseArea = document.getElementById('responseArea');
	responseArea.value = "[";
	for(var i = 0; i<rectCount*2; i=i+2){
		context.rect(Xs[i], Ys[i], Xs[i+1]-Xs[i], Ys[i+1]-Ys[i]);
		responseArea.value = responseArea.value+"("+Xs[i] + "," + Ys[i] + "," + Xs[i+1] + "," +Ys[i+1]+")";
	}
	responseArea.value = "]";
	context.stroke();
}

function mark(e){
	mouseDown = true;
	x1 = e.clientX-canvas.offsetLeft;
	y1 = e.clientY-canvas.offsetTop;
}

function finishMarking(e){
	mouseDown = false;
	++rectCount;
	Xs.push(x1);
	Xs.push(e.clientX-canvas.offsetLeft);
	Ys.push(y1);
	Ys.push(e.clientY-canvas.offsetTop);
	drawRects();
}

function move(e){
	if(mouseDown){
		drawRects();
		context.rect(x1, y1, e.clientX-canvas.offsetLeft-x1, e.clientY-canvas.offsetTop-y1);
		context.stroke();
	}
}
/**
 * Gets a URL parameter from the query string
 */
function turkGetParam( name, defaultValue ) { 
   var regexS = "[\?&]"+name+"=([^&#]*)"; 
   var regex = new RegExp( regexS ); 
   var tmpURL = window.location.href; 
   var results = regex.exec( tmpURL ); 
   if( results == null ) { 
     return defaultValue; 
   } else { 
     return results[1];    
   } 
}

/**
 * URL decode a parameter
 */
function decode(strToDecode)
{
  var encoded = strToDecode;
  return unescape(encoded.replace(/\+/g,  " "));
}


/**
 * Returns the Mechanical Turk Site to post the HIT to (sandbox. prod)
 */
function turkGetSubmitToHost() {
  return decode(turkGetParam("turkSubmitTo", "https://www.mturk.com"));
}


/**
 * Sets the assignment ID in the form. Defaults to use mturk_form and submitButton
 */ 
function turkSetAssignmentID( form_name, button_name ) {

  if (form_name == null) {
    form_name = "mturk_form";
  }

  if (button_name == null) {
    button_name = "submitButton";
  }

  assignmentID = turkGetParam('assignmentId', "");
  document.getElementById('assignmentId').value = assignmentID;
  if (assignmentID == "ASSIGNMENT_ID_NOT_AVAILABLE") { 
    // If we're previewing, disable the button and give it a helpful message
    btn = document.getElementById(button_name);
    if (btn) {
      btn.disabled = true; 
      btn.value = "You must ACCEPT the HIT before you can submit the results.";
    } 
  }

  form = document.getElementById(form_name); 
  if (form) {
     form.action = turkGetSubmitToHost() + "/mturk/externalSubmit"; 
  }
}

canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";
img.onload = getSize;
canvas.addEventListener('mousedown', mark, false);
canvas.addEventListener('mouseup', finishMarking, false);
canvas.addEventListener('mousemove', move, false);
document.body.appendChild(canvas);
