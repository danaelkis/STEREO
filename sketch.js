let beginX = 30.0;  // Initial x-coordinate
let beginY = 320.0;  // Initial y-coordinate
let endX = 32.0;   // Final x-coordinate
let endY = 320.0;   // Final y-coordinate
let distX;          // X-axis distance to move
let distY;          // Y-axis distance to move
let exponent = 10;   // Determines the curve
let x = 0.0;        // Current x-coordinate
let y = 0.0;        // Current y-coordinate
let step = 0.01;    // Size of each step along the path
let pct = 0.0;      // Percentage traveled (0.0 to 1.0)
let img;
let clicks = 0;

var changeVolume = -36;

const panner = new Tone.Panner3D().toMaster()
panner.panningModel = 'HRTF'

var reverb = new Tone.Reverb().toMaster();


const synth = new Tone.FMSynth({
"harmonicity"  : 3 ,
"modulationIndex"  : 10 ,
"detune"  : 0 ,
oscillator  : {
"type"  : "sine"
}  ,
envelope  : {
"attack"  : 0.01 ,
"decay"  : 0.01 ,
"sustain"  : 1 ,
"release"  : 0.5
}  ,
modulation  : {
"type"  : "square"
}  ,
modulationEnvelope  : {
"attack"  : 0.5 ,
"decay"  : 0 ,
"sustain"  : 1 ,
"release"  : 0.5
}
}).connect(panner);


const synth3 = new Tone.PolySynth(6, Tone.Synth).connect(panner);
synth3.set("detune", -1200);
synth3.volume.value =4;

var vibrato =  new Tone.Vibrato({
"maxDelay"  : 0.5 ,
"frequency"  : -12 ,
"depth"  : 0.3 ,
"type"  : "sine"
}).connect(panner);
var crusher = new Tone.BitCrusher(15).connect(panner);
var synth4 = new Tone.PluckSynth().connect(vibrato);
synth4.volume.value =-14;


var autoWah = new Tone.AutoWah(50, 6, -30).connect(panner);
var duoSynth = new Tone.DuoSynth().connect(autoWah);
autoWah.Q.value = 4;


var JCReverb = new Tone.JCReverb(0.8).connect(panner);
var delay = new Tone.Distortion(0.2).connect(panner);
var AMSynth = new Tone.AMSynth().chain(delay, JCReverb);



setInterval(() => {
  synth.triggerAttackRelease(20);
}, 0.1)

setInterval(() => {
  synth3.triggerAttackRelease(80);
}, 0.1)


function setup() {
  // background(0);
  var cnv = createCanvas(screen.width-20, screen.height-20);
  // background(10,10,10);
  noStroke();
  distX = endX - beginX;
  distY = endY - beginY;
  img = loadImage('Screen Shot 2019-03-31 at 16.54.32.png');
  cnv.position(300,0);
}


function draw() {
  fill(0,10);
  rect(0,0,width,height);
  pct += step;
  if (pct < 1.0) {
    x = beginX + (pct * distX);
    y = beginY + (pow(pct, exponent) * distY);
  }
  // push();
  fill(255);
  ellipse(x, y, 4, 4);
  // pop();
  panner.setPosition(x/1000, y/1000, 1);
  print(clicks);

  if (clicks == 3 || clicks == 8) {
  print("adding a second synth");
  synth4.triggerAttackRelease("B2", "8n");
}

    if (clicks == 2) {
  synth3.triggerAttackRelease(["C4", "E4", "A4"], "4n");
    }

  if (clicks == 4 || clicks == 6) {
  print("adding a third synth");
  duoSynth.triggerAttackRelease("C4", "8n")
}

    if (clicks == 5 || clicks == 6) {
  print("adding a third synth");
  AMSynth.triggerAttackRelease("A1", "8n");}

}


function mousePressed() {
  pct = 0.0;
  beginX = x;
  beginY = y;
  endX = mouseX;
  endY = mouseY;
  distX = endX - beginX;
  distY = endY - beginY;
  push();
  fill(255,0,0);
  rect(x,y,4,4);
  pop();
  clicks ++;
}
