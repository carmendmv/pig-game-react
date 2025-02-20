(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))y(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&y(a)}).observe(document,{childList:!0,subtree:!0});function L(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function y(e){if(e.ep)return;e.ep=!0;const t=L(e);fetch(e.href,t)}})();document.querySelector("#app").innerHTML=`
 <main>
      <section class="player player--0 player--active">
        <h2 class="name" id="name--0">Player 1</h2>
        <p class="score" id="score--0">43</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--0">0</p>
        </div>
      </section>
      <section class="player player--1">
        <h2 class="name" id="name--1">Player 2</h2>
        <p class="score" id="score--1">24</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--1">0</p>
        </div>
      </section>
      <img src="dice-5.png" alt="Playing dice" class="dice" />
      <button class="btn btn--new">🔄 New game</button>
      <button class="btn btn--roll">🎲 Roll dice</button>
      <button class="btn btn--hold">📥 Hold</button>
    </main>
`;const d=document.querySelector(".player--0"),u=document.querySelector(".player--1"),v=document.getElementById("score--0"),S=document.getElementById("score--1"),f=document.getElementById("current--0"),g=document.getElementById("current--1"),C=document.querySelector(".btn--new"),m=document.querySelector(".btn--roll"),p=document.querySelector(".btn--hold"),s=document.querySelector(".dice");let i,o,n,l;const P=100,b=()=>{i=[0,0],o=0,n=0,l=!0,v.textContent=0,S.textContent=0,f.textContent=0,g.textContent=0,s.classList.add("hidden"),d.classList.remove("player--winner"),u.classList.remove("player--winner"),m.disabled=!1,p.disabled=!1,d.classList.add("player--active"),u.classList.remove("player--active")},E=()=>i[n]>=P?(document.querySelector(`.player--${n}`).classList.add("player--winner"),s.classList.add("hidden"),m.disabled=!0,p.disabled=!0,l=!1,!0):!1,I=()=>{if(!l)return;const r=Math.trunc(Math.random()*6)+1,c=new Image;c.onload=()=>{s.classList.remove("hidden"),s.src=`dice-${r}.png`},c.onerror=()=>{console.error(`Failed to load dice image: dice-${r}.png`),s.classList.add("hidden")},c.src=`dice-${r}.png`,r!==1?w(r):h(!0)};function w(r){l&&(o+=r,document.getElementById(`current--${n}`).textContent=o)}function h(r=!1){l&&(!r&&(i[n]+=o,document.getElementById(`score--${n}`).textContent=i[n],E())||(q(),d.classList.toggle("player--active"),u.classList.toggle("player--active"),n=n===0?1:0))}function q(){o=0,f.textContent=0,g.textContent=0}m.addEventListener("click",I);p.addEventListener("click",()=>h(!1));C.addEventListener("click",b);b();
