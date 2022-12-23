img = "";
Status = "";
objects = [];

function preload() {
    img = loadImage("https://i.postimg.cc/brMFXq21/th.jpg");
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting object";
}

function modelloaded() {
    console.log("COCOssd model initiated");
    Status = true;
    console.log(Status);
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error)
    {
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 640, 420);
    if(Status != ""){
        for (var i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            textSize(25);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}

