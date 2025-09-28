
  // ----- Config -----
  const candleCount = 16; // 16 candles for sweet 16
  const birthdayName = "efecan"; 
  
  // --------------------

  // Set title/message exact text
  document.getElementById('title').textContent = `happy birthday ${birthdayName}`;
  document.getElementById('messageText').textContent = `dilek tut hirto`;

  const candlesContainer = document.getElementById('candles');
  const cake = document.getElementById('cake');
  const song = document.getElementById('song');

song.volume = 0.5;
song.play().catch(()=>{});

// helper: ensure music on first click
document.body.addEventListener("click", ()=>{ if(song.paused) song.play(); }, {once:true});

  // create evenly spaced candles across cake width
  function makeCandles(n){
    candlesContainer.innerHTML = '';
    // use padding so edges aren't flush
    const leftPad = 7; // percent
    const rightPad = 7; // percent
    for(let i=0;i<n;i++){
      const candle = document.createElement('div');
      candle.className = 'candle';
      // position by percentage
      const pct = leftPad + (i/(n-1))*(100-leftPad-rightPad);
      candle.style.left = `calc(${pct}% - 6px)`; // adjust half-width
      // stripes and wick/flame
      const stripe = document.createElement('div'); stripe.className='stripe';
      const wick = document.createElement('div'); wick.className='wick';
      const flame = document.createElement('div'); flame.className='flame';
      const inner = document.createElement('div'); inner.className='inner';
      flame.appendChild(inner);
      // slight rotation variety
      const angle = (Math.random()-0.5)*8;
      candle.style.transform = `rotate(${angle}deg)`;
      candle.appendChild(stripe);
      candle.appendChild(wick);
      candle.appendChild(flame);
      candlesContainer.appendChild(candle);
    }
  }

  // sprinkle decor on top layer
  function makeSprinkles(){
    const spr = document.getElementById('sprinkles');
    spr.innerHTML = '';
    const colors = ['#fff','#ffe6d1','#ffd46a','#ffe0f0','#ffd0d8'];
    for(let i=0;i<20;i++){
      const d = document.createElement('div');
      d.className='sprinkle';
      d.style.left = (6 + Math.random()*88) + '%';
      d.style.transform = `rotate(${Math.random()*360}deg)`;
      d.style.top = (Math.random()*12) + 'px';
      d.style.background = colors[Math.floor(Math.random()*colors.length)];
      d.style.width = (4 + Math.random()*6)+'px';
      spr.appendChild(d);
    }
  }

  // candle flame toggles (show/hide)
  function setFlames(on){
    document.querySelectorAll('.candle .flame').forEach(f => {
      f.style.display = on ? 'block' : 'none';
    });
  }

  // Blow out animation: flicker then hide flames and confetti
  function blowOut(){
    // flicker then hide
    const flames = Array.from(document.querySelectorAll('.candle .flame'));
    let flickers = 6;
    const flick = setInterval(()=>{
      flames.forEach((f,i)=>{
        f.style.opacity = (Math.random()*0.6 + 0.4);
        f.style.transform = `translateY(${Math.random()*-4}px) scale(${0.92 + Math.random()*0.16})`;
      });
      flickers--;
      if(flickers<=0){
        clearInterval(flick);
        setFlames(false);
      }
    },130);

    launchConfetti();
    document.getElementById('messageText').textContent = `aferin`;
  }

  // regenerate (light again)
  function regen(){
    setFlames(true);
    document.getElementById('messageText').textContent = `dilek tut hirto`;
  }

  // ---- simple confetti canvas ----
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let confettiPieces = [];
  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function launchConfetti(){
    confettiPieces = [];
    const colors = ['#ff6b8c','#ffd46a','#85e3ff','#b0ffb3','#c78bff'];
    for(let i=0;i<120;i++){
      confettiPieces.push({
        x: Math.random()*canvas.width,
        y: -Math.random()*canvas.height,
        size: 6 + Math.random()*10,
        color: colors[Math.floor(Math.random()*colors.length)],
        rot: Math.random()*360,
        velX: (Math.random()-0.5)*4,
        velY: 2 + Math.random()*6,
        spin: (Math.random()-0.5)*10
      });
    }
    runConfetti();
  }

  let confettiAnim;
  function runConfetti(){
    cancelAnimationFrame(confettiAnim);
    function tick(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      confettiPieces.forEach((p,i)=>{
        p.x += p.velX;
        p.y += p.velY;
        p.rot += p.spin*0.2;
        ctx.save();
        ctx.translate(p.x,p.y);
        ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();

        // slow removal
        if(p.y > canvas.height + 20) confettiPieces.splice(i,1);
      });
      if(confettiPieces.length>0) confettiAnim = requestAnimationFrame(tick);
    }
    tick();
  }

  // wire up buttons
  document.getElementById('blowBtn').addEventListener('click', blowOut);
  document.getElementById('regenBtn').addEventListener('click', regen);

  // initial render
  makeCandles(candleCount);
  makeSprinkles();
  setFlames(true);

  // small accessibility: allow space to blow out
  window.addEventListener('keydown', (e)=>{
    if(e.code === 'Space'){ e.preventDefault(); blowOut(); }
  });

  // Auto-play small intro confetti shortly after load (gentle)
  setTimeout(()=>{ launchConfetti(); setTimeout(()=>{ /* stop after a bit */ }, 2500); }, 900);

  function launchBalloons(){
  const container = document.getElementById("balloons");
  const colors = ["#ff6b81","#ffb86b","#6bcbff","#9d6bff","#5aff9d","#ffd46a"];
  
  setInterval(()=>{
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = Math.random()*100 + "%";
    b.style.background = colors[Math.floor(Math.random()*colors.length)];
    b.style.animationDuration = (6 + Math.random()*6) + "s";
    b.style.width = (30 + Math.random()*30) + "px";
    b.style.height = (45 + Math.random()*40) + "px";
    container.appendChild(b);
    
    // remove balloon after it floats away
    setTimeout(()=> b.remove(), 12000);
  }, 1200);
}

launchBalloons();

// Music toggle
const musicBtn = document.getElementById("musicBtn");
let musicPlaying = true;

musicBtn.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    musicPlaying = true;
    musicBtn.textContent = "⏸"; // change icon/text
  } else {
    song.pause();
    musicPlaying = false;
    musicBtn.textContent = "▶";
  }
});
