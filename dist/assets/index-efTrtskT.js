(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&m(s)}).observe(document,{childList:!0,subtree:!0});function y(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function m(e){if(e.ep)return;e.ep=!0;const t=y(e);fetch(e.href,t)}})();document.querySelector("#app").innerHTML=`
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
`;const f=document.querySelector(".player--0"),g=document.querySelector(".player--1"),b=document.getElementById("score--0"),h=document.getElementById("score--1"),a=document.getElementById("current--0"),d=document.getElementById("current--1"),v=document.querySelector(".btn--new"),C=document.querySelector(".btn--roll"),L=document.querySelector(".btn--hold"),l=document.querySelector(".dice");let i,n,r;const u=()=>{i=[0,0],n=0,r=0,b.textContent=0,h.textContent=0,a.textContent=0,d.textContent=0,l.classList.add("hidden")};u();const S=()=>{const c=Math.trunc(Math.random()*6)+1;l.classList.remove("hidden"),l.src=`dice-${c}.png`,c!==1?(P(c),n>=100&&(alert(`Player ${r+1} loses!`),u())):(p(),document.getElementById(`current--${r}`).textContent=n)};function P(c){n+=c,r===0?a.textContent=n:d.textContent=n}function p(){x(),f.classList.toggle("player--active"),g.classList.toggle("player--active"),r=r===0?1:0}function x(){i[r]+=n,document.getElementById(`score--${r}`).textContent=i[r],n=0,r===0?a.textContent=n:d.textContent=n}C.addEventListener("click",S);L.addEventListener("click",p);v.addEventListener("click",u);
