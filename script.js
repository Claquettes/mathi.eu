function getRandomSize() {
  return Math.floor(Math.random() * 150) + 100; // Random size between 100 and 250
}

function createCloud() {
  const cloud = document.createElement('span');
  cloud.classList.add('cloud');
  cloud.style.top = Math.random() * 100 + '%';
  cloud.style.left = Math.random() * 100 + '%';
  cloud.style.fontSize = getRandomSize() + 'px';
  cloud.textContent = '☁';

  return cloud;
}

function addClouds() {
  const container = document.querySelector('.cloudy-bg');
  const numClouds = 20;

  for (let i = 0; i < numClouds; i++) {
    const cloud = createCloud();
    container.appendChild(cloud);
  }

  anime({
    targets: '.cloudy-bg .cloud',
    translateX: [
      { value: '-200%', duration: 0 },
      { value: '100%', duration: 5000 }
    ],
    opacity: [
      { value: 0.8, duration: 1000 },
      { value: 0, duration: 4000 },
      { value: 0.8, duration: 1000 }
    ],
    delay: anime.stagger(200),
    easing: 'easeOutQuad',
    loop: true,
    complete: function(anim) {
      anim.animatables.forEach(function(animatable) {
        anime({
          targets: animatable.target,
          opacity: 0,
          duration: 1000,
          complete: function() {
            animatable.target.remove();
          }
        });
      });
      addClouds();
    }
  });
}

addClouds();