//important matterJS variables
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world, body;

var board, die;
var bluePiece, blueSpaces, blueMoved;
var redPiece, redSpaces, redMoved;
var winner 

function preload(){
  board = loadImage("sprites/bg3.jpg");
  winner= loadImage("sprites/winner.jpg");
}

function drawDie(x, y, side){
  fill("white");
  strokeWeight(8);
  rectMode(CENTER);
  rect(x, y, 100, 100, 20);

  fill("black")
  strokeWeight(3);
  if(side === 1){
    circle(x, y, 20);
  }else if(side === 2){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
  }else if(side === 3){
    circle(x - 25, y - 25, 20);
    circle(x, y, 20);
    circle(x + 25, y + 25, 20);
  }else if(side === 4){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  }else if(side === 5){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x, y, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  }else if(side === 6){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
    circle(x - 25, y, 20);
    circle(x + 25, y, 20);
  }
}

function checkForBlueUpsAndDowns(){
  //ladders
  if(blueSpaces === 4){
    Matter.Body.setVelocity(bluePiece.body, {x: 7, y: -13});
    blueSpaces = 25;
  }

  if(blueSpaces === 13){
    Matter.Body.setVelocity(bluePiece.body, {x: -14, y: -20});
    blueSpaces = 46;
  }

  if(blueSpaces ===33){
    Matter.Body.setVelocity(bluePiece.body, {x: 7, y: -6});
    blueSpaces = 49;
  }

  if(blueSpaces === 42){
    Matter.Body.setVelocity(bluePiece.body, {x: 7, y: -13});
    blueSpaces = 63;
  }
  if(blueSpaces === 50){
    Matter.Body.setVelocity(bluePiece.body, {x: -5, y:-15});
    blueSpaces = 69;
  }
  if(blueSpaces === 62){
    Matter.Body.setVelocity(bluePiece.body, {x: -8, y: -12});
    blueSpaces = 81;
  }

 if(blueSpaces === 74){
    Matter.Body.setVelocity(bluePiece.body, {x:12, y: -13});
blueSpaces = 92;
 }
 
  

  //snakes
  if(blueSpaces === 43){
   Matter.Body.setVelocity(bluePiece.body, {x:0, y: 20});
   blueSpaces = 18;
  }

  if(blueSpaces === 27){
    Matter.Body.setVelocity(bluePiece.body, {x: -12, y: 13});
   blueSpaces = 5;
  }

  if(blueSpaces === 40){
    Matter.Body.setVelocity(bluePiece.body, {x:13, y:20});
   blueSpaces = 3;
  }

  if(blueSpaces === 54){
    Matter.Body.setVelocity(bluePiece.body, {x: 19, y:13});
    blueSpaces = 31;
  }

  if(blueSpaces === 66){
    Matter.Body.setVelocity(bluePiece.body, {x:-5, y:15});
   blueSpaces = 45;
  }

  if(blueSpaces === 76){
    Matter.Body.setVelocity(bluePiece.body, {x:-1, y: 20});
    blueSpaces = 58;
  }

  if(blueSpaces === 89){
    Matter.Body.setVelocity(bluePiece.body, {x: -7, y: 18});
    blueSpaces = 53;
  }
  if(blueSpaces === 99){
    Matter.Body.setVelocity(bluePiece.body, {x: -10, y: 35});
    blueSpaces = 41;
  }
}


function setup() {
  //create canvas
  createCanvas(600,725);

  //setup
  engine = Engine.create();
  world = engine.world;

  //set gravity
  engine.world.gravity.y = 0;

  //create the die array
  die = [false, 1, 0, false, 0];
  //item 0 = if die is rolling
  //item 1 = current number displayed
  //item 2 = times to die will change
  //item 3 = blinking time or not
  //item 4 = blinking counter
  //red or blue...true means red is moving

  //create the pieces
  bluePiece = new BluePiece(20, 628, 40, 40);
  blueSpaces = 0;
  blueMoved = false;

 // redPiece = new RedPiece(20, 600, 40, 40);
  //redSpaces = 0;
  //redMoved = true;
 // console.log("value when red is moving is " )
}

function draw() {
  //draw the background
  background(158, 113, 79);  

  //update the engine
  Engine.update(engine);

  //draw the board
  image(board, 0, 0, 600, 600);
  if(blueSpaces === 100)
   { image(winner, 0, 0, 600, 600);
   } 
   else{ image(board, 0, 0, 600, 600);
   }
  //display the pieces
  bluePiece.display();
 // redPiece.display();

  //add a divider
  stroke("black");
  strokeWeight(8);
  
  line(0, 602.5, 600, 602.5);
// if(die[5]===false)
// {
  //draw die or make it blink or move it
  if(die[3] === false ){
    drawDie(525, 665, die[1]);
  }else{
    if(die[4] % 2 === 0){
      drawDie(525, 665, die[1]);

      if(blueMoved === false && blueSpaces !== 100){
        if(blueSpaces % 10 === 0){
          bluePiece.moveUp();
        }else{
          var num = Math.floor(blueSpaces / 10);
          if(num === 0 || num === 2 || num === 4 || num === 6 || num === 8){
            bluePiece.moveRight();
          }else{
            bluePiece.moveLeft();
          }
        }
        blueMoved = true;
        blueSpaces++;
        console.log(blueSpaces);
       
      }
    }
   
    if(frameCount % 15 === 0){
      die[4]--;
      blueMoved = false;

      if(die[4] === 0){
        die[3] = false;
        die[0] = false;
        checkForBlueUpsAndDowns();
       
      }
    }
   
 // }
 // die[5]=true; 
}

  
  //if(die[5]===true){
  // red movement
/*  if(die[3] === true ){
    drawDie(525, 665, die[1]);
  }else{
    if(die[4] % 2 === 0){
      drawDie(525, 665, die[1]);
       
      if(redMoved === true && redSpaces !== 100){
        if(redSpaces % 10 === 0){
          redPiece.moveUp();
        }else{
          var num = Math.floor(redSpaces / 10);
          console.log("value of num in red space is" + num)
          if(num === 0 || num === 2 || num === 4 || num === 6 || num === 8){
           redPiece.moveRight();
          }else{
           redPiece.moveLeft();
          }
        }
        redMoved =false;
        redSpaces++;
        console.log(redSpaces);
       
      }
    }
   
    if(frameCount % 15 === 0){
      die[4]--;
      redMoved =false;

      if(die[4] === 0){
        die[3] =false;
        die[0] = false;
       // checkForRedUpsAndDowns();
        
      }
    }
   
  }
//  die[5]=false;
//}*/
  

   
    

  //make the die roll
  if(die[0] === true && die[2] > 0 && frameCount % 5 === 0){
    die[2]--;

    die[1]++;
    if(die[1] > 6){
      die[1] = 1;
    }

    if(die[2] === 0){
      die[3] = true;
      die[4] = die[1] * 2;
    }
  }



  
}
  
function keyPressed(){
  if (keyCode === 32 && die[0] === false) {
    die[0] = true;
    die[2] = round(random(12, 18));
  }
}
  