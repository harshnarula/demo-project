window.onload = function() {
    var canvas = document.getElementById('textparticle'),
        ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = '../images/logo(1).png';  // Replace with your image path

    var radius = 6400;
    var drag = 0.92;
    var ease = 0.2;
    var density = 1;
    var offset = 5;
    var timeout = 30;
    var pixels;
    var particles = [];
    var mx = 0, my = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initCanvas(); // Reinitialize the canvas after resizing
    }

    window.addEventListener('resize', resizeCanvas);

    img.onload = function() {
        resizeCanvas(); // Initialize the canvas after the image has loaded
    };

    function initCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        var imgWidth = img.width;
        var imgHeight = img.height;

        // Calculate the position to center the image on the canvas
        var imgX = (canvas.width - imgWidth) / 2;
        var imgY = (canvas.height - imgHeight) / 2;

        ctx.drawImage(img, imgX, imgY); // Draw the image centered on the canvas

        particles = []; // Clear particles
        init(imgX, imgY, imgWidth, imgHeight); // Reinitialize particles based on the new canvas size
    }

    canvas.addEventListener('mousemove', function(e) {
        mx = e.clientX - canvas.offsetLeft;
        my = e.clientY - canvas.offsetTop;
    });

    var Particle = function(x, y) {
        this.hx = ~~(x - offset * Math.random());
        this.hy = ~~(y - offset * Math.random());
        this.cx = ~~(canvas.width * Math.random());
        this.cy = ~~(canvas.height * Math.random());
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
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
            b[n] = b[n + 1] = b[n + 2] = 220; // Setting particles to grey
            b[n + 3] = 255;
        }

        ctx.putImageData(a, 0, 0);

        setTimeout(function() {
            requestAnimationFrame(draw);
        }, timeout);
    };

    var init = function(imgX, imgY, imgWidth, imgHeight) {
        pixels = ctx.getImageData(imgX, imgY, imgWidth, imgHeight).data;

        for (var i = 0; i < imgHeight; i += density) {
            for (var j = 0; j < imgWidth; j += density) {
                var index = (j + i * imgWidth) * 4;

                if (pixels[index + 3] > 128) {  // Check for non-transparent pixels
                    var particleX = j + imgX;
                    var particleY = i + imgY;
                    if (index >= particles.length) {
                        particles.push(new Particle(particleX, particleY));
                    } else {
                        particles[index].hx = particleX;
                        particles[index].hy = particleY;
                    }
                }
            }
        }
    };

    draw(); // Start the animation loop
};
