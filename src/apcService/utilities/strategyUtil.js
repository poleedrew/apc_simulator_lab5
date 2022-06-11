"use strict";
exports.__esModule = true;
exports.getStrategy = exports.filetStrategy = exports.sirlionStrategy = exports.defaultStrategy = exports.sharonStrategy = void 0;
var sharonStrategy = /** @class */ (function () {
    function sharonStrategy() {
    }
    sharonStrategy.prototype.calculate = function (parameter) {
        if (parameter.thickness < 2) {
            return {
                mes: 'TOOOO SMALL'
            };
        }
        var temperature = (parameter.thickness * parameter.tFactor).toFixed(2);
        var period = '20';
        return { period: period, temperature: temperature };
    };
    return sharonStrategy;
}());
exports.sharonStrategy = sharonStrategy;
var defaultStrategy = /** @class */ (function () {
    function defaultStrategy() {
    }
    defaultStrategy.prototype.calculate = function (parameter) {
        if (parameter.thickness < 2) {
            return {
                mes: 'TOOOO SMALL'
            };
        }
        var temperature = '100';
        var period = (parameter.moisture * parameter.mFactor).toFixed(2);
        return { period: period, temperature: temperature };
    };
    return defaultStrategy;
}());
exports.defaultStrategy = defaultStrategy;
var sirlionStrategy = /** @class */ (function () {
    function sirlionStrategy() {
    }
    sirlionStrategy.prototype.calculate = function (parameter) {
        if (parameter.thickness < 2) {
            return {
                mes: 'TOOOO SMALL'
            };
        }
        var temperature = (parameter.thickness * parameter.tFactor).toFixed(2);
        var period = (parameter.moisture * parameter.mFactor).toFixed(2);
        return { period: period, temperature: temperature };
    };
    return sirlionStrategy;
}());
exports.sirlionStrategy = sirlionStrategy;
var filetStrategy = /** @class */ (function () {
    function filetStrategy() {
    }
    filetStrategy.prototype.calculate = function (parameter) {
        if (parameter.thickness < 2) {
            return {
                mes: 'TOOOO SMALL'
            };
        }
        var temperature = '200';
        var period = (parameter.moisture * parameter.mFactor).toFixed(2);
        if (parameter.thickness < 2) {
            period = 'TOOOO SMALL';
        }
        return { period: period, temperature: temperature };
    };
    return filetStrategy;
}());
exports.filetStrategy = filetStrategy;
function getStrategy(type) {
    if (type === 'SHARON')
        return new sharonStrategy();
    else if (type === 'RIB_EYE')
        return new defaultStrategy();
    else if (type === 'SIRLION')
        return new sirlionStrategy();
    else
        return new filetStrategy();
}
exports.getStrategy = getStrategy;
