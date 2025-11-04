function sum(arr: number[]): number {
  return parseFloat(arr.reduce((a, b) => a + b, 0).toFixed(2));
}

export const buscar = (
  dia: number,
  horas_periodo: number[][]
): number[] | undefined => {
  for (const periodo of horas_periodo) {
    const [desde, hasta] = periodo;
    if (desde <= dia && dia <= hasta) {
      return periodo;
    }
  }
  return undefined;
};


/**
 * Calcula el acumulado de horas según jornada, acumula, turno y descanso
 */
export function getAcumula(
  jornada: number,
  acumula: number,
  turno: number,
  descanso: number
): number {
  if (jornada === 7 && acumula === 1) {
    return 1;
  } else if (turno === 3 && jornada === 5 && acumula === 2) {
    return 1.25;
  }
  acumula = acumula - descanso;
  return acumula < 0 ? 0 : acumula;
}

/**
 * Convierte la descripción del descanso en horas
 */
export function parseDescanso(desc: string): number | undefined {
  if (desc === 'Sin descanso') {
    return 0;
  } else if (desc.includes('30')) {
    return 0.5;
  } else if (desc.includes('45')) {
    return 0.75;
  }
}

export function getDescanso(
  prefix: string,
  hr_cobra: number,
  hr_acumula: number,
  turno: number,
  equipo?: string
): string {
  const totalHoras = hr_cobra + hr_acumula;

  if (turno === 5) {
    // Semi-nocturno
    if (totalHoras > 6) {
      let descanso = '45 minutos';

      if (equipo) {
        const equipoLower = equipo.toLowerCase();
        if (
          equipoLower.includes('export-carga') ||
          equipoLower.includes('desc')
        ) {
          descanso = '45 minutos';
        } else {
          const patt = / T[0-9]+C /;
          if (patt.test(equipo)) {
            descanso = '45 minutos';
          }
        }
      }

      return prefix + descanso;
    } else {
      return 'Sin descanso';
    }
  } else if (turno === 3) {
    // Noche
    return totalHoras > 6 ? prefix + '45 minutos' : 'Sin descanso';
  } else {
    // Mañana o tarde
    return totalHoras > 6 ? prefix + '30 minutos' : 'Sin descanso';
  }
}

export const generatePass = () => {
  return Math.random().toString(36).slice(-6);
};
