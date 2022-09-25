let shapeClassifier;
let canvas;
let resultDiv;
let input;
let video;
let red;
let green;
let blue;

function setup() {
  canvas = createCanvas(400, 400);
  background(255);
  video=createCapture(VIDEO);
  video.size(64, 64);

  red=random(100);
  green=random(100);
  blue=random(100);

  let options = {
    inputs: [64, 64, 4],
    task: "imageClassification",
  };
  shapeClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };

  shapeClassifier.load(modelDetails, modelLoaded);
  resultDiv = createDiv('loading model');
}

function modelLoaded() {
  console.log("model ready!");
  classifyImage();
}

function classifyImage() {
  input = createGraphics(64, 64);
  input.copy(canvas,0,0,400,400, 0,0,64,64);
  //image(input, 0, 0);
  shapeClassifier.classify({ image: input }, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    results;
  }
  let label = results[0].label;
  let confidence = nf(100*results[0].confidence, 2, 2);
  resultDiv.html(`${label} ${confidence}%`);
  //console.log(results);
  classifyImage();
}

function draw() {
  
    //image(video,0,0,width,height);

 if(mouseIsPressed){
      strokeWeight(6);
      stroke(red, green, blue);
      line(mouseX, mouseY, pmouseX, pmouseY);
  }
  if(keyIsPressed && keyCode === 67){
    red= random(100);
    green= random(100);
    blue= random(100);
    background(255);
  }

  /*stroke(0);
  noFill();
  strokeWeight(2);
  rectMode(CENTER);
  rect(width / 2, height / 2, 60);*/
}
