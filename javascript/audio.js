var player = document.createElement('audio');
document.body.appendChild(player);
var text = document.createElement('textArea');
text.style.width="280px";
document.body.appendChild(text);
player.src = "audio/one.mp3";
player.controls = true;
player.style.width = "600px";
var passageBeginning = 0.0;
var passageEnd = 0.0;
var passageBeginButton = document.createElement("Button");
var beginButtonName = document.createTextNode("mark passage beginning");
passageBeginButton.addEventListener("click", function(){
	passageBeginning = player.currentTime;
	updateValues();
}, false);
passageBeginButton.appendChild(beginButtonName);
document.body.appendChild(passageBeginButton);

var passageEndButton = document.createElement("Button");
var endButtonName = document.createTextNode("mark passage end");

passageEndButton.addEventListener("click", function(){
	passageEnd = player.currentTime;
	updateValues();
}, false);

var goToBeginning = document.createElement("Button");
var gotToButtonName = document.createTextNode("Go to passage Beginning");
goToBeginning.appendChild(gotToButtonName);
goToBeginning.addEventListener("click", function(){
  player.currentTime = passageBeginning;
}, false);
document.body.appendChild(goToBeginning);

function updateValues(){
	text.value = "passage begins at " + passageBeginning + "seconds and ends at " + passageEnd + "seconds.";
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
passageEndButton.appendChild(endButtonName);
document.body.appendChild(passageEndButton);
