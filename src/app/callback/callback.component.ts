import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth';
import { Pipe } from '../pipe';
import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.sass']
})
export class CallbackComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  public verify(): void {
    Pipe.pipe('')('');
  }

  public test(loc: Location=window.location): void {
    const url = x => new URL(x.toString());
    const par = x => new URLSearchParams(x.hash.slice(1));
    const obj = x => ({ usp: x, time: new Date().getTime() });
    const sta = x => ({ ...x, state: window.localStorage.getItem(x.usp.get('state')) ?? null });
    const dec = x => ({ ...x, state: JSON.parse(atob(x.state)) });
    const ch1 = x => ((x.state.exp > x.time || x.state.iat > x.time) ? null : x);
    const jwt = x => ({ ...x, jwt: x.usp.get('id_token') });
    const pay = x => ({ ...x, pay: JSON.parse(atob(x.jwt.split('.')[1])) });
    const ch2 = x => ((x.pay.exp > x.time || x.pay.iat > x.time) ? null : x);
    const ch3 = x => (x.pay.nonce != x.state.nonce ? null : x);

    Pipe.pipe(url, par, obj, sta, Pipe.trace('test'))(loc);
  }
}
