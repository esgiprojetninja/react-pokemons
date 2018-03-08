export const exists = v => typeof v !== "undefined" && v !== null;

export const isUndefined = v => typeof v === "undefined" || v === null;

export const isEmpty = v => isUndefined(v)
    || (isString(v) && v.length === 0)
    || (isArray(v) && v.length === 0);

export const isString = (v, minLen = -1) => !isUndefined(v) && typeof v === "string" && v.length > minLen && v !== "null";

export const isNumber = v => exists(v) && typeof v === "number";

export const isTimestamp = v => !isNaN(v) || isString(v, 0) || isNumber(v);

export const isObject = v => exists(v) && typeof v === "object";

export const isArray = (v, minLen = -1) => exists(v) && (typeof v === "array" || (isObject(v) && isNumber(v.length) && v.length > minLen)); // eslint-disable-line

export const isBoolean = v => exists(v) && (typeof v === "boolean");

export const isClass = (v, _class) => isObject(v) && v.constructor.name === _class;

export const isFunction = v => exists(v) && typeof v === "function";

export const objectHasProperties = (obj, props) => isObject(obj)
    && isUndefined(props.find(prop => !obj.hasOwnProperty(prop))); // eslint-disable-line

