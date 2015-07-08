var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var img = new Image();
img.src="https://rawgit.com/zabo/mturk/master/javascript/imgs/cells.jpg";
var nbPoints = 0;
var lastX = 0;
var lastY = 0;
var currentX;
var currentY;
var imageData;
var slope = 0;
function getSize(){
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0);
	var form = document.getElementById('mturk_form');
	form.style.position = 'absolute';
	form.style.top = (10+img.height)+"px";
}

function draw(x, y){
	var h = y-(slope*x);
	context.beginPath();
	context.moveTo(0,h);
	context.lineTo(canvas.width, slope*canvas.width + h);
	//context.moveTo(x, 0);
	//context.lineTo(x, canvas.height);
	context.stroke();
	var responseArea = document.getElementById('responseArea');
	responseArea.value = "("+x+","+h+","+ slope + ")";
}

function addPoint(e){
	context.drawImage(img, 0, 0);
	lastX = e.clientX-canvas.offsetLeft;
	lastY = e.clientY-canvas.offsetTop;
	draw(lastX, lastY);
}

function follow(e){
	context.drawImage(img, 0, 0);
	currentX = e.clientX-canvas.offsetLeft;
	currentY = e.clientY-canvas.offsetTop;
	draw(currentX, currentY);
	draw(lastX, lastY);
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
var plusButton = document.createElement("Button");
var plusButtonName = document.createTextNode("increase slope");
plusButton.appendChild(plusButtonName);
plusButton.addEventListener("click", function(){
	slope +=0.1;
}, false);
document.body.appendChild(plusButton);
canvas.addEventListener('click', addPoint, false);
canvas.addEventListener('mousemove', follow, false);
document.body.appendChild(canvas);
