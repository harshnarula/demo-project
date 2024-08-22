


window.onload = function() {
    var canvas = document.getElementById('logoparticleeffect'),
        ctx = canvas.getContext('2d');

    var keyword = "Xertz Studios";
    var radius = 20; 
    var drag = 0.9; 
    var ease = 0.2;
    var density = 1;
    var offset = 2;
    var timeout = 20;
    var pixels;
    var particles = [];
    var mx = 0, my = 0;

    function resizeCanvas() {
        canvas.width = 200; 
        canvas.height = 80; 
        initCanvas(); 
    }

    window.addEventListener('resize', resizeCanvas);

    function initCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.font = `36px 'Orbitron'`; 
        ctx.fillStyle = "#cccccc";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(keyword, canvas.width / 2, canvas.height / 2);

        particles = []; 
        init();
    }

    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        // Normalize the mouse position relative to the canvas dimensions
        mx = (x / canvas.width) * 200; // Adjusting to 200px width
        my = (y / canvas.height) * 80; // Adjusting to 80px height
    });

    var Particle = function(x, y) {
        this.hx = (x - offset * Math.random());
        this.hy = (y - offset * Math.random());
        this.cx = (canvas.width * Math.random());
        this.cy = (canvas.height * Math.random());
        this.vx = Math.random() * 5 - 2.5; 
        this.vy = Math.random() * 5 - 2.5;
    };

    Particle.prototype.update = function() {
        var dx = this.cx - mx;
        var dy = this.cy - my;
        var ds = (dx * dx) + (dy * dy);
        var aradius = Math.min(radius / ds, radius);
        var theta = Math.atan2(dy, dx);

        var hdx = this.hx - this.cx;
        var hdy = this.hy - this.cy;
        var hds = Math.sqrt((hdx * hdx) + (hdy * hdy));
        var hf = (hds * 0.01);
        var htheta = Math.atan2(hdy, hdx);

        this.vx += aradius * Math.cos(theta) + hf * Math.cos(htheta);
        this.vy += aradius * Math.sin(theta) + hf * Math.sin(htheta);

        this.vx *= drag;
        this.vy *= drag;

        this.cx += this.vx;
        this.cy += this.vy;
    };

    var draw = function() {
        var b = (a = ctx.createImageData(canvas.width, canvas.height)).data;

        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var n = (~~p.cx + (~~p.cy * canvas.width)) * 4;
            b[n] = b[n + 1] = b[n + 2] = 255;
            b[n + 3] = 255;
        }

        ctx.putImageData(a, 0, 0);

        setTimeout(function() {
            requestAnimationFrame(draw);
        }, timeout);
    };

    var init = function() {
        pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        for (var i = 0; i < canvas.height; i += density) {
            for (var j = 0; j < canvas.width; j += density) {
                var index = (j + i * canvas.width) * 4;

                if (pixels[index + 3] > 128) {
                    if (index >= particles.length) {
                        particles.push(new Particle(j, i));
                    } else {
                        particles[index].hx = j;
                        particles[index].hy = i;
                    }
                }
            }
        }
    };

    resizeCanvas(); // Initialize the canvas and particles
    draw(); // Start the animation loop
};
