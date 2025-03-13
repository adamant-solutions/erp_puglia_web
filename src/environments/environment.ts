// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_BASE_URL = '/';

export const environment = {
  production: false,
  tokenUrl: API_BASE_URL + 'oauth2/token',
  patrimonioUrl: API_BASE_URL + 'patrimonio',
  anagraficaUrl: API_BASE_URL + 'anagrafica',
  contrattiUrl: API_BASE_URL + 'contratti',
  morositaUrl: API_BASE_URL + 'morosita',
  manutenzioneUrl: API_BASE_URL + 'manutenzione',
  condominiUrl: API_BASE_URL + 'spese/condomini',
  periodiGestioniUrl: API_BASE_URL + 'spese/periodi',
  condominiLightUrl: API_BASE_URL + 'spese/condomini/light',
  statoPagamentiUrl : API_BASE_URL + 'spese/monitoraggio-pagamenti/unita',
  contabilitaUrl: API_BASE_URL + 'contabilita',
    speseUrl: API_BASE_URL + 'spese'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
