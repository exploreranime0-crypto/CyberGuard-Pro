const platforms=[
{name:"Instagram",icon:"◎",hosts:["instagram.com","www.instagram.com"],url:"https://www.instagram.com/"},
{name:"Facebook",icon:"f",hosts:["facebook.com","www.facebook.com"],url:"https://www.facebook.com/"},
{name:"YouTube",icon:"▶",hosts:["youtube.com","www.youtube.com","youtu.be"],url:"https://www.youtube.com/"},
{name:"X",icon:"𝕏",hosts:["x.com","www.x.com","twitter.com","www.twitter.com"],url:"https://x.com/"},
{name:"TikTok",icon:"♪",hosts:["tiktok.com","www.tiktok.com"],url:"https://www.tiktok.com/"},
{name:"LinkedIn",icon:"in",hosts:["linkedin.com","www.linkedin.com"],url:"https://www.linkedin.com/"},
{name:"WhatsApp",icon:"◉",hosts:["whatsapp.com","www.whatsapp.com"],url:"https://www.whatsapp.com/"},
{name:"Telegram",icon:"➤",hosts:["t.me","telegram.me","telegram.org"],url:"https://telegram.org/"},
{name:"Discord",icon:"◌",hosts:["discord.com","www.discord.com","discord.gg"],url:"https://discord.com/"},
{name:"Reddit",icon:"●",hosts:["reddit.com","www.reddit.com"],url:"https://www.reddit.com/"}
];

window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("hide"),900));

const socialGrid=document.getElementById("socialGrid");
platforms.forEach(p=>{
 const a=document.createElement("a");
 a.href=p.url;a.target="_blank";a.rel="noopener noreferrer";
 a.innerHTML=`<span class="social-icon">${p.icon}</span><b>${p.name}</b><small>OFFICIAL SITE ↗</small>`;
 socialGrid.appendChild(a);
});

function detectPlatform(value){
 try{
  const u=new URL(value);
  if(!["http:","https:"].includes(u.protocol)) return null;
  return platforms.find(p=>p.hosts.includes(u.hostname.toLowerCase()))||null;
 }catch{return null}
}

const form=document.getElementById("securityForm");
const input=document.getElementById("linkInput");
const modal=document.getElementById("modal");
const title=document.getElementById("resultTitle");
const text=document.getElementById("resultText");
const actions=document.getElementById("resultActions");

form.addEventListener("submit",e=>{
 e.preventDefault();
 const value=input.value.trim();
 const platform=detectPlatform(value);
 input.value="";
 actions.innerHTML="";
 if(platform){
  title.textContent=`${platform.name} privacy check`;
  text.textContent=`A ${platform.name} URL was recognized locally. CyberGuard Pro cannot directly change a third-party account. Use the official service to manage privacy, 2FA/passkeys, sessions and connected apps.`;
  const a=document.createElement("a");
  a.href=platform.url;a.target="_blank";a.rel="noopener noreferrer";a.textContent=`Open ${platform.name}`;
  actions.appendChild(a);
 }else{
  title.textContent="Link not recognized";
  text.textContent="Enter a valid public profile URL from one of the supported platforms.";
 }
 modal.classList.remove("hidden");
});

document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.add("hidden")});
document.getElementById("year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll("[data-count]").forEach(el=>{
 const target=Number(el.dataset.count);
 if(target===0){el.textContent="0";return}
 let n=0;const step=Math.max(1,Math.ceil(target/35));
 const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n;if(n>=target)clearInterval(timer)},30);
});

const glow=document.getElementById("cursorGlow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

document.querySelectorAll(".magnetic").forEach(el=>{
 el.addEventListener("pointermove",e=>{
  const r=el.getBoundingClientRect();
  const x=(e.clientX-r.left-r.width/2)*.12;
  const y=(e.clientY-r.top-r.height/2)*.12;
  el.style.transform=`translate(${x}px,${y}px)`;
 });
 el.addEventListener("pointerleave",()=>el.style.transform="");
});

document.querySelectorAll(".tilt").forEach(card=>{
 card.addEventListener("pointermove",e=>{
  const r=card.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5;
  const y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(700px) rotateX(${y*-6}deg) rotateY(${x*6}deg) translateY(-5px)`;
 });
 card.addEventListener("pointerleave",()=>card.style.transform="");
});

const navAnchors=[...document.querySelectorAll(".nav nav a")];
const sections=[...document.querySelectorAll("main section[id]")];
window.addEventListener("scroll",()=>{
 let current="home";
 sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});
 navAnchors.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

document.getElementById("menu").onclick=()=>{
 const nav=document.querySelector(".nav nav");
 nav.classList.toggle("mobile-open");
};

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
let particles=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;particles=Array.from({length:Math.min(90,Math.floor(innerWidth/16))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+.3,v:Math.random()*.25+.05,a:Math.random()*.6+.15}))}
function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 particles.forEach(p=>{
  p.y-=p.v;if(p.y<0)p.y=canvas.height;
  ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(38,230,255,${p.a})`;ctx.fill();
 });
 requestAnimationFrame(draw);
}
resize();draw();addEventListener("resize",resize);
