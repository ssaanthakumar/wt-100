var vMa 	= ()=>Math.min(Math.max(a.fft[3]/2, 0.1), 0.5)
var vm 		= ()=>a.fft[3]/6
var vM 		= ()=>a.fft[3]
var vL 		= ()=>a.fft[0]*1.5
var vH 		= ()=>a.fft[7]/1.5
var vMM     = ()=> a.fft[3]*5
var vLL		= ()=>(a.fft[0]*2)*5
var vHH 	= ()=>(a.fft[7]/2)*5
var vMMM    = ()=> a.fft[3]*50
var vLLL	= ()=>(a.fft[0]*2)*25
var vHHH 	= ()=>(a.fft[7]/2)*50

var vLFO10 	= ()=>(Math.sin(time))*10
var vLFO 	= ()=>Math.abs(Math.sin(time))
var vLFOB 	= ()=>Math.sin(time)
var vLFO2 	= ()=>Math.abs(Math.sin(time*1.5)+.1)
var vLFO2B 	= ()=>Math.sin(time*10)-1
var vLFO3 	= ()=>Math.abs(Math.sin(time/1.5))
var vLFO3B 	= ()=>Math.sin(time/3)-1
var vT 		= ()=>time
var vTR		= ()=>-time
var vTP 	= ()=>time/2-(a.fft[6])
var vMouseX = ()=>mouse.x*0.0005
var vMouseY = ()=>mouse.y*0.0005

var vCC0 	= .2
var vCC1 	= vLFO
var vCC2 	= vLFO
var vCC3 	= vLFO3
var vCC4 	= vLFO3
var vShape	= 4
var vCC6 	= vLFO2

var vCC10 	= .8
var vCC100 	= 5
var vCC1d 	= vm
var vCC20 	= 1
var vCC30 	= 1.2
var vCC40 	= 1.9


//add/sub/blend/mult//layer/diff/mask
a.show();a.setBins(12);a.setCutoff(0);a.setScale(3);
a.setSmooth(.5); bpm = 30; speed = .05
//SCREENSHARE
s0.initScreen()


//LAYER 1 (o0)
src(s0)
//.diff(osc(vCC10,vCC1,vCC1).modulate(src(s0),vCC1d),vCC1)
//.modulate(src(o0),vCC1d)
//.contrast(vCC6)
.scrollY(2,0.2)
.diff(shape(100).modulate(noise(1),()=>a.fft[1]))
.scale(1.5)
//.repeat(3,1)
//.hue(vLFO2)
.out(o0)

//LAYER 2 - WIGGLYLINES (o1) 
src(o0)
.blend(shape(1,.001,vLFO).diff(shape(2,.001,vLFO3).scrollY(vm)).color(vLFO,vLFOB,vLFO3).hue(.4).modulate(osc(20,.8,2).modulate(noise(6,6),.05)).diff(shape(1,.005,vLFO3).diff(shape(2,.002,vLFO2)).color(vLFO,vLFOB,vLFO3).hue(vH).modulate(osc(20,.8,2).modulate(noise(6,6),.08))).saturate(vCC6),vCC2)
//.luma(.5)
.out(o1)

//LAYER 3 - FEEDBACK(o2)
src(o1)
.sub(src(o2).posterize(10,2).modulate(src(o1),vm).scale(.99),vCC3)
.contrast(vCC6)
.out(o2)

//LAYER 4 - REPEATING SHAPES (o3)
src(o2)
.add(shape(vShape,.6,.04).diff(shape(vShape,.59,0.001)).rotate(vLFO2).repeat(vShape,vShape).color(vLFO2,vLFO,vLFO3).modulate(src(o0),vCC1d))
.scroll(vT,vT)
.scale(vCC4)
//.thresh(.4) //Black and White for end
.out(o3)

//ACTIVE LAYER
render(o0)
