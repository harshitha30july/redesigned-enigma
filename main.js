status = "";
object = [];

function preload() {
    
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("obj_name").value;
}



function modelLoaded() {
    console.log("modal loaded");
    status = "true";
    
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
      
        objectDetector.detect(video, gotResults);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            console.log(object[i].label);
            fill("green");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + " %", object[i].x+15, object[i].y+15);
            noFill();
            stroke("green");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("no_of_objects").innerHTML = object_name + " Found !";
            }
            else{
                document.getElementById("no_of_objects").innerHTML = object_name + " Not found !"; 
            }
        }
    }



}