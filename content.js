
var width = 600;
var height = 330;
var canvas = document.getElementById("canvas");

canvas.width = width*2;
canvas.height = height*2;

canvas.style.width = width;
canvas.style.height = height;

ctx = canvas.getContext("2d");

canvas.getContext("2d").scale(2,2);


    var player = {
        x: width/2,
        y: -70,
        width: 14,
        height: 60,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        goingRight: true,
        name: "jiblet"
    },
    keys = [],
    friction = 0.8,//does this do anything?
    gravity = 0.3;

var mailbox=({name: "mailbox", x:-80, y:270, width:35, height:50, open:false, flag:true, imgOffset:0});
var dancer=({name:"dancer", x:750, y:80, width:45, height:150});
var archer=({name:"archer", x:650, y:185, width:60, height:135});
var fountain=({name:"fountain", x:970, y:25, width:85, height:115, imgOffset:0, frames:3, animSpeed:5});
var libraryDoor=({name:"libraryDoor", x:1115, y:10, width:70, height:180, imgOffset:0, open:true});
var pinkGirl=({name:"pinkGirl", x:-450, y:-52, width:15, height:37, imgOffset:0});
var yellowGirl=({name:"yellowGirl", x:-150, y:-40, width:29, height:25, imgOffset:0});
var ball=({name:"ball", x:-545, y:-25, width:10, height:10, frames:4, imgOffset:0, goingRight:true, counter:0});
var tree=({name:"tree", x:-589, y:-365, width:174, height:350, frames:2, imgOffset:0});
var building=({name:"building", x:-width+11, y:5, width:400, height:315});
var house=({name:"house", x:-width+210, y:-565, width:133, height:150});
var city=({name:"city", x:0, y:130, width:600, height:200});
var library=({name:"library", x:1199, y:-300, width:800, height:500});
var ladder=({name:"ladder", x:1900, y:6, width:45, height:173});
var busts=({name:"busts", x:1650, y:110, width:590, height:180});
var globe=({name:"globe", x:1240, y:-116, width:105, height:118, imgOffset:0});
var windmill=({name:"windmill", x:30, y:-370, width:190, height:330, imgOffset:0, frames:4, animSpeed:5});
var windmill2=({name:"windmill", x:330, y:-370, width:190, height:330, imgOffset:0, frames:4, animSpeed:5});


var boxes = [];

//floor
boxes.push({x:-width-96, y:height-10, width:width*3.2, height: 20, skin:"rect"});
//top box
boxes.push({x:-589, y:-15, width:530, height:20, skin:"rect"});
//buildings
boxes.push({x:-589, y:110, width:243, height:14, skin:"rect"});//3rd floor
boxes.push({x:-589, y:235, width:392, height:5, skin:"rect"});//2nd floor
boxes.push({x:-150, y:275, width:40, height:40, skin:"square"});//right step
boxes.push({x:-325, y:205, width:25, height:30, skin:"no"});//bottom bike wheel
boxes.push({x:-340, y:155, width:20, height:3, skin:"no"});//top bike wheel
//stairs to croquet platform
boxes.push({x:-30, y:40, width:15, height:15, skin:"square"});
boxes.push({x:-20, y:70, width:20, height:20, skin:"square"});
boxes.push({x:0, y:120, width:30, height:30, skin:"square"});
boxes.push({x:70, y:170, width:80, height:80, skin:"square"});
boxes.push({x:160, y:220, width:20, height:20, skin:"square"});
boxes.push({x:230, y:270, width:40, height:40, skin:"square"});
//windfarm pllatform
boxes.push({x:30, y:-40, width:500, height:20, skin:"rect"});
//right garden
boxes.push({x:700, y:280, width:500, height:40, skin:"rect"});
boxes.push({x:750, y:230, width:450, height:50, skin:"rect"});
boxes.push({x:850, y:190, width:400, height:40, skin:"rect"});
boxes.push({x:970, y:140, width:85, height:50, skin:"rect"});
//library
boxes.push({x:1200, y:190, width:800, height:200, skin:"lib"});
boxes.push({x:1200, y:-0, width:380, height:5, skin:"lib"});//2nd floor library
boxes.push({x:1640, y:-0, width:380, height:5, skin:"lib"});//2nd floor library
//left wall
boxes.push({x:-width-85,y:-680, width:96, height:1000, skin:"wall"});
//right wall
boxes.push({x:width*2-96, y:-910, width:96, height:1000, skin:"wall"});
boxes.push({x:width*2-96, y:190, width:96, height:200, skin:"shortWall"});
//right library wall
boxes.push({x:(width*2-96)+895, y:-510, width:96, height:1000, skin:"wall"});

//ladder rungs
var rungs = [];
rungs.push({x:ladder.x+5, y:ladder.y+150, width:ladder.width-10, height:0});
rungs.push({x:ladder.x+5, y:ladder.y+80, width:ladder.width-10, height:0});
rungs.push({x:ladder.x+5, y:ladder.y+30, width:ladder.width-10, height:0});

