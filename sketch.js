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
  
//  if(position!==undefined){
  if(keyDown(RIGHT_ARROW)){
    balloonSprite.x=balloonSprite.x+10;
    balloonSprite.addAnimation("animation",balloonAnimation);
    updatePosition(10,0);
  }

  if(keyDown(LEFT_ARROW)){
    balloonSprite.x=balloonSprite.x-10;
    balloonSprite.addAnimation("animation",balloonAnimation);
    updatePosition(-10,0);
   }

   if(keyDown(UP_ARROW)){
     balloonSprite.scale=balloonSprite.scale-0.01;
     balloonSprite.y=balloonSprite.y-10;
     updatePosition(0,-10);
   }

   if(keyDown(DOWN_ARROW)){
    balloonSprite.y=balloonSprite.y+10;
    balloonSprite.scale=balloonSprite.scale+0.01;
    updatePosition(0,10);
  }  
//}

  textSize(20);
  stroke("white");
  fill("black");
  text("Use arrow keys to move the balloon",100,20);

var balloonposition=database.ref("balloon/position");
balloonposition.on("value",readPosition,showError);



  drawSprites();
}

function readPosition(data){
  position=data.val();
  balloonSprite.x=position.x;
  balloonSprite.y=position.y;
}

function showError(){
  console.log("Error in writing to the database")
}

function updatePosition(x,y){
  database.ref("balloon/position").set({
   'x':position.x+x,
   'y':position.y+y
  })
}