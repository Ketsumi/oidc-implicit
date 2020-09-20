import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth';
import { Pipe } from '../pipe';
import { environment as env } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  public googleURI(): void {
    const dat = x => ({ uri: x[0], par: x[1] });
    const non = x => ({ ...x, par: { ...x.par, nonce: Auth.nonce(3) } });
    const sta = x => ({ ...x, par: { ...x.par, state: Auth.state({ redirectUrl: '/profile' }) } });
    const par = x => ({ ...x, par: new URLSearchParams(x.par) });
    const loc = x => (Auth.store(x.par, 'nonce', 'state'), x);
    const url = x => new URL(`${x.uri}?${x.par.toString()}`);
    const lnk = x => x.href;

    const pip = Pipe.pipe(dat, non, sta, par, loc, url, lnk)([uri, param]);

    window.location.assign(pip);
  }

  public test({uri,param}={ ...env.google() }): void {
    const dat = x => ({ uri: x[0], par: x[1] });
    const non = x => ({ ...x, par: { ...x.par, nonce: Auth.nonce(3) } });
    const sta = x => ({ ...x, par: { ...x.par, state: Auth.state({ redirectUrl: '/profile' }) } });
    const par = x => ({ ...x, par: new URLSearchParams(x.par) });
    const loc = x => (Auth.store(x.par, 'nonce', 'state'), x);
    const url = x => new URL(`${x.uri}?${x.par.toString()}`);
    const lnk = x => x.href;
    
    Pipe.pipe(dat, non, sta, par, loc, url, lnk, Pipe.trace('test'))([uri, param]);
  }
}