var skyTop = 0;
var skyBottom = height;

var movingObjects = []; //for moving the viewport
movingObjects.push(windmill2,windmill,globe,busts,library,ladder,tree,ball,mailbox,dancer,archer,fountain,libraryDoor,pinkGirl,building,house,yellowGirl,skyTop,skyBottom);

for(i=0;i<boxes.length;i++){
	movingObjects.push(boxes[i]);
}
for(i=0;i<rungs.length;i++){
	movingObjects.push(rungs[i]);
}

var pics = [];
//the order matters because some things are drawn on top of others
pics.push(windmill2,windmill,library,ladder,tree,dancer,archer,fountain,libraryDoor,pinkGirl,yellowGirl,player,globe,busts,ball,mailbox,building,house);
//foregroundPics.push(globe,busts,ball,mailbox,building,house);
var animations = [];
animations.push(fountain,windmill);


//sound files
/*
var ballSound = new Audio('ball2.wav');
var fountainSound = new Audio('fountain.wav');
var jumpingSound = new Audio('jumping.wav');
var landingSound = new Audio('landing.wav');
*/
//initialize some variables

var letterCount = 0;
var frameCount = 0;//loops from 0 to 1000
var jibletOffsetY = 0;
var jibletOffsetX = 0;
progressMarker = 0;
var stopSpeechTimer = 500;


function update() {

  if(frameCount<1000){
	   frameCount++;
  }else{
    frameCount=0;
  }
    // check keys
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            //jumpingSound.play();
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {
        	if (player.x < width-100){
            player.velX++;
           }else{
           for(i=0;i<movingObjects.length;i++){
           	 movingObjects[i].x -= player.speed;
           }
           city.x -= player.speed/5;
           busts.x -= .7;
          }
        }
      player.goingRight = true;
    }
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
        	if (player.x > 90){
            player.velX--;
          }else{
          for(i=0;i<movingObjects.length;i++){
           	movingObjects[i].x += player.speed;
           }
           city.x += player.speed/5;
           busts.x += .7;
          }
        }
      player.goingRight = false;
    }

    player.velX *= friction;
    player.velY += gravity;

    player.grounded = false;
    for (var i = 0; i < boxes.length; i++){
        var dir = colCheck(player, boxes[i], 1);
        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
    }

    //move ladder when jiblet is on it
for (i = 0; i < rungs.length; i++){
    dir = colCheck(player, rungs[i], 0);
    if (dir === "b") {
        player.grounded = true;
        player.jumping = false;
        ladder.x=player.x-20;
    }
    rungs[i].x = ladder.x;
}

  //open and close mailbox
    dir = colCheck(player, mailbox, 1);
    if (dir === "l"){
      mailbox.open = true;
      say(1);
      if (frameCount > 500){
        stopSpeechTimer = frameCount-500;
      }else{
        stopSpeechTimer = frameCount+500;
      }
      openLetter(0);
    }else if(dir === "r"){
    	mailbox.open = false;
    }

    if(player.grounded){
         player.velY = 0;
    }

    //move viewport up
    if(player.grounded === true && player.y < height/1.5){
    	for(i=0; i<movingObjects.length; i++){
      	movingObjects[i].y++;
      }
      player.y +=.3;
      city.y+=.2;
    }
    //move viewport down
    if(player.y>height-70){
    	for(i=0; i<movingObjects.length; i++){
      	movingObjects[i].y-=2;
      }
      city.y-=.4;
    }
    player.x += player.velX;
    player.y += player.velY;

    //requestAnimationFrame(update);


  //mailboxOffset
  if(mailbox.open === true){
  	mailbox.imgOffset = 35;
  } else {
  	mailbox.imgOffset = 0;
  }

  //fountain cycle
  animate(fountain, 2, 5);
  animate(windmill, 3, 5);
  animate(windmill2, 3, 5);
  /*
  if(frameCount%5===0){
  	if(fountain.imgOffset < fountain.width*2){
  		fountain.imgOffset += fountain.width;
    }else{
    	fountain.imgOffset=0;
    }
  }*/

//fountain sound
  /*dir = colCheck(player, fountain);
  if(dir!==null){
    //fountainSound.volume = Math.abs(1/((fountain.x-player.x)/5));
    fountainSound.play();
  }*/

