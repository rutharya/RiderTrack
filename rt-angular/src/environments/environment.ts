// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:3000/api',
  MAPBOX_API_KEY: 'pk.eyJ1IjoicnV0dWphZmFsZHUiLCJhIjoiY2pmMWo0ZWpsMDBhNTJ3cGRxYW5meXgyaCJ9.xBm2FFUhUjaEUtCVwLJKAw',
  firebase: {
    apiKey: 'AIzaSyATE_T_HP9RqMyU5-OuUPQKU3jIrlBDmh4',
    authDomain: 'ridertrack-a6b4e.firebaseapp.com',
    databaseURL: 'https://ridertrack-a6b4e.firebaseio.com',
    projectId: 'ridertrack-a6b4e',
    storageBucket: 'ridertrack-a6b4e.appspot.com',
    messagingSenderId: '861392651398'
  }
};
