import { Pipe } from './pipe';

export class Auth {
  constructor() { }

  static nonce(size: number) {
    const arr = x => new Uint32Array(x);
    const val = x => window.crypto.getRandomValues(x);
    const str = x => x.join('.');
    const enc = x => window.btoa(x);

    return Pipe.pipe(arr, val, str, enc, Pipe.trace('nonce'))(size);
  }

  static state(uri: any, encode: boolean=true) {
    const ion = x => Object.assign({}, { ...x, iat: new Date().getTime() });
    const exp = x => Object.assign({}, { ...x, exp: x.iat + 600000 });
    const str = x => !encode ? x : JSON.stringify(x);
    const enc = x => !encode ? x : window.btoa(x);

    return Pipe.pipe(ion, exp, str, enc, Pipe.trace('state'))(uri);
  }

  static encodeState(state: any) {
    const str = x => JSON.stringify(x);
    const enc = x => window.btoa(x);

    return Pipe.pipe(str, enc, Pipe.trace('encodeState'))(state);
  }

  static decodeState(state: string) {
    const dec = x => window.atob(x);
    const obj = x => JSON.parse(x);

    return Pipe.pipe(dec, obj, Pipe.trace('decodeState'))(state);
  }

  static store(param: URLSearchParams, key: string, val: string) {
    const set = x => (window.localStorage.setItem(x[0].get(x[1]), x[0].get(x[2])), x);

    return Pipe.pipe(set, Pipe.trace('store'))(arguments);
  }

  static param(param: any) {
    const ent = x => Object.entries(x);
    const map = x => x.map(([k, v]) => `${k}=${v}`);
    const jon = x => x.join('&');
    const rep = x => x.replace(/ /g, '%20');

    return Pipe.pipe(ent, map, jon, rep, Pipe.trace('param'))(param);
  }
}
