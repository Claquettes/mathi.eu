    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    var particles = [];
    var angles = 3; // on fait un Hexagone

    function Particle(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;

      this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius * Math.cos(0), this.y + this.radius * Math.sin(0));
        for (var i = 1; i < angles; i++) { 
          ctx.lineTo(this.x + this.radius * Math.cos(i * 2 * Math.PI / angles), this.y + this.radius * Math.sin(i * 2 * Math.PI / angles));
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
      this.update = function() {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
        // on fait rebondir les particules sur les bords de la fenêtre
        this.x += this.dx;
        this.y += this.dy;
        // on fait bouger les particuless
        if(angles < 6){
          angles += 0.0001;
        }
        this.draw();
      }
    }
    function init() {
      for (var i = 0; i < 50; i++) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        var radius = Math.random() * 95 + 20;
        particles.push(new Particle(x, y, dx, dy, radius, "#FFF"));
      }
    }
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
      }
    }
    init();
    animate();
    anime({
      targets: 'canvas',
      duration: 5000,
      easing: 'easeIn',
      opacity: 0,
      loop: true
    });