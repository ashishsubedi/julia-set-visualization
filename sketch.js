/*
    Julia Set Visualization
    Author: Ashish Subedi   
    Github: github.com/ashishsubedi

*/


//Equation for julia set
// zn+1 = zn+c, c is constant complex number
// Complex number = a+bi => [a,b] in our represntation
//0.7855e^ipi
let angle = Math.PI/2;

let cx,cy;
let w;
let R = 2.0;
const max_iter = 10;
let p;

function setup() {
    createCanvas(300, 300);
    background(0);
    frameRate(30);
  
    [cx,cy] = [0.7855*cos(angle),0.7855*sin(angle)]
    p = createP(frameRate());

}

function draw() {
    let value;
    // colorMode(HSB);
    angle+=0.05;
    if(angle > 2*Math.PI) angle = 0;

    // ca+=0.1;
    // cb+=0.2;
    [cx,cy] = [cos(angle),sin(angle)]
    loadPixels();
    for(let y=0;y<height;y++){
        for(let x=0;x<width;x++){  
            //Calculate julia set value
            let iter = 0;
            let zx = map(x,0,width,-R,R);
            let zy = map(y,0,height,-R,R);
            
            while(zx*zx+zy*zy<R*R && iter < max_iter){
                [zx,zy] = complexMul(zx,zy,zx,zy);
                zx += cx;
                zy += cy;
                iter++;
            }
    
            if(iter == max_iter) {
                value = color(0);
            }
            else{
                value = color(iter/max_iter*255);
            } 
            set(width-x,y,value);
      
        }
    }
    updatePixels();
    p.html("FPS: "+round(frameRate())); 
    

    // noLoop();
}

function complexMul(a,b,c,d){
    return [a*c-b*d,a*d+b*c]
}

