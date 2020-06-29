/*-------Initialize Positions  and speed of Things---------*/
var player = {
  left: 50,
  top: 50
}

var cookies = {
    right: -50,
    top: 50
}
//will add more to cookies or make it an array later
//starting position of initial cookies

var sky = {
  left: 0
}

var scrollSpeed = 75; //startin speed of how things move
/*------------Draw the Player-------------------*/
function drawPlayer(arr){
  var playerPos = document.getElementById('player');
  player.left += arr[0];
  player.top += arr[1];
  playerPos.style.left = player.left.toString() + 'px';
  playerPos.style.top = player.top.toString() +'px';
}
/*-----------Draw the Cookies--------------------*/
function moveCookies(listOfCookies){
  var cookieList = document.getElementById('cookies');
  cookies.right += 10;
  cookies.top += 0;
  cookieList.style.right = cookies.right.toString() + 'px';
  cookieList.style.top = cookies.top.toString() + 'px';
}

function drawCookies(){//has no input and calls moveCookies which is like drawPlayer but for an array of cookies hopefully
  moveCookies(cookies);
}

/*-----------Draw the Sky-----------------------*/
function moveSky(sky){
  var screenSky = document.getElementById('sky');
  sky.left -= 10;
  screenSky.style.backgroundPosition = sky.left.toString() + 'px center';
}
function drawSky(){
  moveSky(sky);
}

/*------------Moving the Player-----------------*/
document.onkeydown = function movePlayer(direction){
  let arr = [0,0];//x,y position change
  switch(direction.keyCode){
    case 37://move left
      arr[0] -= 10;
      break;
    case 38://move up
      arr[1] -= 10;
      break;
    case 39://move right
      arr[0] += 10;
      break;
    case 40://move down
      arr[1] += 10;
      break;
  }
  drawPlayer(arr);
}

setInterval(drawCookies, scrollSpeed);
setInterval(drawSky, scrollSpeed);
