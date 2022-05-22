function setup() {
  createCanvas(400, 700);
  angleMode(DEGREES);
  pixelDensity(1);
}

function draw() {
  let ypos = height/2 + random(0,200);
  
  let colors1 = ['#003049','#d62828','#f77f00'];
  let colors2 = ['#b9e28c','#9eadc8','#f77f00','#96031a'];
  let colors3 = ['#99ddc8','#95bf74','#659b5e','#556f44'];
  let colors4 = ['#fec601','#ea7317','#73bfb8','#3da5d9'];
  let colors5 = ['#492c1d','#b18fcf','#b279a7','#ffa987'];
  let colors6 = ['#ffa987','#b18fcf','#b279a7','#492c1d'];
  let colors = random([colors1,colors2,colors3,colors4,colors5,colors6]);
  background(colors[2]);
  drawmountain(ypos,colors[0]);
  drawvegas(ypos,colors);
  let planecolor = color(111);
  drawplane(ypos,planecolor);




  noLoop();

}
function drawplane(ys,c){
  let thicc = 90;
  stroke(10);
  fill(c);
  //engines
  rect(width/4-15,ys-thicc,30,thicc);
  rect(width/4*3-15,ys-thicc,30,thicc);

  //wings
  beginShape()
  vertex(0,ys+thicc);
  vertex(0,ys);
  vertex(width/2,ys-thicc);
  vertex(width,ys);
  vertex(width,ys+thicc);
  vertex(width/2,ys+thicc/2);
  vertex(0,ys+thicc);
  endShape();

  //body
  beginShape();
  curveVertex(width/2,ys+5*thicc); //bottom
  curveVertex(width/2,ys+5*thicc); //bottom again
  curveVertex(width/2-thicc,ys+thicc); //bottom left
  curveVertex(width/2-thicc,ys-thicc*2); //mid left
  curveVertex(width/2-80,ys-thicc*2.5); //top left

  curveVertex(width/2,ys-3*thicc); //top

  curveVertex(width/2+80,ys-thicc*2.5); //top right
  curveVertex(width/2+thicc,ys-thicc*2); //mid right
  curveVertex(width/2+thicc,ys+thicc); //bottom right
  curveVertex(width/2,ys+5*thicc); //bottom again
  curveVertex(width/2,ys+5*thicc); //bottom again
  
  
  endShape();
  //accessories
  noStroke()
  fill(0);
  arc(width/2,ys-thicc*2.5,110,50,180,0);


}
function drawmountain(ypos,col){
  let newcol = color(col);
  newcol.setAlpha(15);
  var bigcliff = {
    howmany: random([5,7,30]),
    shade: random([1,5]),
    err: random([30,50,90]),
    nv: random([.01,.01,.1]),
    wmin: width,
    wmax: width,
    mb: 0,
    black: color(19, 15, 19),
    top: color(255, 255, 255),//top:color('#bb9457'),
    oneperrow: true,
    a1: 255,
    a2: 0,
    upwards: false,
    outlines: true,
    outlinecolor: newcol,
    incer:1,
    sw:1,
    miny : 0,
    maxy : ypos
  }
  let ncliff = new Cliff(bigcliff);
  ncliff.show();

}
function drawvegas(ypos,colors){
  let stripes = 10;
  let startingfrac = .5;
  let stripewid = width/stripes;
  let stripeY = ypos;//height*startingfrac;



  for (let i=0;i<stripes;i++){
    let colorind = i % colors.length;
    let mycolor = colors[colorind];
    let nx = map(i,0,stripes,0,width);
    noStroke();
    fill(mycolor);
    rect(nx,stripeY,stripewid,height);
  }

}
