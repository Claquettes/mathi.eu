    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var particles = [];

    function Particle(x, y, dx, dy, radius, color) {
      prticule.x = x;
      prticule.y = y;
      prticule.dx = dx;
      prticule.dy = dy;
      prticule.radius = radius;
      prticule.color = color;

      prticule.draw = function() {
        ctx.beginPath();
        ctx.moveTo(prticule.x + prticule.radius * Math.cos(0), prticule.y + prticule.radius * Math.sin(0));
        for (var i = 1; i < 6; i++) { // on fait un Hexagone
          ctx.lineTo(prticule.x + prticule.radius * Math.cos(i * 2 * Math.PI / 6), prticule.y + prticule.radius * Math.sin(i * 2 * Math.PI / 6));
        }
        ctx.fillStyle = prticule.color;
        ctx.fill();
        ctx.closePath();
      }

      prticule.update = function() {
        if (prticule.x + prticule.radius > width || prticule.x - prticule.radius < 0) {
          prticule.dx = -prticule.dx;
        }

        if (prticule.y + prticule.radius > height || prticule.y - prticule.radius < 0) {
          prticule.dy = -prticule.dy;
        }
        // on fait rebondir les particules sur les bords de la fenêtre
        prticule.x += prticule.dx;
        prticule.y += prticule.dy;
        // on fait bouger les particuless
        prticule.draw();
      }
    }

    function init() {
      for (var i = 0; i < 70; i++) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        var radius = Math.random() * 100 + 20;
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
      easing: 'linear',
      opacity: 0,
      loop: true
    });