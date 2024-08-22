window.onload = function() {
    var canvas = document.getElementById('textparticlemobile'),
        ctx = canvas.getContext('2d');

    var keyword = "Xertz Studios";
    var keyword1 = "We are The Future";
    var radius = 6400;
    var drag = 0.92;
    var ease = 0.2;
    var density = 1;
    var offset = 5;
    var timeout = 30;
    var pixels;
    var particles = [];
    var mx = 0, my = 0;

    // Function to load mobile-specific styles
    function loadMobileStyles() {
        if (window.innerWidth <= 767) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'mobile.css'; // Path to mobile-specific CSS
            document.head.appendChild(link);
        }
    }

    // Function to resize canvas and reinitialize the drawing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initCanvas(); // Reinitialize the canvas after resizing
    }

    window.addEventListener('resize', resizeCanvas);

    // Function to initialize the canvas
    function initCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        var fontSize = `${Math.min(canvas.width, canvas.height) * 0.1}px`;
        if (window.innerWidth <= 767) {
            fontSize = `${Math.min(canvas.width, canvas.height) * 0.05}px`; // Adjust font size for mobile
        }

        ctx.font = fontSize + " 'Orbitron'";
        ctx.fillStyle = "#cccccc";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Draw the first keyword
        ctx.fillText(keyword, canvas.width / 2, canvas.height / 2 - 50);

        // Draw the second keyword below the first one
        ctx.fillText(keyword1, canvas.width / 2, canvas.height / 2 + 50);

        particles = []; // Clear particles
        init(); // Reinitialize particles based on the new canvas size
    }

    // Function to initialize particles
    function init() {
        pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        particles = [];
        for (var i = 0; i < canvas.height; i += density) {
            for (var j = 0; j < canvas.width; j += density) {
                var index = (j + i * canvas.width) * 4;

                if (pixels[index + 3] > 128) {
                    particles.push(new Particle(j, i));
                }
            }
        }
    }

    // Particle constructor
    function Particle(x, y) {
        this.hx = (x - offset * Math.random());
        this.hy = (y - offset * Math.random());
        this.cx = (canvas.width * Math.random());
        this.cy = (canvas.height * Math.random());
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
    }

    // Particle update method
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

    // Function to draw the particles
    function draw() {
        var a = ctx.createImageData(canvas.width, canvas.height);
        var b = a.data;

        particles.forEach(function(particle) {
            particle.update();
        });

        particles.forEach(function(particle) {
            var n = (~~particle.cx + (~~particle.cy * canvas.width)) * 4;
            b[n] = b[n + 1] = b[n + 2] = 0; // Setting particles to black
            b[n + 3] = 255;
        });

        ctx.putImageData(a, 0, 0);

        setTimeout(function() {
            requestAnimationFrame(draw);
        }, timeout);
    }

    loadMobileStyles(); // Load mobile styles if applicable
    resizeCanvas(); // Initialize the canvas and particles
    draw(); // Start the animation loop
};
