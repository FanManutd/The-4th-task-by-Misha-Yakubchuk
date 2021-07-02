/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import IConfig from '../IConfig';

const Validator = {
  validateAll(config: IConfig): IConfig {
    const {
      min,
      max,
      double,
      tips,
      minMax,
      vertical,
      scale,
      scaleSnap,
      scaleLimit,
      scin,
    } = config;

    config.max = this.validateMinMax(min, max);
    config.double = this.validateDouble(double);
    config.step = this.validateStep(config.min, config.max, config.step);
    config = this.validateFromTo(config);
    config.tips = this.validateTips(tips);
    config.minMax = this.validateIsMinMax(minMax);
    config.vertical = this.validateVertical(vertical);
    config.scale = this.validateIsScale(scale);
    config.scaleLimit = this.validateScaleLimit(scaleLimit);
    config.scaleNum = this.validateScaleNum(config);
    config.scaleSnap = this.validateScaleSnap(scaleSnap);
    config.scin = this.validateScin(scin);

    return config;
  },

  validateMinMax(min: number, max: number): number {
    const isWrongType = typeof min !== 'number' || typeof max !== 'number';

    if (isWrongType) {
      throw new Error('min and max must be a number');
    }

    max = (max <= min) ? min + 1000 : max;

    return max;
  },

  validateDouble(double: boolean): boolean {
    if (typeof double !== 'boolean') {
      console.warn('double must be boolean');
      double = false;
    }

    return double;
  },

  validateStep(min: number, max: number, step: number): number {
    if (typeof step !== 'number') {
      console.warn('step must be a number');
      return NaN;
    }

    if (!step) {
      return NaN;
    }

    if (step > Math.abs(min) + Math.abs(max)) {
      console.warn('step too big');
      step = Math.min(Math.abs(min), Math.abs(max));
    }

    if (step < 0) {
      console.warn('step must be equal or greater than 0');
      step = 0;
    }

    return step;
  },

  validateFromTo(config: IConfig): IConfig {
    const {
      min,
      max,
      from,
      to,
      double,
    } = config;

    const isWrongType = typeof from !== 'number' || typeof to !== 'number';

    if (isWrongType) {
      console.warn('from and to must be a number');
      config.from = min;
      config.to = max;
      return config;
    }

    if (double) {
      config.to = (to > max) ? max : (to < min) ? min : to;
      config.from = (from < min) ? min : (from > max) ? max : from;
      config.from = (config.from > config.to) ? min : config.from;
    } else {
      config.to = (to > max) ? max : (to < min) ? min : to;
    }

    return config;
  },

  validateTips(tips: boolean): boolean {
    if (typeof tips !== 'boolean') {
      console.warn('isTip must be boolean');
      tips = true;
    }

    return tips;
  },

  validateIsMinMax(minMax: boolean): boolean {
    if (typeof minMax !== 'boolean') {
      console.warn('isMinMax must be boolean');
      minMax = false;
    }

    return minMax;
  },

  validateVertical(vertical: boolean): boolean {
    if (typeof vertical !== 'boolean') {
      console.warn('vertical must be boolean');
      vertical = false;
    }

    return vertical;
  },

  validateIsScale(scale: boolean): boolean {
    if (typeof scale !== 'boolean') {
      console.warn('scale must be boolean');
      scale = false;
    }

    return scale;
  },

  validateScaleLimit(scaleLimit: number) {
    if (typeof scaleLimit !== 'number') {
      console.warn('scaleLimit must be a number');
      scaleLimit = 4;
    }

    if (scaleLimit > 50) {
      console.warn('scaleLimit too big');
      scaleLimit = 50;
    }

    if (scaleLimit < 1) {
      console.warn('scaleLimit must be equal or greater than 1');
      scaleLimit = 1;
    }

    return scaleLimit;
  },

  validateScaleNum(config: IConfig): number {
    const {
      min,
      max,
      step,
      scaleLimit,
    } = config;

    let { scaleNum } = config;

    if (typeof scaleNum !== 'number') {
      console.warn('scaleNum must be a number');
      scaleNum = 4;
    }

    if (scaleNum > scaleLimit) {
      console.warn('scaleNum must be equal or less than scaleLimit');
      scaleNum = scaleLimit;
    }

    const maxNumberOfValues = Math.round((max - min) / step);

    if (scaleNum > maxNumberOfValues) {
      console.warn('scaleNum must be equal or less than (max - min) / step');
      scaleNum = maxNumberOfValues;
    }

    if (scaleNum < 1) {
      console.warn('scaleNum must be equal or greater than 1');
      scaleNum = 1;
    }

    return scaleNum;
  },

  validateScaleSnap(scaleSnap: boolean): boolean {
    if (typeof scaleSnap !== 'boolean') {
      console.warn('scaleSnap must be boolean');
      scaleSnap = false;
    }

    return scaleSnap;
  },

  validateScin(scin: string): string {
    if (typeof scin !== 'string') {
      console.warn('scin must be a string');
      return 'orange';
    }

    const isWrong = scin !== 'orange' && scin !== 'darkcongo' && scin !== 'whitered' && scin !== 'azure' && scin !== 'indigo';

    if (isWrong) {
      console.warn('scin invalid');
      scin = 'orange';
    }

    return scin;
  },
};

export default Validator;
