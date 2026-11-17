import simpson from './integral/simpson.ts';
import trapezoid from './integral/trapezoid.ts';
import minusInfToInf from './integral/DE/minusInfToInf.ts';
import zeroToInf from './integral/DE/zeroToInf.ts';
import minusOneToOne from './integral/DE/minusOneToOne.ts';
export default {
  simpson,
  trapezoid,
  DE: {
    minusInfToInf,
    zeroToInf,
    minusOneToOne
  }
};