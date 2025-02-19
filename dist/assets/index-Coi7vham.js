(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&f(i)}).observe(document,{childList:!0,subtree:!0});function h(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function f(e){if(e.ep)return;e.ep=!0;const t=h(e);fetch(e.href,t)}})();document.querySelector("#app").innerHTML=`
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
`;const a=document.querySelector(".player--0"),d=document.querySelector(".player--1"),v=document.getElementById("score--0"),L=document.getElementById("score--1"),u=document.getElementById("current--0"),p=document.getElementById("current--1"),S=document.querySelector(".btn--new"),y=document.querySelector(".btn--roll"),m=document.querySelector(".btn--hold"),s=document.querySelector(".dice");let o,n,r;const b=()=>{o=[0,0],n=0,r=0,v.textContent=0,L.textContent=0,u.textContent=0,p.textContent=0,s.classList.add("hidden"),a.classList.remove("player--winner"),d.classList.remove("player--winner"),y.disabled=!1,m.disabled=!1,a.classList.add("player--active"),d.classList.remove("player--active")};b();const C=()=>{const c=Math.trunc(Math.random()*6)+1;s.classList.remove("hidden"),s.src=`dice-${c}.png`,c!==1?(P(c),o[r]>=100&&(document.querySelector(`.player--${r}`).classList.add("player--winner"),s.classList.add("hidden"),y.disabled=!0,m.disabled=!0)):g()};function P(c){n+=c,r===0?u.textContent=n:p.textContent=n}function g(){q(),a.classList.toggle("player--active"),d.classList.toggle("player--active"),r=r===0?1:0}function q(){o[r]+=n,document.getElementById(`score--${r}`).textContent=o[r],n=0,r===0?u.textContent=n:p.textContent=n}y.addEventListener("click",C);m.addEventListener("click",g);S.addEventListener("click",b);
