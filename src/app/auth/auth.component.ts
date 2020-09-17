import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth';
import { Pipe } from '../pipe';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  public google(): void {
    const non = x => x = { ...x, nonce: Auth.nonce(3) };
    const sta = x => x = { ...x, state: Auth.state({ redirectUrl: '/profile' }) };
    const enc = x => x = { ...x, state: Auth.encodeState(x.state) };
    const str = x => Auth.store(x);
    const par = x => Auth.param(x);
    const uri = x => Auth.uri('https://accounts.google.com/o/oauth2/v2/auth', x);
    const pip = Pipe.pipe(non, sta, enc, str, par, uri)(environment.google.param)

    window.location.assign(pip);
  }

  public test(): void { }
}
