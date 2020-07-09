var cookieId = 0; //counter to number all cookies that ever existed
/*Class Declarations*/
let myPoints = document.getElementById('counter');
//cookie class
class Cookie{
  constructor(){
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
  top: 0,
  points: 0
}
let firstCookie = new Cookie();
var cookies=[firstCookie];
var sky = {
  left: 0
}

var scrollSpeed = 100; //starting speed of how things move
/*------------Draw the Player------------------------------*/
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
  let removeCookie = cookies.splice(cookieSpot, 1);//remove cookie from list
  aCookie.delete();//calling delete on itself removes itself from DOM
}
//removes cookies that have fallen offscreen
function fallenCookie(aCookie){
  if((aCookie.left < -75)){
    removeCookie(aCookie);
  }
}
//checks if divs overlap

function closeEnough(a,b){
  let rect1 = a.getBoundingClientRect();
  let rect2 = b.getBoundingClientRect();
  let isInHoriztonalBounds = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  let isInVerticalBounds = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  let isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
}
//removes cookies that have been booped and adds 5 to player.points
function boopedCookie(aCookieDiv, aCookie){
  let playerDiv = document.getElementById('player');
  if(closeEnough(aCookieDiv,playerDiv)){
    player.points += 5;
    removeCookie(aCookie);
    myPoints.innerHTML = player.points;
  }
}
function moveCookies(listOfCookies){
  var cookieList = document.getElementsByClassName('cookie');
  for(var i = 0; i < cookieList.length ; i++){
    cookies[i].left -= 10;
    cookies[i].top += 0;
    cookieList[i].style.left = cookies[i].left.toString() + 'px';
    cookieList[i].style.top = cookies[i].top.toString() + 'px';
    fallenCookie(cookies[i]);//checks if it fell offscreen
    boopedCookie(cookieList[i], cookies[i]);//uses the DOM
    //boopedCookie(cookies[i]);//checks if player hit it
  }
}

function drawCookies(){//has no input and calls moveCookies which is like drawPlayer but for an array of cookies
  moveCookies(cookies);
}

/*----------MAKE IT SPICY------------------------*/
function faster(){
  scrollSpeed *= .5;
}

/*-----------Draw the Sky-----------------------*/
function moveSky(sky){
  if(player.points%25 == 0){
    faster();
    console.log(scrollSpeed);
  }
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

setInterval(addCookie, scrollSpeed*15);
setInterval(drawCookies, scrollSpeed);
setInterval(drawSky, scrollSpeed);
