var cookieId = 0; //counter to number all cookies that ever existed
/*Class Declarations*/
//cookie class
class Cookie{
  constructor(){
    //this.status = 1; // 1 if its onscreen, changes to 0 when offscreen
    this.id = cookieId;
    this.top = Math.random()*(screen.height - 10);
    this.left = screen.width + 50;
    this.screenCookie = document.createElement('div');
    this.screenCookie.setAttribute('class','cookie');
    this.screenCookie.setAttribute('id', JSON.stringify(this.id))
    document.getElementById('allCookies').appendChild(this.screenCookie);
    cookieId++;
  }

  delete(){
    document.getElementById('allCookies').removeChild(this.screenCookie);
  }
}

/*-------Initialize Positions  and speed of Things---------*/
var player = {
  left: 0,
  top: 0
}
let firstCookie = new Cookie();
var cookies=[firstCookie];
var sky = {
  left: 0
}

var scrollSpeed = 75; //starting speed of how things move
/*------------Draw the Player-------------------*/
function drawPlayer(arr){
  var playerPos = document.getElementById('player');
  player.left += arr[0];
  player.top += arr[1];
  playerPos.style.left = player.left.toString() + 'px';
  playerPos.style.top = player.top.toString() +'px';
}
/*-----------Draw the Cookies--------------------*/
//adding more Cookies
function addCookie(){
  let myCookie = new Cookie();
  cookies.push(myCookie);//add it to the cookies list
}

function removeCookie(aCookie){
  let cookieSpot = 0;
  for(var i = 0; i < cookies.length; i++){
    if(cookies[i].id == aCookie.id){
      cookieSpot = i;
    }
  }//find where the cookie lives in the list
  let removeCookie = cookies.splice(cookieSpot, 1);//remove cookie from cookies list
  //calling delete on itself removes itself from DOM
  aCookie.delete();
}
//hitting Cookies, a check that will be called by moveCookies
function checkCookie(aCookie){
  if((aCookie.left < player.left)){
    removeCookie(aCookie);
  }
}
function moveCookies(listOfCookies){
  var cookieList = document.getElementsByClassName('cookie');
  for(var i = 0; i < cookieList.length ; i++){
    cookies[i].left -= 10;
    cookies[i].top += 0;
    cookieList[i].style.left = cookies[i].left.toString() + 'px';
    cookieList[i].style.top = cookies[i].top.toString() + 'px';
    checkCookie(cookies[i]);
  }
}

function drawCookies(){//has no input and calls moveCookies which is like drawPlayer but for an array of cookies
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
      break;//*/
    case 38://move up
      arr[1] -= 10;
      break;
    case 39://move right
      arr[0] += 10;
      break;//*/
    case 40://move down
      arr[1] += 10;
      break;
  }
  drawPlayer(arr);
}

setInterval(addCookie, scrollSpeed*30);
setInterval(drawCookies, scrollSpeed);
setInterval(drawSky, scrollSpeed);
