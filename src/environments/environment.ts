// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = Object.freeze({
  production: false,
  google: function() {
    return {
      uri: 'https://accounts.google.com/o/oauth2/v2/auth',
      par: {
        response_type: 'id_token',
        client_id: '986484840298-lg8and8ts23n47cgs1thkgk5a2uroge0.apps.googleusercontent.com',
        scope: 'openid email',
        redirect_uri: 'https://ketsumi.github.io/oidc-implicit/callback'
      }
    };
  }
});

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
