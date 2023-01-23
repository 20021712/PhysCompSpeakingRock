let port;
let connectBtn;
let soundA, soundB;

function preload (){
  soundA = loadSound ('inside_mix.mp3');
  soundB = loadSound ('raka.mp3');
  // place your audio file in the folder named sounds within the libraries and with the sketch pages
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
//create a Serial connection
  port = createSerial();
  //Serial.println("val");
  

//create a Button element to press for connecting Arduino
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20); //position of button
  connectBtn.mousePressed(connectBtnClick); //if button is clicked run connectBtnClick function below


  //audio
  soundB.loop();
  soundB.amp(0.2);
}

function draw() {
  
    // reads in complete lines and prints them at the
  // bottom of the canvas
  let val = port.readUntil("\n"); //important keep
  
if (val.length > 0) { //important keep
   //visual graphics
    background(0);
    //display the incoming data
    fill(255);
    text(val, 10, height-20);
    
    //do something with the data!
    /*
    noStroke();
    fill(255,200,0);
    //x,y,w,h
    ellipse(200,200,val,val);
    */



//put your audio trigger stuff here

  //top circle
  let x2 = 700;
  let y2 = 350;
  let size2 = 100;

  let distance2 = dist(x2, y2, val, val);

  //let distance2 = dist(x2, y2, mouseX, mouseY); //to make this distance bases change the mouseX/mouseY to distance
  let alpha2 = map(distance2, 0, 300, 0, 255);
  fill(70, 50, 25);
  ellipse(440, 600, 80);

  //b left circle
  let x3 = 800;
  let y3 = 350;
  let size3 = 100;
  let distance3 = dist(x3, y3, mouseX, mouseY);
  let alpha3 = map(distance3, 0, 300, 0, 255);
  fill(90, 80, 20);
  ellipse(700, 90, 80);
  
  //b right circle
  let x4 = 500;
  let y4 = 350;
  let size4 = 100;
  let distance4 = dist(x4, y4, mouseX, mouseY);
  let alpha4 = map(distance4, 0, 300, 0, 255);
  fill(80, 60, 15);
  ellipse(960, 605, 80);

  let x = 700;
  let y = 350;
  let size = 100;
  let distance = dist(x, y, mouseX, mouseY); // this is what you have to add to each circle bc as of rn they are only controlled by the mouse

  let alpha = map(distance, 0, 300, 0, 255);

  noStroke();
  fill(255, distance);
  //ellipse(x, y, size, size);

  text (distance, 20, 20);
  
  //try changing vol to use val instead of mouseX
  let vol = map(val, 0, 200, 0.5, 0.8);
  //let vol = map(mouseX, 0, width, 0.0, 0.2);
  let r = map(val, 0, height, 0.4, 2.0);
  soundB.amp(vol);
  soundB.rate(r);

  let vol2 = map(val, 0, width, 0.6, 0.9);
  let r2 = map(val, 0, height, 0.1, 2.8);
  soundA.amp(vol2);
  soundA.rate(r2);

  translate(width/2, height/2);
//noise()
beginShape()
//fill(20, 150, 30, 200)
//fill(150, 70, 10, 240);
fill(255);
  for (var i = 0; i < 359; i++){
    

  
    var p1Min = map(sin(val), -1, 6, 50, 100);
    var p1Max = map(sin(val * 5), -1, 1, 100, 0);

    var p2Min = map(sin(val/3), -2, 7, 100, 50);
    var p2Max = map(sin(val), -1, 1, 0, 150);

    var p3Min = map(sin(val), 1, 9, 100, 50);
    var p3Max = map(sin(val/3), -1, 1, 0, 100);

    var p4Min = map(sin(val/2 - 20), 3, 5, 100, 50);
    var p4Max = map(sin(val), -1, 1, 0, 100);
    
    console.log(val);
    
    var p1 = map(sin(i * 3), -1, 1, p1Min, p1Max);
    var p2 = map(sin(i * 4 + 6), -1, 1, p2Min, p2Max);
    var p3 = map(sin(i * 10), -1, 1, p3Min, p3Max);
    var p4 = map(sin(i * 4), -1, 1, p4Min, p4Max);
    var p = p1 + p2 + p3 + p4
    var c = p * cos(i);
    var q = p * sin(i);
    //vertex(x/2, y/2);
    vertex(c, q);
  
  }
endShape(CLOSE)
}

//try adding rotation function
//try the size
/*beginShape()
for (var i = 0; i < 359; i++){

 

  var p1Min = map(sin(framecount), -1, 1, 50, 100);
  var p1Max = map(sin(frameCount * 5), -1, 1, 100, 0);

  var p2Min = map(sin(frameCount/2+3), -1, 1, 100, 50);
  var p2Max = map(sin(frameCount), -1, 1, 0, 100);

  var p3Min = map(sin(frameCount), -1, 1, 100, 50);
  var p3Max = map(sin(frameCount/3), -1, 1, 0, 100);

  var p4Min = map(sin(frameCount/2-40), -1, 1, 100, 50);
  var p4Max = map(sin(frameCount), -1, 1, 0, 100);

  var p1 = map(sin(i * 6), -1, 1, p1Min, p1Max);
  var p2 = map(sin(i * 4 +6), -1, 1, p2Min, p2Max);
  var p3 = map(sin(i * 10), -1, 1, p3Min, p3Max);
  var p4 = map(sin(i * 4), -1, 1, p4Min, p4Max);
  var p = p1 + p2 + p3 + p4
  var c = p * cos(i);
  var q = p * sin(i);
  vertex(c, q);

}
endShape(CLOSE)
}
*/


/////    
//end of loop

  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }
}

//this function runs when 'connect' button is clicked
function connectBtnClick() {
  if (!port.opened()) {//if port is not already open/connected
    port.open('Arduino', 9600); //open a connection at baud rate 9600
  } else { //otherwise close port connection 
    port.close();
  }
}

function keyPressed(){
  if (key == 'a'){
    soundA.play();
    soundB.stop();
  
  }
  else if (key == 'b'){
    soundB.play();
    soundA.stop();
  }

}
