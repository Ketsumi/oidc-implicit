import { Pipe } from './pipe';
import { environment } from '../environments/environment';

export class Auth {
  constructor() { }

  static nonce(size: number) {
    const arr = x => new Uint32Array(x);
    const val = x => window.crypto.getRandomValues(x);
    const str = x => x.join('.');
    const enc = x => window.btoa(x);

    return Pipe.pipe(arr, val, str, enc, Pipe.trace('nonce'))(size);
  }

  static state(uri: any) {
    const ion = x => x = { ...x, iat: new Date().getTime() };
    const exp = x => x = { ...x, exp: x.iat + 600000 };

    return Pipe.pipe(ion, exp, Pipe.trace('state'))(uri);
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

  static store(param: any) {
    const set = x => (window.localStorage.setItem(param.nonce, param.state), x);

    return Pipe.pipe(set, Pipe.trace('store'))(param);
  }

  static param(param: any) {
    const ent = x => Object.entries(x);
    const map = x => x.map(([k, v]) => `${k}=${v}`);
    const jon = x => x.join('&');
    const rep = x => x.replace(/ /g, '%20');

    return Pipe.pipe(ent, map, jon, rep, Pipe.trace('param'))(param);
  }

  static uri(url:string, param:string) {
    const uri = x => [...x].join('?');

    return Pipe.pipe(uri, Pipe.trace('uri'))(arguments);
  }
}
