document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const fichas = document.querySelectorAll('.ficha');
    let fichaSeleccionada = null;
    let fichaOrigen = null;
    let jugadorActivo = 1;
    // Objeto con estadísticas y habilidades de los animales
const animales = {
  Conejo: {
    id: 'ficha13',
    vida: ['①'],
    escudo: ['①'],
    ataque: ['①'],
    precision: ['① ② ③'],
    evasion: ['① ② ③ ④ ⑤'],
    habilidad: 'Puede saltar 3 casillas en un movimiento, incluso si hay rivales delante.'
  },
  Hipopotamo: {
    id: 'ficha18',
    vida: ['① ② ③ ④ ⑤'],
    escudo: ['① ② ③ ④ ⑤'],
    ataque: ['① ② ③ ④'],
    precision: ['① ② ③ ④'],
    evasion: ['①'],
    habilidad: 'Empuje: puede mover de su casilla a un carnívoro adyacente (lo desplaza 1 casilla atrás).'
  },
  Gacela: {
    id: 'ficha19',
    vida: ['① ②'],
    escudo: ['① ②'],
    ataque: ['①'],
    precision: ['① ②'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Doble movimiento: puede moverse dos veces por turno una vez por partida.'
  },
  Elefante: {
    id: 'ficha23',
    vida: ['① ② ③ ④ ⑤'],
    escudo: ['① ② ③ ④ ⑤'],
    ataque: ['① ② ③ ④'],
    precision: ['① ② ③'],
    evasion: ['①'],
    habilidad: 'Golpe aplastante: puede atacar 2 enemigos en casillas adyacentes a la vez.'
  },
  Gorila: {
    id: 'ficha20',
    vida: ['① ② ③ ④'],
    escudo: ['① ② ③ ④'],
    ataque: ['① ② ③ ④'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③'],
    habilidad: 'Golpe doble: puede atacar dos veces en un mismo turno a un solo enemigo.'
  },
  Chimpance: {
    id: 'ficha24',
    vida: ['① ② ③'],
    escudo: ['① ②'],
    ataque: ['① ② ③'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Trepar: puede esquivar automáticamente un ataque una vez por partida.'
  },
  Colibri: {
    id: 'ficha21',
    vida: ['①'],
    escudo: ['①'],
    ataque: ['①'],
    precision: ['① ②'],
    evasion: ['① ② ③ ④ ⑤'],
    habilidad: 'Vuelo ágil: puede moverse hasta 3 casillas en línea recta ignorando enemigos si no ataca ese turno.'
  },
  Rinoceronte: {
    id: 'ficha22',
    vida: ['① ② ③ ④ ⑤'],
    escudo: ['① ② ③ ④'],
    ataque: ['① ② ③ ④ ⑤'],
    precision: ['① ② ③ ④'],
    evasion: ['① ②'],
    habilidad: 'Carga: si corre 2 casillas en línea recta, gana un ataque extra ese turno.'
  },
  Tortuga: {
    id: 'ficha16',
    vida: ['① ② ③ ④'],
    escudo: ['① ② ③ ④ ⑤'],
    ataque: ['①'],
    precision: ['① ②'],
    evasion: ['①'],
    habilidad: 'Caparazón: reduce el daño de los ataques a la mitad.'
  },
  Camaleon: {
    id: 'ficha14',
    vida: ['① ②'],
    escudo: ['① ②'],
    ataque: ['① ②'],
    precision: ['① ② ③'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Camuflaje: puede volverse invisible un turno (no puede ser atacado).'
  },
  Canguro: {
    id: 'ficha15',
    vida: ['① ② ③'],
    escudo: ['① ② ③'],
    ataque: ['① ② ③'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③'],
    habilidad: 'Salto largo: puede saltar 2 casillas en diagonal esquivando enemigos.'
  },
  Avestruz: {
    id: 'ficha17',
    vida: ['① ② ③'],
    escudo: ['① ②'],
    ataque: ['① ②'],
    precision: ['① ②'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Carrera: una vez por partida puede moverse el doble de casillas en línea recta.'
  },
  Leon: {
    id: 'ficha2',
    vida: ['① ② ③ ④'],
    escudo: ['① ② ③'],
    ataque: ['① ② ③ ④ ⑤'],
    precision: ['① ② ③ ④ ⑤'],
    evasion: ['① ② ③'],
    habilidad: 'Rugido: puede atemorizar un herbívoro adyacente, haciéndole perder un turno.'
  },
  Tigre: {
    id: 'ficha3',
    vida: ['① ② ③ ④'],
    escudo: ['① ② ③'],
    ataque: ['① ② ③ ④ ⑤'],
    precision: ['① ② ③ ④ ⑤'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Emboscada: si no se ha movido el turno anterior, su siguiente ataque no puede ser esquivado.'
  },
  Serpiente: {
    id: 'ficha4',
    vida: ['① ②'],
    escudo: ['① ②'],
    ataque: ['① ② ③ ④'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Mordedura venenosa: envenena al rival, haciéndole perder 1 vida extra por turno durante 2 turnos.'
  },
  Cocodrilo: {
    id: 'ficha5',
    vida: ['① ② ③ ④ ⑤'],
    escudo: ['① ② ③ ④'],
    ataque: ['① ② ③ ④'],
    precision: ['① ② ③ ④'],
    evasion: ['①'],
    habilidad: 'Emboscada acuática: si está en una casilla especial de agua, ataca el doble de fuerte.'
  },
  Leopardo: {
    id: 'ficha7',
    vida: ['① ② ③'],
    escudo: ['① ②'],
    ataque: ['① ② ③ ④'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③ ④ ⑤'],
    habilidad: 'Sigilo: si no ataca, puede moverse a una casilla detrás del enemigo adyacente.'
  },
  Aguila: {
    id: 'ficha1',
    vida: ['① ②'],
    escudo: ['① ②'],
    ataque: ['① ② ③'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Ataque aéreo: puede atacar una ficha que esté a distancia de 2 casillas en línea recta o diagonal.'
  },
  Hiena: {
    id: 'ficha6',
    vida: ['① ② ③'],
    escudo: ['① ②'],
    ataque: ['① ② ③'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③'],
    habilidad: 'Risa desestabilizadora: ① ② las probabilidades de esquivar de un rival cercano durante 2 turnos.'
  },
  Lobo: {
    id: 'ficha12',
    vida: ['① ② ③'],
    escudo: ['① ② ③'],
    ataque: ['① ② ③'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Ataque en manada: si hay otro carnívoro adyacente, gana un ataque extra.'
  },
  Zorro: {
    id: 'ficha8',
    vida: ['① ②'],
    escudo: ['① ②'],
    ataque: ['① ②'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③ ④ ⑤'],
    habilidad: 'Engaño: puede cambiar de casilla con un aliado una vez por partida.'
  },
  Oso: {
    id: 'ficha9',
    vida: ['① ② ③ ④ ⑤'],
    escudo: ['① ② ③ ④'],
    ataque: ['① ② ③ ④ ⑤'],
    precision: ['① ② ③ ④'],
    evasion: ['①'],
    habilidad: 'Zarpazo brutal: ataca a todos los enemigos adyacentes en un solo movimiento.'
  },
  PerroSalvaje: {
    id: 'ficha10',
    vida: ['① ② ③'],
    escudo: ['① ②'],
    ataque: ['① ② ③'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③ ④'],
    habilidad: 'Emboscada en grupo: si ataca junto a otro carnívoro, el daño es aumentado.'
  },
  Pantera: {
    id: 'ficha11',
    vida: ['① ② ③'],
    escudo: ['① ②'],
    ataque: ['① ② ③ ④'],
    precision: ['① ② ③ ④'],
    evasion: ['① ② ③ ④ ⑤'],
    habilidad: 'Ataque silencioso: si no ha atacado el turno anterior, su primer ataque no puede ser esquivado.'
  }
};

    function mostrarTarjeta(infoHTML, lado) {
      const tarjeta = document.getElementById('tarjeta-info');
      tarjeta.innerHTML = infoHTML;
      tarjeta.classList.remove('tarjeta-oculta', 'tarjeta-izquierda', 'tarjeta-derecha');
      tarjeta.classList.add(lado === 'izquierda' ? 'tarjeta-izquierda' : 'tarjeta-derecha');
}


    function ocultarTarjeta() {
      document.getElementById('tarjeta-info').classList.add('tarjeta-oculta');
    }

    // === NUEVO: Funciones para obtener animal y generar HTML de tarjeta ===
    function obtenerAnimalPorId(idFicha) {
      return Object.values(animales).find(animal => animal.id === idFicha);
    }

    function generarHTMLTarjeta(animal) {
      return `
        <h3>${Object.keys(animales).find(nombre => animales[nombre] === animal)}</h3>
        <p><strong>Vida:</strong> ${animal.vida.join(' ')}</p>
        <p><strong>Escudo:</strong> ${animal.escudo.join(' ')}</p>
        <p><strong>Ataque:</strong> ${animal.ataque.join(' ')}</p>
        <p><strong>Precisión:</strong> ${animal.precision.join(' ')}</p>
        <p><strong>Evasión:</strong> ${animal.evasion.join(' ')}</p>
        <p><strong>Habilidad:</strong> ${animal.habilidad}</p>
      `;
    }

    function reducirVida(idFicha, cantidad) {
      const animal = obtenerAnimalPorId(idFicha);
      if (!animal) return;
    
      animal.vida.splice(0, cantidad); // Elimina la cantidad de vida
    
      // Si esa ficha está seleccionada, actualiza su tarjeta
      if (fichaSeleccionada && fichaSeleccionada.id === idFicha) {
        const html = generarHTMLTarjeta(animal);
        mostrarTarjeta(html, fichaSeleccionada.dataset.jugador === '1' ? 'izquierda' : 'derecha');
      }
    }

    function atacarFicha(atacanteFicha, objetivoFicha) {
      const atacante = obtenerAnimalPorId(atacanteFicha.id);
      const objetivo = obtenerAnimalPorId(objetivoFicha.id);
    
      if (!atacante || !objetivo) return;
    
      // Por ahora, siempre restamos 1 punto de vida (luego puedes aplicar lógica de ataque real)
      reducirVida(objetivoFicha.id, 1);
    
      // Mostrar tarjeta del objetivo si está visible
      const html = generarHTMLTarjeta(objetivo);
      mostrarTarjeta(html, objetivoFicha.dataset.jugador === '1' ? 'izquierda' : 'derecha');
    }
    
    
      
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
        // Mostrar tarjeta con info real si existe
        const animal = obtenerAnimalPorId(ficha.id);
        const html = generarHTMLTarjeta(animal);
        mostrarTarjeta(html, ficha.dataset.jugador === '1' ? 'izquierda' : 'derecha');
      });
    });
  
    // Movimiento con restricción horizontal y diagonal + ataque si hay enemigo
const casillas = document.querySelectorAll('.casilla');
casillas.forEach(casilla => {
  casilla.addEventListener('click', () => {
    if (!fichaSeleccionada) return;

    const destinoFila = parseInt(casilla.dataset.fila);
    const destinoCol = parseInt(casilla.dataset.columna);

    const tieneFila = fichaOrigen?.dataset?.fila !== undefined;
    const tieneCol = fichaOrigen?.dataset?.columna !== undefined;

    // Movimiento inicial desde fuera del tablero
    if (!tieneFila || !tieneCol) {
      const columnaInicial = jugadorActivo === 1 ? 0 : 9;
      if (destinoCol === columnaInicial && !casilla.hasChildNodes()) {
        moverFicha(casilla);
      }
      return;
    }

    const origenFila = parseInt(fichaOrigen.dataset.fila);
    const origenCol = parseInt(fichaOrigen.dataset.columna);
    const columnaEsperada = jugadorActivo === 1 ? origenCol + 1 : origenCol - 1;
    const diferenciaFila = Math.abs(destinoFila - origenFila);

    const fichaObjetivo = casilla.querySelector('.ficha');

    if (fichaObjetivo) {
      const mismoJugador = fichaObjetivo.dataset.jugador === fichaSeleccionada.dataset.jugador;
      if (!mismoJugador &&
          Math.abs(destinoFila - origenFila) <= 1 &&
          Math.abs(destinoCol - origenCol) <= 1) {
        atacarFicha(fichaSeleccionada, fichaObjetivo);
        fichaSeleccionada = null;
        fichaOrigen = null;
        jugadorActivo = jugadorActivo === 1 ? 2 : 1;
        actualizarFichasDisponibles();
        return;
      }
    }

    if (!casilla.hasChildNodes() &&
        destinoCol === columnaEsperada &&
        diferenciaFila <= 1) {
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
      
        const animal = obtenerAnimalPorId(nuevaFicha.id);
        const html = generarHTMLTarjeta(animal);
        mostrarTarjeta(html, nuevaFicha.dataset.jugador === '1' ? 'izquierda' : 'derecha');
      });
      
      nuevaFicha.addEventListener('mouseenter', () => {
        const animal = obtenerAnimalPorId(nuevaFicha.id);
        if (animal) {
          const html = generarHTMLTarjeta(animal);
          mostrarTarjeta(html, nuevaFicha.dataset.jugador === '1' ? 'izquierda' : 'derecha');
        }
      });
      
      nuevaFicha.addEventListener('mouseleave', ocultarTarjeta);
      
  
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

    // Ocultar la tarjeta al hacer clic fuera de una ficha o la propia tarjeta
    document.addEventListener('click', (event) => {
      const tarjeta = document.getElementById('tarjeta-info');
      const esFicha = event.target.classList.contains('ficha');
      const esTarjeta = tarjeta.contains(event.target);

      if (!esFicha && !esTarjeta) {
        ocultarTarjeta();
        fichas.forEach(f => f.style.border = 'none');
      }
    });

    // === NUEVO: Eventos mouseenter/mouseleave/click para fichas ===
    fichas.forEach(ficha => {
      ficha.addEventListener('mouseenter', () => {
        const idFicha = ficha.id;
        const animal = obtenerAnimalPorId(idFicha);
        if (animal) {
          const html = generarHTMLTarjeta(animal);
          mostrarTarjeta(html, ficha.dataset.jugador === '1' ? 'izquierda' : 'derecha');
        }
      });

      ficha.addEventListener('mouseleave', ocultarTarjeta);

      ficha.addEventListener('click', () => {
        const idFicha = ficha.id;
        const animal = obtenerAnimalPorId(idFicha);
        if (animal) {
          const html = generarHTMLTarjeta(animal);
          mostrarTarjeta(html, ficha.dataset.jugador === '1' ? 'izquierda' : 'derecha');
        }
      });
    });
  });
