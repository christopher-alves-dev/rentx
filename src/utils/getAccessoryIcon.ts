import SpeedSvg from '../assets/images/speed.svg';
import AccelerationSvg from '../assets/images/acceleration.svg';
import ForceSvg from '../assets/images/force.svg';
import GasolineSvg from '../assets/images/gasoline.svg';
import EnergySvg from '../assets/images/energy.svg';
import HybridSvg from '../assets/images/hybrid.svg';
import ExchangeSvg from '../assets/images/exchange.svg';
import PeopleSvg from '../assets/images/people.svg';
import CarSvg from '../assets/images/car.svg';

export const getAccessoryIcon = (type: string ) => {
  switch (type) {
    case 'speed':
      return SpeedSvg;
    case 'acceleration':
      return AccelerationSvg;
    case 'turningDiameter':
      return ForceSvg;
    case 'gasolineMotor':
      return GasolineSvg;
    case 'electricMotor':
      return EnergySvg;
    case 'hybridMotor':
      return HybridSvg;
    case 'exchange':
      return ExchangeSvg;
    case 'seats':
      return PeopleSvg;
    default:
      return CarSvg;
  }
}