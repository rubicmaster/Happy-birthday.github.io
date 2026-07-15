const cake = document.querySelector(".cake");
const flame = document.querySelector(".flame");
const message = document.getElementById("message");

cake.addEventListener("click", () => {
    flame.style.display = "none";
    message.classList.add("show");
});

// Canvas confetti: squares with random colours and sizes falling top->bottom
(function(){
    const canvas = document.getElementById('confetti');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#ff4d4d','#ffd24d','#4dff88','#4da6ff','#d24dff','#ff9ac1','#ffe066'];
    const maxParticles = 150;

    function resize(){
        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(ratio,0,0,ratio,0,0);
    }
    window.addEventListener('resize', resize);
    resize();

    function rand(min, max){ return Math.random()*(max-min)+min }

    function createParticle(){
        const size = Math.round(rand(6,26));
        particles.push({
            x: rand(0, window.innerWidth - size),
            y: -size,
            size: size,
            color: colors[Math.floor(Math.random()*colors.length)],
            speed: rand(1.2,4.5),
            drift: rand(-0.6,0.6),
            rotation: rand(0,360),
            rotSpeed: rand(-6,6)
        });
        if(particles.length > maxParticles) particles.shift();
    }

    // initial burst
    for(let i=0;i<40;i++) createParticle();

    function update(){
        ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
        for(let i=particles.length-1;i>=0;i--){
            const p = particles[i];
            p.x += p.drift;
            p.y += p.speed;
            p.rotation += p.rotSpeed;
            ctx.save();
            ctx.translate(p.x + p.size/2, p.y + p.size/2);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
            if(p.y > window.innerHeight + p.size) particles.splice(i,1);
        }
        requestAnimationFrame(update);
    }
    update();

    // continuous spawn
    setInterval(createParticle, 90);
})();
