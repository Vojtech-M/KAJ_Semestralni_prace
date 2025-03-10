var turretVersion = 0.01;

var pathPoints = [
    { x: 25, y: 0 },
    { x: 25, y: 500 },
    { x: 350, y: 500 },
    { x: 350, y: 250 },
    { x: 100, y: 250 },
    { x: 100, y: 100 },
    { x: 250, y: 100 },
    { x: 250,  y: 680 }
];

var keys = [];

$(document).keydown(function (e) {
    keys[e.keyCode] = true;
});

$(document).keyup(function (e) {
    delete keys[e.keyCode];
});

var FPS = 60;
var lives = 20;
var money = 50;

var waveCount = 0;

var mouseX = 0;
var mouseY = 0;

var ctx = document.getElementById("canvas").getContext("2d");

function engine() {
    $("#gold").html("Gold: " + Math.floor(money * 10) / 10);
    $("#lives").html("Lives: " + Math.floor(lives));
    $("#wave").html("Wave: " + waveCount);

    $("#turret_version").html("v" + turretVersion);
    $("#div_header").html('Welcome to Turret Defense!');

  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  drawMap();
  
  var disabledColor = "#5e5e5e";
  var enabledColor = "#0cb53c";
  
  setTimeout(engine, 1000 / FPS);
}
engine();



function drawMap(){
  ctx.beginPath();
  ctx.strokeStyle = "darkgreen";
  ctx.lineWidth=20;
  var lastPoint = null;
  for(var i = 0; i < pathPoints.length; i++) {
    var curPoint = pathPoints[i];
    if (lastPoint)
      ctx.lineTo(curPoint.x, curPoint.y);
      ctx.moveTo(curPoint.x, curPoint.y);
      lastPoint = curPoint;
    }
  ctx.stroke();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
window.oncontextmenu = function(){
  document.getElementById("select").checked = true;
  return false;
}

document.onmousemove = function(mouse){
  mouseX = mouse.clientX - document.getElementById('canvas').getBoundingClientRect().left;
  mouseY = mouse.clientY - document.getElementById('canvas').getBoundingClientRect().top;
};


$('input[type=checkbox]').checkboxradio();
$('input[type=radio]').checkboxradio({
  icon: false
});
