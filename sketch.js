var ghost, ghostImage, tower, towerImage, door, doorImage, climber, climberImage;

var invisible, invisibleGroup;

var gameState = "play";


function preload(){
  
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
}


function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
}


function draw(){
  background("black");
  
  if(gameState==="play"){
    
  
  
  createDoor();
  
  if(tower.y > 400){
    
    tower.y = 300;
  }
  
  if (keyDown("left_arrow")){
    
    ghost.x = ghost.x -3;
  }
  
    if (keyDown("right_arrow")){
    
    ghost.x = ghost.x +3;
  }
  
  if(keyDown("space")){
    
    ghost.velocityY = -7;
  }
  
  ghost.velocityY = ghost.velocityY +0.5;
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
  }
  
  if(invisibleGroup.isTouching(ghost)||ghost.y>600){
    
    gameState = "end";   
    ghost.destroy();
  }
  
  drawSprites();
    
  }
  
  if(gameState==="end"){
    
    textSize(50);
    text("Game Over", 160, 200)
  }
  
}


function createDoor(){
  
  if(frameCount %200 === 0){
  door = createSprite(300,-30);
  door.addImage("door", doorImage);
  door.velocityY = 3;
  door.x = Math.round(random(100,500));
  door.lifetime = 250;
    
    doorGroup.add(door);
    
    
    climber = createSprite(300,20);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 3;
    climber.lifetime = 250;
    
    climberGroup.add(climber);
    
    
    ghost.depth = door.depth;
    ghost.depth++;
    
    
    invisible = createSprite(300,20);
    invisible.width = climber.width;
    invisible.x = climber.x;
    invisible.velocityY = 3;
    invisible.lifetime = 250;
    invisible.visible = false;
    
    invisibleGroup.add(invisible);
    
  }
}

