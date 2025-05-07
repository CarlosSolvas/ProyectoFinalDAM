document.addEventListener('DOMContentLoaded', () => {
  // Referencias iniciales
  const tablero = document.getElementById('tablero');
  const fichas = document.querySelectorAll('.ficha');
  let fichaSeleccionada = null;
  let fichaOrigen = null;
  let jugadorActivo = 1;
  const tarjeta1 = document.getElementById('tarjeta-izquierda');
  const tarjeta2 = document.getElementById('tarjeta-derecha');

  // Al pulsar el botón START
  document.getElementById('boton-start').addEventListener('click', () => {
    // Ocultar pantalla de inicio
    document.getElementById('pantalla-inicio').style.display = 'none';
    // Mostrar la zona del juego
    document.getElementById('zona-juego').style.display = 'flex';
  });
    
    // Objeto con estadísticas y habilidades de los animales
const animales = {
  Conejo: {
    id: 'ficha13',
    vida: ['①'],
    defensa: ['①'],
    ataque: ['①'],
    habilidad: 'Puede saltar 3 casillas en un movimiento, incluso si hay rivales delante.'
  },
  Hipopótamo: {
    id: 'ficha18',
    vida: ['①', '②', '③', '④', '⑤'],
    defensa: ['①', '②', '③', '④'],
    ataque: ['①', '②', '③', '④'],
    habilidad: 'Empuje: puede mover de su casilla a un carnívoro adyacente (lo desplaza 1 casilla atrás).'
  },
  Gacela: {
    id: 'ficha19',
    vida: ['①', '②'],
    defensa: ['①', '②'],
    ataque: ['①'],
    habilidad: 'Doble movimiento: puede moverse dos veces por turno una vez por partida.'
  },
  Elefante: {
    id: 'ficha23',
    vida: ['①', '②', '③', '④', '⑤'],
    defensa: ['①', '②', '③', '④'],
    ataque: ['①', '②', '③', '④'],
    habilidad: 'Golpe aplastante: puede atacar 2 enemigos en casillas adyacentes a la vez.'
  },
  Gorila: {
    id: 'ficha20',
    vida: ['①', '②', '③', '④'],
    defensa: ['①', '②', '③'],
    ataque: ['①', '②', '③', '④'],
    habilidad: 'Golpe doble: puede atacar dos veces en un mismo turno a un solo enemigo.'
  },
  Chimpancé: {
    id: 'ficha24',
    vida: ['①', '②', '③'],
    defensa: ['①', '②'],
    ataque: ['①', '②', '③'],
    habilidad: 'Trepar: puede esquivar automáticamente un ataque una vez por partida.'
  },
  Colibrí: {
    id: 'ficha21',
    vida: ['①'],
    defensa: ['①'],
    ataque: ['①'],
    habilidad: 'Vuelo ágil: puede moverse hasta 3 casillas en línea recta ignorando enemigos si no ataca ese turno.'
  },
  Rinoceronte: {
    id: 'ficha22',
    vida: ['①', '②', '③', '④', '⑤'],
    defensa: ['①', '②', '③', '④'],
    ataque: ['①', '②', '③', '④', '⑤'],
    habilidad: 'Carga: si corre 2 casillas en línea recta, gana un ataque extra ese turno.'
  },
  Tortuga: {
    id: 'ficha16',
    vida: ['①', '②', '③', '④'],
    defensa: ['①', '②', '③', '④'],
    ataque: ['①'],
    habilidad: 'Caparazón: reduce el daño de los ataques a la mitad.'
  },
  Camaleón: {
    id: 'ficha14',
    vida: ['①', '②'],
    defensa: ['①', '②'],
    ataque: ['①', '②'],
    habilidad: 'Camuflaje: puede volverse invisible un turno (no puede ser atacado).'
  },
  Canguro: {
    id: 'ficha15',
    vida: ['①', '②', '③'],
    defensa: ['①', '②', '③'],
    ataque: ['①', '②', '③'],
    habilidad: 'Salto largo: puede saltar 2 casillas en diagonal esquivando enemigos.'
  },
  Avestruz: {
    id: 'ficha17',
    vida: ['①', '②', '③'],
    defensa: ['①', '②'],
    ataque: ['①', '②'],
    habilidad: 'Carrera: una vez por partida puede moverse el doble de casillas en línea recta.'
  },
  León: {
    id: 'ficha2',
    vida: ['①', '②', '③', '④'],
    defensa: ['①', '②', '③'],
    ataque: ['①', '②', '③', '④', '⑤'],
    habilidad: 'Rugido: puede atemorizar un herbívoro adyacente, haciéndole perder un turno.'
  },
  Tigre: {
    id: 'ficha3',
    vida: ['①', '②', '③', '④'],
    defensa: ['①', '②', '③'],
    ataque: ['①', '②', '③', '④', '⑤'],
    habilidad: 'Emboscada: si no se ha movido el turno anterior, su siguiente ataque no puede ser esquivado.'
  },
  Serpiente: {
    id: 'ficha4',
    vida: ['①', '②'],
    defensa: ['①', '②'],
    ataque: ['①', '②', '③', '④'],
    habilidad: 'Mordedura venenosa: envenena al rival, haciéndole perder 1 vida extra por turno durante 2 turnos.'
  },
  Cocodrilo: {
    id: 'ficha5',
    vida: ['①', '②', '③', '④', '⑤'],
    defensa: ['①', '②', '③', '④'],
    ataque: ['①', '②', '③', '④'],
    habilidad: 'Emboscada acuática: si está en una casilla especial de agua, ataca el doble de fuerte.'
  },
  Leopardo: {
    id: 'ficha7',
    vida: ['①', '②', '③'],
    defensa: ['①', '②'],
    ataque: ['①', '②', '③', '④'],
    habilidad: 'Sigilo: si no ataca, puede moverse a una casilla detrás del enemigo adyacente.'
  },
  Águila: {
    id: 'ficha1',
    vida: ['①', '②'],
    defensa: ['①', '②'],
    ataque: ['①', '②', '③'],
    habilidad: 'Ataque aéreo: puede atacar una ficha que esté a distancia de 2 casillas en línea recta o diagonal.'
  },
  Hiena: {
    id: 'ficha6',
    vida: ['①', '②', '③'],
    defensa: ['①', '②'],
    ataque: ['①', '②', '③'],
    habilidad: 'Risa desestabilizadora: ① ② las probabilidades de esquivar de un rival cercano durante 2 turnos.'
  },
  Lobo: {
    id: 'ficha12',
    vida: ['①', '②', '③'],
    defensa: ['①', '②', '③'],
    ataque: ['①', '②', '③'],
    habilidad: 'Ataque en manada: si hay otro carnívoro adyacente, gana un ataque extra.'
  },
  Zorro: {
    id: 'ficha8',
    vida: ['①', '②'],
    defensa: ['①', '②'],
    ataque: ['①', '②'],
    habilidad: 'Engaño: puede cambiar de casilla con un aliado una vez por partida.'
  },
  Oso: {
    id: 'ficha9',
    vida: ['①', '②', '③', '④', '⑤'],
    defensa: ['①', '②', '③', '④'],
    ataque: ['①', '②', '③', '④', '⑤'],
    habilidad: 'Zarpazo brutal: ataca a todos los enemigos adyacentes en un solo movimiento.'
  },
  PerroSalvaje: {
    id: 'ficha10',
    vida: ['①', '②', '③'],
    defensa: ['①', '②'],
    ataque: ['①', '②', '③'],
    habilidad: 'Emboscada en grupo: si ataca junto a otro carnívoro, el daño es aumentado.'
  },
  Pantera: {
    id: 'ficha11',
    vida: ['①', '②', '③'],
    defensa: ['①', '②'],
    ataque: ['①', '②', '③', '④'],
    habilidad: 'Ataque silencioso: si no ha atacado el turno anterior, su primer ataque no puede ser esquivado.'
  }
  
};

    function mostrarTarjeta(infoHTML, lado) {
      
      if (lado === 'izquierda') {
        tarjeta1.innerHTML = infoHTML;
        tarjeta1.classList.remove('tarjeta-oculta');
      }
      if (lado === 'derecha') {
        tarjeta2.innerHTML = infoHTML;
        tarjeta2.classList.remove('tarjeta-oculta');
      }

}


    function ocultarTarjeta(ficha) {
      
      if (ficha == null) {
        tarjeta1.classList.add('tarjeta-oculta');
        tarjeta2.classList.add('tarjeta-oculta');
        return;
      }
      //si es de jugador 1 oculta la tarjeta izquierda
      if (ficha === '1') {
        tarjeta1.classList.add('tarjeta-oculta');
      }
      //si es de jugador 2 oculta la tarjeta derecha
      if (ficha === '2') {
        tarjeta2.classList.add('tarjeta-oculta');
      }
    }

    // === Funciones para obtener animal y generar HTML de tarjeta ===
    function obtenerAnimalPorId(idFicha) {
      return Object.values(animales).find(animal => animal.id === idFicha);
    }

    function generarHTMLTarjeta(animal) {
      const simbolos = ['①', '②', '③', '④', '⑤', '⑥'];
      const ficha = document.getElementById(animal.id);
      let bonus = 0;
    
      if (ficha && ficha.parentElement.classList.contains('agua')) {
        if (
          animal.id === 'ficha5' ||   // Cocodrilo
          animal.id === 'ficha18' ||  // Hipopotamo
          animal.id === 'ficha16'     // Tortuga
        ) {
          bonus = 1;
        }
      }
    
      const vida = simbolos.slice(0, animal.vida.length + bonus).join(' ');
      const defensa = simbolos.slice(0, animal.defensa.length + bonus).join(' ');
      const ataque = simbolos.slice(0, animal.ataque.length + bonus).join(' ');
    
      return `
        <h3>${Object.keys(animales).find(nombre => animales[nombre] === animal)}</h3>
        <p><strong>Vida:</strong> ${vida}</p>
        <p><strong>Defensa:</strong> ${defensa}</p>
        <p><strong>Ataque:</strong> ${ataque}</p>
        <p><strong>Habilidad:</strong> ${animal.habilidad}</p>
      `;
    }    

    function reducirVida(idFicha, cantidad) {
      const animal = obtenerAnimalPorId(idFicha);
      if (!animal) return;
    
      animal.vida.splice(0, cantidad);
    
      // Buscar la ficha activa (en el tablero, no clonada)
      const ficha = [...document.querySelectorAll(`.ficha[id="${idFicha}"]`)].find(f => {
        return f.parentElement && f.parentElement.classList.contains('casilla');
      });
    
      // Eliminar ficha si muere
      if (animal.vida.length <= 0 && ficha) {
        eliminarFicha(ficha);
      }
    
      // Si está seleccionada, actualizar tarjeta
      if (fichaSeleccionada && fichaSeleccionada.id === idFicha) {
        const html = generarHTMLTarjeta(animal);
        mostrarTarjeta(html, fichaSeleccionada.dataset.jugador === '1' ? 'izquierda' : 'derecha');
      }
    }        
    
    function eliminarFicha(ficha) {
      const jugador = ficha.dataset.jugador;
      const padre = ficha.parentElement;

      const zona = jugador === '1'
        ? document.getElementById('eliminados-j1')
        : document.getElementById('eliminados-j2');
    
      // Clonar la ficha original sin eventos ni estilos activos
      const fichaClon = ficha.cloneNode(true);
      //fichaClon.removeAttribute('style');
      fichaClon.style.border = 'none';
      fichaClon.style.cursor = 'default';
      fichaClon.style.visibility = 'visible';
    
      zona.appendChild(fichaClon);
    
      // Eliminar del tablero
      
      if (padre && padre.contains(ficha)) {
        padre.removeChild(ficha);
        
        console.log(ficha);
      }
    }        
    
    function atacarFicha(atacanteFicha, objetivoFicha) {
      const atacante = obtenerAnimalPorId(atacanteFicha.id);
      const objetivo = obtenerAnimalPorId(objetivoFicha.id);
      if (!atacante || !objetivo) return;

      // Si el objetivo está en una casilla con hierba, no puede ser atacado
      const casillaObjetivo = objetivoFicha.parentElement;
      if (casillaObjetivo && casillaObjetivo.classList.contains('hierba')) {
      console.log('El objetivo está escondido en la hierba y no puede ser atacado.');
      return;
}

      // BONUS de agua si corresponde
      let ataque = atacante.ataque.length;
      const atacanteCasilla = atacanteFicha.parentElement;
    
      const esAnimalDeAgua =
        atacante.id === 'ficha5' || // Cocodrilo
        atacante.id === 'ficha18' || // Hipopotamo
        atacante.id === 'ficha16';   // Tortuga
    
      if (esAnimalDeAgua && atacanteCasilla.classList.contains('agua')) {
        ataque += 1;
      }
    
      const defensa = objetivo.defensa.length;
      const daño = Math.max(ataque - defensa, 0);    
    
      // Animación de ataque visual
      const atacanteClone = atacanteFicha.cloneNode(true);
      const objetivoRect = objetivoFicha.getBoundingClientRect();
      const atacanteRect = atacanteFicha.getBoundingClientRect();
    
      const offsetX = objetivoRect.left - atacanteRect.left;
      const offsetY = objetivoRect.top - atacanteRect.top;
    
      atacanteClone.style.position = 'absolute';
      atacanteClone.style.left = `${atacanteRect.left}px`;
      atacanteClone.style.top = `${atacanteRect.top}px`;
      atacanteClone.style.zIndex = 1000;
      atacanteClone.style.transition = 'transform 0.2s ease, top 0.2s ease, left 0.2s ease';
      document.body.appendChild(atacanteClone);
    
      // Paso 1: mover encima del objetivo
      requestAnimationFrame(() => {
        atacanteClone.style.transform = 'scale(1.4)';
        atacanteClone.style.left = `${atacanteRect.left + offsetX}px`;
        atacanteClone.style.top = `${atacanteRect.top + offsetY}px`;
      });
    
      // Paso 2: volver al tamaño normal encima
      setTimeout(() => {
        atacanteClone.style.transform = 'scale(1)';
      }, 200);
    
      // Paso 3: volver visualmente al origen
      setTimeout(() => {
        atacanteClone.style.left = `${atacanteRect.left}px`;
        atacanteClone.style.top = `${atacanteRect.top}px`;
      }, 400);
    
      // Paso 4: eliminar clon y aplicar daño
      setTimeout(() => {
        document.body.removeChild(atacanteClone);
        reducirVida(objetivoFicha.id, daño);
    
        // Parpadeo de la ficha objetivo
        objetivoFicha.classList.add('ficha-dañada');
        setTimeout(() => objetivoFicha.classList.remove('ficha-dañada'), 400);
    
        const html = generarHTMLTarjeta(objetivo);
        mostrarTarjeta(html, objetivoFicha.dataset.jugador === '1' ? 'izquierda' : 'derecha');
      }, 600);
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

    // Si la casilla es roca, no se puede hacer nada
    if (casilla.classList.contains('roca')) return;

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
  
function moverFicha(casilla) {
  console.log('Mover ficha');
  const nuevaFicha = fichaSeleccionada.cloneNode(true);
  nuevaFicha.id = fichaSeleccionada.id;
  nuevaFicha.dataset.jugador = fichaSeleccionada.dataset.jugador;
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

  nuevaFicha.addEventListener('mouseleave', () => {
    if (nuevaFicha.style.border === '2px solid yellow') return;
    ocultarTarjeta(nuevaFicha.dataset.jugador);
  });

  // Eliminar ficha de la casilla anterior
  if (fichaOrigen && fichaOrigen.hasChildNodes()) {
    fichaOrigen.removeChild(fichaSeleccionada);
  }

  // Verificar si llegó al otro extremo del tablero
  const columnaDestino = parseInt(casilla.dataset.columna);
  const jugador = parseInt(nuevaFicha.dataset.jugador);
  if ((jugador === 1 && columnaDestino === 9) || (jugador === 2 && columnaDestino === 0)) {
    sumarPunto(jugador);
    return; // No colocar la ficha, se considera retirada
  }

  casilla.appendChild(nuevaFicha);

  fichaSeleccionada.style.visibility = 'hidden';
  fichaSeleccionada = null;
  fichaOrigen = null;

  jugadorActivo = jugadorActivo === 1 ? 2 : 1;
  actualizarFichasDisponibles();
}


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

      ficha.addEventListener('mouseleave', () => {
        if (ficha.style.border === '2px solid yellow') {
          return; // No ocultar la tarjeta si la ficha está seleccionada
        }
        ocultarTarjeta(ficha.dataset.jugador);
      });


      ficha.addEventListener('click', () => {
        const idFicha = ficha.id;
        const animal = obtenerAnimalPorId(idFicha);
        if (animal) {
          const html = generarHTMLTarjeta(animal);
          mostrarTarjeta(html, ficha.dataset.jugador === '1' ? 'izquierda' : 'derecha');
        }
      });
    });

    function sumarPunto(jugador) {
      const marcador = document.getElementById(`puntos-j${jugador}`);
      let puntosActuales = parseInt(marcador.textContent);
      puntosActuales++;
      marcador.textContent = `${puntosActuales} / 6 🏆`;
    
      if (puntosActuales >= 6) {
        alert(`¡Jugador ${jugador} ha ganado la partida!`);
      }
    }
    
  });
