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
    const botonesCanciones = document.querySelectorAll('.play-cancion');

    // pausa todo lo demás (música de fondo + top 5) antes de sonar uno nuevo
    function pausarTodoMenos(audioQueSigue){
      if(musica !== audioQueSigue){
        musica.pause();
        btnMusica.textContent = '♪';
        btnMusica.setAttribute('aria-label', 'Reproducir música');
      }
      botonesCanciones.forEach(b => {
        const a = b.closest('.cancion').querySelector('audio');
        if(a !== audioQueSigue){
          a.pause();
          b.textContent = '▶';
          b.classList.remove('tocando');
          b.setAttribute('aria-label', b.getAttribute('aria-label').replace('Pausar', 'Reproducir'));
        }
      });
    }

    btnMusica.addEventListener('click', () => {
      const yaSuena = !musica.paused;
      pausarTodoMenos(musica);
      if(!yaSuena){
        musica.play();
        btnMusica.textContent = '❙❙';
        btnMusica.setAttribute('aria-label', 'Pausar música');
      } else {
        musica.pause();
        btnMusica.textContent = '♪';
        btnMusica.setAttribute('aria-label', 'Reproducir música');
      }
    });

    botonesCanciones.forEach(boton => {
      const audio = boton.closest('.cancion').querySelector('audio');

      boton.addEventListener('click', () => {
        const yaSuena = !audio.paused;
        pausarTodoMenos(audio);

        if(!yaSuena){
          audio.play();
          boton.textContent = '❙❙';
          boton.classList.add('tocando');
          boton.setAttribute('aria-label', boton.getAttribute('aria-label').replace('Reproducir', 'Pausar'));
        } else {
          audio.pause();
          boton.textContent = '▶';
          boton.classList.remove('tocando');
          boton.setAttribute('aria-label', boton.getAttribute('aria-label').replace('Pausar', 'Reproducir'));
        }
      });
    });