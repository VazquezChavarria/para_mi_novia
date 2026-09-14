const starsContainer = document.getElementById('stars');
    const STAR_COUNT = 60;
    for(let i=0; i<STAR_COUNT; i++){
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random()*100 + '%';
      s.style.top = Math.random()*100 + '%';
      s.style.animationDelay = (Math.random()*4) + 's';
      const size = (Math.random()*2 + 1.5).toFixed(1);
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      starsContainer.appendChild(s);
    }

    const musica = document.getElementById('musica');
    const btnMusica = document.getElementById('btn-musica');
    let sonando = false;

    btnMusica.addEventListener('click', () => {
      if(sonando){
        musica.pause();
        btnMusica.textContent = '♪';
        btnMusica.setAttribute('aria-label', 'Reproducir música');
      } else {
        musica.play();
        btnMusica.textContent = '❙❙';
        btnMusica.setAttribute('aria-label', 'Pausar música');
      }
      sonando = !sonando;
    });

    const botonesCanciones = document.querySelectorAll('.play-cancion');

    botonesCanciones.forEach(boton => {
      const audio = boton.closest('.cancion').querySelector('audio');

      boton.addEventListener('click', () => {
        const yaSuena = !audio.paused;

        document.querySelectorAll('.cancion audio').forEach(a => a.pause());
        botonesCanciones.forEach(b => {
          b.textContent = '▶';
          b.classList.remove('tocando');
          b.setAttribute('aria-label', b.getAttribute('aria-label').replace('Pausar', 'Reproducir'));
        });

        if(!yaSuena){
          audio.play();
          boton.textContent = '❙❙';
          boton.classList.add('tocando');
          boton.setAttribute('aria-label', boton.getAttribute('aria-label').replace('Reproducir', 'Pausar'));
        }
      });
    });