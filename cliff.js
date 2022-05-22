class Cliff{
    constructor(cliffobj)
    {
        this.hm=cliffobj.howmany;
        this.shadeheight = cliffobj.shade;
        this.shadethic = this.shadeheight/2;

        this.shadeinc = floor(this.shadeheight/this.shadethic);
        this.err = cliffobj.err;
        this.noiseval=cliffobj.nv;
        this.wmin = cliffobj.wmin;
        this.wmax=cliffobj.wmax;
        this.b=color(cliffobj.black);
        this.w=color(219,215,219);
        this.t=color(cliffobj.top);
        this.cliffs = [];
        this.cwids = [];
        this.sas = [];
        this.mb = cliffobj.mb;
        this.opr = cliffobj.oneperrow;
        this.a1 = cliffobj.a1;
        this.a2 = cliffobj.a2;
        this.upwards = cliffobj.upwards;
        this.outlines = cliffobj.outlines;
        this.olc = cliffobj.outlinecolor;
        this.incer = cliffobj.incer;
        this.sw=cliffobj.sw;
        this.miny = cliffobj.miny;
        this.maxy = cliffobj.maxy;


        

        this.createCliffs();
        
    }
    show(){
        // print('gabe');
        if (!this.upwards)
        {
            for (let i=0;i<this.cliffs.length;i++)
            {
                this.drawcliff(this.cliffs[i].x,this.cliffs[i].y,this.cwids[i],this.sas[i]);
               
            }
        }
        else {
            for (let i=this.cliffs.length-1;i>=0;i--)
            {
                this.drawcliff(this.cliffs[i].x,this.cliffs[i].y,this.cwids[i],this.sas[i]);
            }
        }
    }
    createCliffs(){
        for (let i=0;i<this.hm;i++)
        {
            let nx = random(this.mb ,width-this.mb );

            let ny= random(this.miny ,this.maxy );//map(i,0,this.hm-1,0,height);
            if (this.opr){
                nx = this.mb;
                ny = map(i,0,this.hm-1,this.miny ,this.maxy);
            }
            let cliffw =random(this.wmin,this.wmax);
            if (nx+cliffw>width-this.mb ){
                cliffw = width - nx - this.mb;
            }

            let goodtogo=true;
            for (let i=0;i<this.cliffs.length;i++)
            {
                let ybuf= this.cwids[i]/3;
                if (nx >=this.cliffs[i].x-cliffw && nx <=this.cliffs[i].x+this.cwids[i]){
                    if (ny >=this.cliffs[i].y-ybuf && ny <=this.cliffs[i].y+ybuf){
                        goodtogo=false;
                    }
                }
            }

            if (goodtogo || this.opr){            
                this.cliffs.push(createVector(nx,ny));
                this.cwids.push(cliffw);
                this.sas.push(random([90,180,180,270,220,300]));
            }
        }

    }
    drawcliff(x,y,sc,sa){

        let extrang = random(170,360);
        for (let i=0;i<sc;i+=this.incer)
        {


            let curangle = map(i,0,sc-1,sa,400);
            let bendy=sin(curangle)*sc/10;




            let nx = x+i;
            let ny= y + map(noise(y+i*this.noiseval),0,1,0-this.err,this.err) + bendy;

            for (let j=0;j<this.shadeheight;j+=this.shadeinc){
                let tempcolor = lerpColor(this.t,this.b,y/height);
                tempcolor.setAlpha(map(j,0,this.shadeheight-1,this.a1,this.a2));
                strokeWeight(this.sw);
                tempcolor=this.t;
                stroke(tempcolor);

                point(nx,ny+j);
                // circle(nx,ny+j,50);


                if (this.outlines)
                {
                    let tempcolor2 = color(this.olc);
                    stroke(tempcolor2);
                    strokeWeight(1);
                    if (this.upwards)
                    {
                        line(nx,0,nx,ny+j-1);

                    }
                    else{
                        line(nx,height,nx,ny+j-1);
                    }
                    
                }
            }
            
        }

    }
}