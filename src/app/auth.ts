import { Pipe } from './pipe';
import { environment } from '../environments/environment';

export class Auth {
  constructor() { }

  static nonce(size:number):string {
    const arr = x => new Uint32Array(x);
    const val = x => window.crypto.getRandomValues(x);
    const str = x => x.join('.');
    const enc = x => window.btoa(x);

    return Pipe.pipe(arr, val, str, enc, Pipe.trace('nonce'))(size);
  }

  static state(uri:any):any {
    const ion = x => Object.assign(x, { iat: new Date().getTime() });
    const exp = x => Object.assign(x, { exp: x.iat + 600000 });

    return Pipe.pipe(ion, exp, Pipe.trace('state'))(uri);
  }

  static encodeState(state:any):string {
    const str = x => JSON.stringify(x);
    const enc = x => window.btoa(x);

    return Pipe.pipe(str, enc, Pipe.trace('encodeState'))(state);
  }

  static decodeState(state:string):string {
    const dec = x => window.atob(x);
    const obj = x => JSON.parse(x);

    return Pipe.pipe(dec, obj, Pipe.trace('decodeState'))(state);
  }

  static session(nonce:string, state:any):string[] {
    const str = x => [x[0], JSON.stringify(x[1])];
    const enc = x => [x[0], window.btoa(x[1])];

    return Pipe.pipe(str, enc, Pipe.trace('session'))(arguments);
  }

  static store(pair:string[]) {
    const set = x => [x, window.localStorage.setItem(...(x as [string, string]))][0];

    return Pipe.pipe(set, Pipe.trace('store'))(pair);
  }

  static params(params:any) {
    const ent = x => Object.entries(x);
    const map = x => x.map(([k, v]) => `${k}=${v}`);
    const jon = x => x.join('&');
    const rep = x => x.replace(/ /g, '%20');

    return Pipe.pipe(ent, map, jon, rep, Pipe.trace('params'))(params);
  }

  static paramObj(params:any, nonce:any, state:any) {
    const mrg = x => y => z => Object.assign({}, x, y, z);

    return Pipe.pipe(mrg)(params)(nonce)(state);
  }

  static uri(url:string, params:string) {
    const uri = x => [...x].join('?');

    return Pipe.pipe(uri, Pipe.trace('uri'))(arguments);
  }
}
