import {Parameter} from './parameter';
export interface SteakStrategy{
		calculate(parameter: Parameter);    
}

export class sharonStrategy implements SteakStrategy{
    
    public calculate(parameter: Parameter) {
        if(parameter.thickness < 2){
            return {
              mes: 'TOOOO SMALL'
            };
        }
        const temperature = (parameter.thickness * parameter.tFactor).toFixed(2);
        const period = '20';
        return {period, temperature};
    }
}

export class defaultStrategy implements SteakStrategy{
    public calculate(parameter: Parameter) {
        if(parameter.thickness < 2){
            return {
              mes: 'TOOOO SMALL'
            };
        }
        const temperature = '100';
        const period = (parameter.moisture * parameter.mFactor).toFixed(2);
        return {period, temperature};
    }
}

export class sirlionStrategy implements SteakStrategy{
    public calculate(parameter: Parameter) {
        if(parameter.thickness < 2){
            return {
              mes: 'TOOOO SMALL'
            };
        }
        const temperature = (parameter.thickness * parameter.tFactor).toFixed(2);
        const period = (parameter.moisture * parameter.mFactor).toFixed(2);
        return {period, temperature};
    }
}

export class filetStrategy implements SteakStrategy{
    public calculate(parameter: Parameter) {
        if(parameter.thickness < 2){
            return {
              mes: 'TOOOO SMALL'
            };
        }
        const temperature = '200';
        let period = (parameter.moisture * parameter.mFactor).toFixed(2);
        if(parameter.thickness < 2){
            period = 'TOOOO SMALL';
        }
        return {period, temperature};
    }
}

export function getStrategy(type:string){
    if(type === 'SHARON')
      return new sharonStrategy();
    else if( type === 'RIB_EYE')
      return new defaultStrategy();
    else if( type === 'SIRLION')
      return new sirlionStrategy();
    else
      return new filetStrategy();
}