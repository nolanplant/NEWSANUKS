// from: http://stackoverflow.com/a/5303242/945521
if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
        var bytes = Array.prototype.map.call(string, function(c) {
            return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes).buffer);
    };
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
    FB.init({
      appId  : "108524552597619", // "253385711432414" sanuk app 
      status : true, 
      cookie : true, 
      xfbml  : true  // parse XFBML
    });
};

function postImageToFacebook( authToken, filename, mimeType, imageData, message )
{


    // this is the multipart/form-data boundary we'll use
    var boundary = '----ThisIsTheBoundary1234567890';   
    // let's encode our image file, which is contained in the var
    var formData = '--' + boundary + '\r\n'
    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
    for ( var i = 0; i < imageData.length; ++i )
    {
        formData += String.fromCharCode( imageData[ i ] & 0xff );
    }
    formData += '\r\n';
    formData += '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
    formData += message + '\r\n'
    formData += '--' + boundary + '--\r\n';
    
    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true );
    xhr.onload = xhr.onerror = function() {
        console.log( xhr.responseText );
    };
    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
    xhr.sendAsBinary( formData );
};

var canvas;
var context;
var centerX;
var img;
var img2;
var authToken;
var armsrc;
var hashBrown;
 
function drawCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	img = new Image();
	img2 = new Image();
	img2.src = document.getElementById("currentArm").src;
	img.src = document.getElementById("detailImg").src;
	hashBrown = document.getElementById("currentArm").getAttribute("alt");
	//alert(img2.src)
	img.onload = function() {
		context.drawImage(img, 10, 0);
		context.drawImage(img2, 10, 0);
		context.fillStyle = "rgb(0,0,0)";
		centerX = canvas.width / 2;
		context.textAlign = 'center';
		context.font = 'bold 16px sans-serif';
		context.fillText(hashBrown, centerX, 335);
		postCanvasToFacebook();
	};
};

function saveCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	img = new Image();
	img2 = new Image();
	hashBrown = document.getElementById("currentArm").getAttribute("alt");
	img.src = document.getElementById("detailImg").src;
	img2.src = document.getElementById("currentArm").src;
	//alert(img2.src)
	img.onload = function() {
		context.drawImage(img, 10, 0);
		context.drawImage(img2, 10, 0);
		context.fillStyle = "rgb(0,0,0)";
		centerX = canvas.width / 2;
		context.textAlign = 'center';
		context.font = 'bold 16px sans-serif';
		context.fillText(hashBrown, centerX, 335);
		doSmthng();
	};
}

function doSmthng(){
 var canvas = document.getElementById('canvas');
      var dataURL = canvas.toDataURL();
      document.getElementById('canvasImg').src = dataURL;
}



function postCanvasToFacebook() {
	var data = canvas.toDataURL("image/png");
	var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
	var decodedPng = Base64Binary.decode(encodedPng);
	FB.getLoginStatus(function(response) {
	  if (response.status === "connected") {	
		postImageToFacebook(response.authResponse.accessToken, "sanuk.com/new", "image/png", decodedPng, "www.sanuk.com/new");
		alert('Bam that just happened!')
	  } else if (response.status === "not_authorized") {
		 FB.login(function(response) {
			postImageToFacebook(response.authResponse.accessToken, "sanuk.com/new", "image/png", decodedPng, "www.sanuk.com/new");
		alert('Facebook is giving us the Kibosh. Make sure you\'re logged in and try again!')
		 }, {scope: "publish_stream"});
	  } else {
		 FB.login(function(response)  { 
			postImageToFacebook(response.authResponse.accessToken, "sanuk.com/new", "image/png", decodedPng, "www.sanuk.com/new");
		alert('Bam that just happened!')
		 }, {scope: "publish_stream"});
	  }
	 });

};