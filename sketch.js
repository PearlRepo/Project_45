var canH, canW;

var bgSprite, bgImg;
var boat, boatImg, boatMoveImg;
var lineL, lineR, line, lineStart, lineEnd;

var moving= false;
var gameState= 0;
var btn, inst;

var bagImg, bottleImg, rocksImg, batteryImg;
var bagsGrp, bottleGrp, rocksGrp, batteryGrp;
var bagObject, bottleObject, rocksObject, batteryObject;
var power, icon;
var waitBg;
var fuel= 500;
var collected= 0;
var page, pageimg;

function preload() {
  bgImg= loadImage("./assets/bg.jpg");
  boatImg= loadImage("./assets/boat.png");
  boatMoveImg= loadImage("./assets/boatmove.png");
  bagImg= loadImage("./assets/bag.png");
  bottleImg= loadImage("./assets/bottle.png");
  rocksImg= loadImage("./assets/rocks.png");
  batteryImg= loadImage("./assets/battery.png");
  power= loadImage("./assets/power.png");
  icon= loadImage("./assets/icon.png");
  waitBg= loadImage("./assets/waitbg2.gif");
  pageimg= loadImage("./assets/page.png");
}

function setup() {
  var isMobile= /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    canW= displayWidth;
    canH= displayHeight;
    createCanvas(displayWidth+50, displayHeight);
  }
  else{
    canW= windowWidth;
    canH= windowHeight;
    createCanvas(windowWidth, windowHeight-5);
  }

  boat= createSprite(width/2, height-150);
  boat.addImage("boat", boatImg);
  boat.addImage("boatMove", boatMoveImg);
  boat.scale= 0.7;
  //boat.debug= true;

  lineL= new Boundary(width/4+50, -height, 20, height * 10);
  lineR= new Boundary(width/2+400, -height, 20, height * 10);
  lineStart= new Boundary(width/2, height-400, width, 20);
  lineEnd= new Boundary(width/2, -height*6+400, width, 20);

  line= new Boundary(width/2, height, width, 20);

  btn= createButton("Play");
  btn.position(width/2-200, height/2-300);
  btn.class("play");

  inst= createButton("Instructions");
  inst.position(width/2-200, height/2-450);
  inst.class("btn");

  logo= createImg("./assets/logo.png");
  logo.position(width/2-300, height/2+270);

  page= createImg("./assets/page.png");
  page.position(200, 10);
  page.class("gameTitleAfterEffect2");
  page.hide();

  bagsGrp= new Group();
  bottleGrp= new Group();
  rocksGrp= new Group();
  batteryGrp= new Group();

  bagsObject= new Materials(bagsGrp, 20, bagImg, 0.07);
  bottleObject= new Materials(bottleGrp, 15, bottleImg, 0.1);
  rocksObject= new Materials(rocksGrp, 5, rocksImg, 0.5);
  batteryObject= new Materials(batteryGrp, 3, batteryImg, 0.04);

}


function draw() 
{


  if (gameState===0) {
    background("lightblue");
    background(waitBg);
    btn.mousePressed(()=>{
      gameState= 1;
      page.hide();
    })

    inst.mousePressed(()=>{
      page.show();
      btn.position(width/2+500, height/2-300);
      logo.position(width/2+450, height/2+270);
    })

  }
  else if (gameState===1) {
    background("lightblue");
    btn.hide();
    inst.hide();
    logo.position(10, 10);
    logo.class("gameTitleAfterEffect");

    image(bgImg, 25, -height * 6, width-50, height * 7);
    handlePlayerControl();

    bagsObject.spawnMaterials();
    bottleObject.spawnMaterials();
    rocksObject.spawnMaterials();
    batteryObject.spawnMaterials();
  
    camera.position.y = boat.position.y-100;
  
    lineL.display();
    lineR.display();
    lineStart.display();
    lineEnd.display();
    line.display();
  
    lineL.collisionWboat();
    lineR.collisionWboat();
    line.collisionWboat();



    drawSprites();

    energyBar();
    collectedBar();
  }

}

function handlePlayerControl() {
  if (keyIsDown(UP_ARROW)) {
    boat.position.y -= 30;
    moving=true;
    boat.changeImage("boatMove");
  }else{
    moving=false;
    boat.changeImage("boat");
  }

  if (keyIsDown(LEFT_ARROW)) {
    boat.position.x -= 10;
  }else{
    moving=false;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    boat.position.x += 10;
  }else{
    moving=false;
  }

  if (keyIsDown(DOWN_ARROW)) {
    boat.position.y += 20;
  }else{
    moving=false;
  }
}

function energyBar(){
  push();
  image(power, width/2-250, camera.position.y-400, 40, 40);

  fill("white");
  rect(width/2-200, camera.position.y-400, 500, 30);

  fill("#FFD732");
  rect(width/2-200, camera.position.y-400, fuel, 30);

  noStroke();

  pop();
}

function collectedBar(){
  push();
  image(icon, width/2-250, camera.position.y-350, 40, 40);

  fill("white");
  rect(width/2-200, camera.position.y-350, 500, 30);

  fill("#B1C635");
  rect(width/2-200, camera.position.y-350, collected, 30);

  noStroke();

  pop();
}

