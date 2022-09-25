let circles = [];
let pentagons = [];
let squares = [];
let triangles = [];

function preload() {
  for (let i = 0; i < 200; i++) {
    let index = nf(i + 1, 4, 0);
    circles[i] = loadImage(`datatrain/circle${index}.png`);
    pentagons[i] = loadImage(`datatrain/pentagon${index}.png`);
    squares[i] = loadImage(`datatrain/square${index}.png`);
    triangles[i] = loadImage(`datatrain/triangle${index}.png`);
  }
}

function setup() {
  createCanvas(400, 400);
  // background(0);
  //image(squares[0], 0, 0, width, height);

  let options = {
    inputs: [64, 64, 4],
    task: "imageClassification",
    debug: true,
  };
  shapeClassifier = ml5.neuralNetwork(options);

  for (let i = 0; i < circles.length; i++) {
    shapeClassifier.addData({ image: circles[i] }, { label: "circle" });
    shapeClassifier.addData({ image: pentagons[i] }, { label: "pentagon" });
    shapeClassifier.addData({ image: squares[i] }, { label: "square" });
    shapeClassifier.addData({ image: triangles[i] }, { label: "triangle" });
  }
  shapeClassifier.normalizeData();
  shapeClassifier.train({ epochs: 50 }, finishedTraining);

  function finishedTraining() {
    console.log("finished training!");
    shapeClassifier.save();
  }
}
