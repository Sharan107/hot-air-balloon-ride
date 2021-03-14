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
  fill("black");
  text("Use arrow keys to move the balloon",100,20);

var balloonposition=database.ref("balloon/position");
balloonposition.on("value",readPosition,showError);

updatePosition();

  drawSprites();
}

function readPosition(data){
  height=data.val();
  balloonSprite.x=height.x;
  balloonSprite.y=height.y;
}

function showError(){
  console.log("Error in writing to the database")
}

function updatePosition(){
  database.ref("balloon/position").set({
    'x':position.x+x,
    'y':position.y+y
  })
}