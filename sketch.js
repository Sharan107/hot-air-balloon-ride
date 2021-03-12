var balloon;
var backgroundImg;
var balloonSprite,balloonAnimation;
var database,position;

function preload(){
  backgroundImg=loadImage("images/Hot Air Ballon-01.png");
  balloonAnimation=loadAnimation("images/Hot Air Ballon-02.png",
  "images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(1200,600);
 
  database=firebase.database();

  balloonSprite=createSprite(100,300,100,300);
  balloonSprite.addAnimation("animation",balloonAnimation);
}

function draw() {
  background(backgroundImg); 
  
  if(keyDown(RIGHT_ARROW)){
    balloonSprite.x=balloonSprite.x+10;
  }

  if(keyDown(LEFT_ARROW)){
    balloonSprite.x=balloonSprite.x-10;
   }

   if(keyDown(UP_ARROW)){
     balloonSprite.y=balloonSprite.y-10;
   }

   if(keyDown(DOWN_ARROW)){
    balloonSprite.y=balloonSprite.y+10;
  }  

  textSize(20);
  stroke("white");
  fill("white");
  text("Use arrow keys to move the balloon",300,70);

  var balloonPosition=database.ref("balloon/height");
  balloonPosition.on("value",readPosition,showError);

  drawSprites();
}