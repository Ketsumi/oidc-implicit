export const environment = {
  production: true,
  oauth: {
    google: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      params: {
        response_type: 'id_token',
        client_id: '986484840298-lg8and8ts23n47cgs1thkgk5a2uroge0.apps.googleusercontent.com',
        scope: 'openid email',
        redirect_uri: 'https://ketsumi.github.io/oidc-implicit/callback'
      }
    }
  }
};
