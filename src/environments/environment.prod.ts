export const environment = {
  production: true,
  oauth: {
    google: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      params: {
        response_type: RESPONSE_TYPE,
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI
      }
    }
  }
};
