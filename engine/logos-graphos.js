(() => {
'use strict';
const TAU=Math.PI*2, core=document.getElementById('holoCore'), hb=document.getElementById('heartbeat');
const qa=s=>document.querySelector(s), orbits=[...document.querySelectorAll('.orbit')], halos=[...document.querySelectorAll('.halo')], geos=[...document.querySelectorAll('.geometry')];
const utc=document.getElementById('utcClock'), local=document.getElementById('localClock'), zone=document.getElementById('zoneLabel'), epoch=document.getElementById('epoch'), phase=document.getElementById('phase'), frame=document.getElementById('frameState');
const sense=document.getElementById('sense'), think=document.getElementById('think'), sync=document.getElementById('sync');
const tz=Intl.DateTimeFormat().resolvedOptions().timeZone || 'LOCAL'; zone.textContent=tz;
function clocks(now){
 const d=new Date(now);
 local.textContent=new Intl.DateTimeFormat('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(d);
 utc.textContent=d.toISOString().slice(11,19)+' UTC';
 epoch.textContent=Math.floor(now/1000);
}
function render(now){
 const sec=now/1000;
 // Absolute-time phase: reopening the page reconstructs the current state from Unix time.
 const p=(sec*6)%360, slow=(sec*1.15)%360, medium=(sec*2.35)%360;
 phase.textContent=p.toFixed(3)+'°';
 const pulse=.88+.18*((Math.sin(TAU*sec)+1)/2);
 hb.style.transform=`scale(${pulse})`;
 hb.style.opacity=(.65+.35*((Math.sin(TAU*sec)+1)/2)).toFixed(3);
 halos[0].style.transform=`rotateZ(${slow}deg) rotateX(67deg)`;
 halos[1].style.transform=`rotateZ(${-medium}deg) rotateY(64deg)`;
 orbits[0].style.transform=`rotateX(66deg) rotateZ(${p}deg)`;
 orbits[1].style.transform=`rotateY(67deg) rotateZ(${-p*.73+60}deg)`;
 orbits[2].style.transform=`rotateX(55deg) rotateY(42deg) rotateZ(${p*.47+120}deg)`;
 geos[0].style.transform=`rotateZ(${p*.36}deg) translateZ(28px)`;
 geos[1].style.transform=`rotateZ(${-p*.58+45}deg) translateZ(45px)`;
 const drift=Math.sin(sec*.32)*3;
 core.style.transform=`rotateX(${drift*.35}deg) rotateY(${drift}deg)`;
 sense.textContent=(98.5+.3*Math.sin(sec*.23)).toFixed(1)+'%';
 think.textContent=(97.7+.3*Math.sin(sec*.19+1)).toFixed(1)+'%';
 sync.textContent=(99.1+.15*Math.sin(sec*.17+2)).toFixed(1)+'%';
 frame.textContent=document.hidden?'RESYNC':'SYNC';
 requestAnimationFrame(render);
}
setInterval(()=>clocks(Date.now()),250); clocks(Date.now());
document.addEventListener('visibilitychange',()=>{frame.textContent=document.hidden?'PAUSED / ABSOLUTE TIME':'RESYNC';});
requestAnimationFrame(render);

// Lightweight network field; visual only, no external network access.
const canvas=document.getElementById('networkCanvas'), ctx=canvas.getContext('2d');
let pts=[];
function resize(){const d=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*d;canvas.height=innerHeight*d;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);pts=Array.from({length:Math.min(70,Math.floor(innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12}));}
function net(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x=(p.x+p.vx+innerWidth)%innerWidth;p.y=(p.y+p.vy+innerHeight)%innerHeight;ctx.fillStyle='rgba(60,235,255,.35)';ctx.fillRect(p.x,p.y,1,1)}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){let a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,dd=dx*dx+dy*dy;if(dd<11000){ctx.strokeStyle=`rgba(30,210,240,${.07*(1-dd/11000)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(net)}
addEventListener('resize',resize,{passive:true});resize();net();
})();