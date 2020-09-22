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

  public googleURI({uri,par}={ ...env.google() }): void {
    const dat = x => ({ uri: x[0], par: x[1], nonce: Auth.nonce(1) });
    const no1 = x => ({ ...x, pa1: { ...x.par, nonce: Auth.nonce(3) } });
    const st1 = x => ({ ...x, pa1: { ...x.pa1, state: Auth.state({ redirectUrl: '/profile', nonce: x.nonce }) } });
    const ns2 = x => ({ ...x, pa2: { ...x.par, nonce: x.nonce, state: x.pa1.nonce } });
    const sp1 = x => ({ ...x, sp1: new URLSearchParams(x.pa1) });
    const sp2 = x => ({ ...x, sp2: new URLSearchParams(x.pa2) });
    const loc = x => (Auth.store(x.sp1, 'nonce', 'state'), x);
    const url = x => new URL(`${x.uri}?${x.sp2.toString()}`);
    const lnk = x => x.href;

    const pip = Pipe.pipe(dat, no1, st1, ns2, sp1, sp2, loc, url, lnk)([uri, par]);

    window.location.assign(pip);
  }

  public test({uri,par}={ ...env.google() }): void {
    const dat = x => ({ uri: x[0], par: x[1], nonce: Auth.nonce(1) });
    const no1 = x => ({ ...x, pa1: { ...x.par, nonce: Auth.nonce(3) } });
    const st1 = x => ({ ...x, pa1: { ...x.pa1, state: Auth.state({ redirectUrl: '/profile', nonce: x.nonce }) } });
    const ns2 = x => ({ ...x, pa2: { ...x.par, nonce: x.nonce, state: x.pa1.nonce } });
    const sp1 = x => ({ ...x, sp1: new URLSearchParams(x.pa1) });
    const sp2 = x => ({ ...x, sp2: new URLSearchParams(x.pa2) });
    const loc = x => (Auth.store(x.sp1, 'nonce', 'state'), x);
    const url = x => new URL(`${x.uri}?${x.sp2.toString()}`);
    const lnk = x => x.href;

    Pipe.pipe(dat, no1, st1, ns2, sp1, sp2, loc, url, lnk, Pipe.trace('test'))([uri, par]);
  }
}
