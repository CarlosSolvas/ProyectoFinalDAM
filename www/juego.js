document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const fichas = document.querySelectorAll('.ficha');
    let fichaSeleccionada = null;
    let fichaOrigen = null;
    let jugadorActivo = 1;
  
    // Crear el tablero con casillas especiales
    for (let fila = 0; fila < 10; fila++) {
      for (let col = 0; col < 10; col++) {
        const casilla = document.createElement('div');
        casilla.classList.add('casilla');
        casilla.dataset.fila = fila;
        casilla.dataset.columna = col;
  
        const probabilidadAgua = 0.05;
        const probabilidadRoca = 0.05;
        const probabilidadHierba = 0.1;
  
        if (Math.random() < probabilidadAgua) {
          casilla.classList.add('agua');
        } else if (Math.random() < probabilidadRoca) {
          casilla.classList.add('roca');
        } else if (Math.random() < probabilidadHierba) {
          casilla.classList.add('hierba');
        }
  
        tablero.appendChild(casilla);
      }
    }
  
    // Selección de ficha fuera del tablero
    fichas.forEach(ficha => {
      ficha.addEventListener('click', () => {
        if (parseInt(ficha.dataset.jugador) !== jugadorActivo) return;
        fichaSeleccionada = ficha;
        fichaOrigen = ficha.parentElement;
  
        fichas.forEach(f => f.style.border = 'none');
        ficha.style.border = '2px solid yellow';
      });
    });
  
    // Movimiento con restricción horizontal y diagonal
    const casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla => {
      casilla.addEventListener('click', () => {
        if (!fichaSeleccionada || casilla.hasChildNodes()) return;
  
        const destinoFila = parseInt(casilla.dataset.fila);
        const destinoCol = parseInt(casilla.dataset.columna);
  
        const tieneFila = fichaOrigen.hasAttribute('data-fila');
        const tieneCol = fichaOrigen.hasAttribute('data-columna');
  
        // Movimiento inicial desde fuera del tablero
        if (!tieneFila || !tieneCol) {
          const columnaInicial = jugadorActivo === 1 ? 0 : 9;
          if (destinoCol === columnaInicial) {
            moverFicha(casilla);
          }
          return;
        }
  
        const origenFila = parseInt(fichaOrigen.dataset.fila);
        const origenCol = parseInt(fichaOrigen.dataset.columna);
        const columnaEsperada = jugadorActivo === 1 ? origenCol + 1 : origenCol - 1;
        const diferenciaFila = Math.abs(destinoFila - origenFila);
  
        if (destinoCol === columnaEsperada && diferenciaFila <= 1) {
          moverFicha(casilla);
        }
      });
    });
  
    // Mover ficha y añadir lógica para seleccionar desde el tablero
    function moverFicha(casilla) {
      const nuevaFicha = fichaSeleccionada.cloneNode(true);
      nuevaFicha.style.border = 'none';
  
      // Permitir selección posterior desde el tablero
      nuevaFicha.addEventListener('click', () => {
        if (parseInt(nuevaFicha.dataset.jugador) !== jugadorActivo) return;
        fichaSeleccionada = nuevaFicha;
        fichaOrigen = casilla;
  
        fichas.forEach(f => f.style.border = 'none');
        nuevaFicha.style.border = '2px solid yellow';
      });
  
      casilla.appendChild(nuevaFicha);
  
      fichaSeleccionada.style.visibility = 'hidden';
      fichaSeleccionada = null;
      fichaOrigen = null;
  
      jugadorActivo = jugadorActivo === 1 ? 2 : 1;
      actualizarFichasDisponibles();
    }
  
    // Resaltar fichas disponibles para el jugador activo
    function actualizarFichasDisponibles() {
      fichas.forEach(f => {
        f.style.opacity = 0.3;
        f.style.cursor = 'not-allowed';
      });
  
      const activas = jugadorActivo === 1
        ? document.querySelectorAll('.ficha.roja')
        : document.querySelectorAll('.ficha.verde');
  
      activas.forEach(f => {
        f.style.opacity = 1;
        f.style.cursor = 'pointer';
      });
    }
  
    actualizarFichasDisponibles();
  });
  