//ball cycle
    dir = colCheck(player, ball, 1);
    if (dir==="r" || dir==="l"){ //ball changes direction when it hits jiblet
      ball.goingRight =! ball.goingRight;
      libraryDoor.open = true;
      //ballSound.play();
    }else if (dir==="b"){
      tree.imgOffset=tree.width;
    }
    if(ball.goingRight === true){
      ball.x++;
      if(ball.counter%6===0){//animate ball
        if(ball.imgOffset < ball.width*(ball.frames-1)){
          ball.imgOffset+=ball.width;
        }else{
          ball.imgOffset=0;
        }
      }
    }else{
      ball.x--;
      if(ball.counter%6===0){
        if(ball.imgOffset>0){
          ball.imgOffset-=ball.width;
        }else{
          ball.imgOffset=ball.width*(ball.frames-1);
        }
      }
      if(ball.counter<50){ //yellow girl animation cycle
        yellowGirl.imgOffset=yellowGirl.width;
      }else{
        yellowGirl.imgOffset=0;
        if(ball.x<pinkGirl.x+30){ //pink girl animation cycle
          if((ball.x-pinkGirl.x)%5===0){
            pinkGirl.imgOffset+=pinkGirl.width;
          }
        }else{
          pinkGirl.imgOffset=0;
        }
      }
    }
    ball.counter++;
    if(ball.goingRight===true && ball.x>yellowGirl.x-5 || ball.goingRight===false && ball.x<pinkGirl.x+pinkGirl.width){
      ball.goingRight =! ball.goingRight;
      ball.counter=0;
    }
//jiblet Y offset
  if(player.goingRight === true){
  	jibletOffsetY = 0;
  }else{
  	jibletOffsetY = player.height;
  }

  //erase the canvas
 		ctx.clearRect(0, 0, width, height);

   //draw stuff on the canvas
   	//sky
    var grd = ctx.createLinearGradient(0,skyBottom,0,skyTop);
    grd.addColorStop(0,"#99ffff");//light blue
    grd.addColorStop(1,"#19334d");//dark blue
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,width,height);

    draw(document.getElementById("cityPic"),0, 0, city.width, city.height, city.x, city.y, city.width, city.height);

    //draw boxes
  	for(i=0;i<boxes.length;i++){
      if(boxes[i].skin !== "no"){
      var image = document.getElementById(boxes[i].skin+"Pic");
    		draw(image, 0, 0, image.width, image.height, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
      }
  	}


  for(i=0; i<pics.length; i++){
    drawTwo(pics[i]);
  }

  if(frameCount===stopSpeechTimer){
    say(0);
  }

}//end main loop

function animate(pic, num, speed){
  //simple non-interactive animations
  if(frameCount%speed===0){
  	if(pic.imgOffset < pic.width*num){
  		pic.imgOffset += pic.width;
    }else{
    	pic.imgOffset=0;
    }
  }
}//end animate function

function drawTwo(pic){
  //draw things that overlap with the viewport
  if(pic.x+pic.width>0 && pic.x<600){
  	if(pic.y+pic.height>0 && pic.y<330){
      if(typeof(pic.imgOffset)==="number"){
        ctx.drawImage(document.getElementById(pic.name+"Pic"),pic.imgOffset,0,pic.width,pic.height,pic.x,pic.y,pic.width,pic.height);
      }else{
    	ctx.drawImage(document.getElementById(pic.name+"Pic"),0,0,pic.width,pic.height,pic.x,pic.y,pic.width,pic.height);
      }
    }
  }
}//end draw function

function draw(image, xOffset, yOffset, width, height, x, y, boxWidth, boxHeight){
  //draw images on canvas
	if(x+boxWidth>0 && x<600){
  	if(y+boxHeight>0 && y<330){
    	ctx.drawImage(image,xOffset,yOffset,width,height,x,y,boxWidth,boxHeight);
    }
  }
}//end draw function



function colCheck(shapeA, shapeB, solid) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                if(solid===1){
                  shapeA.y += oY;
                }
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if(solid===1){
                  shapeA.x += oX;
                }
            } else {
                colDir = "r";
                if(solid===1){
                  shapeA.x -= oX;
                }
            }
        }
    }
    return colDir;
}

function say(num){
  document.getElementById("text").innerHTML = dialog[num];
}

function openLetter(num){
  document.getElementById("letterText").innerHTML = letters[num];
  document.getElementById("letters").style.display = "block";
}

function closeLetter(){
  document.getElementById("letters").style.display = "none";
  if(progressMarker===0){
    say(2);
  }
}


document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});

//setInterval(update(), 100);
setInterval(function(){update();}, 16);

var dialog = [];
dialog.push("");
dialog.push("A letter with no address or stamp.");
dialog.push("Weird... I'm Mr. Jiblet, accountant from the city of Urr. The world didn't come from anywhere, it's always been there, right? Or maybe it came from the big bang?");
dialog.push("If we're in a computer game then someone must have created the game.");
//"Like aliens or God or future humans?"
//"Yep. So maybe it's the game developer who's been sending you letters."
//"Why would the Developer write to me? If she created the game, she already knows and controls everything that's going to happen. It's impossible for me to surprise her."
//"Who knows why the Developer does what she does. I wouldn't worry about it too much."
//"I can't help worrying. I might not even be a real person!"
//"What the fugnugget is this?"
var letters = [];
letters.push("Dear Mr. Jiblet,<br><br>Who are you?<br>Where does the world come from?");
