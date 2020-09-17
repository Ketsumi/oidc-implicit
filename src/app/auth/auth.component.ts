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

  public authGoogle(params:any=environment.oauth.google.params) {
    const non = x => [x, { nonce: Auth.nonce(3) }];
    const sta = x => [...x, { state: Auth.state({ redirectUrl: '/profile' }) }];
    const mrg = x => Object.assign({}, ...x);
    const ste = x => Object.assign(x, { state: Auth.encodeState(x.state) });
    const str = x => [x, Auth.store([x.nonce, x.state])][0];
    const par = x => Auth.params(x);
    const uri = x => Auth.uri('https://accounts.google.com/o/oauth2/v2/auth', x);

    return Pipe.pipe(non, sta, mrg, ste, str, par, uri)(params);
  }

  public test() {}
}
