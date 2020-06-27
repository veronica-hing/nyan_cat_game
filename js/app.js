/*-------Initialize Positions of Things---------*/
var player = {
  left: 50,
  top: 50
}

var cookies = [];//they'll be added later
/*------------Draw the Player-------------------*/
function drawPlayer(arr){
  var playerPos = document.getElementById('player');
  player.left += arr[0];
  player.top += arr[1];
  playerPos.style.left = player.left.toString() + 'px';
  playerPos.style.top = player.top.toString() +'px';
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
