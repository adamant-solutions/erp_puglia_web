const API_BASE_URL = '/gw/';
 
export const environment = {
  production: true,
  tokenUrl: API_BASE_URL + 'oauth2/token',
  patrimonioUrl: API_BASE_URL + 'patrimonio',
  anagraficaUrl: API_BASE_URL + 'anagrafica',
  contrattiUrl: API_BASE_URL + 'contratti',
  morositaUrl: API_BASE_URL + 'morosita',
  manutenzioneUrl: API_BASE_URL + 'manutenzione',
  condominiUrl: API_BASE_URL + 'spese/condomini',
  periodiGestioniUrl: API_BASE_URL + 'spese/periodi',
  periodiGestioniLightUrl: API_BASE_URL + 'spese/periodi/light',
  vociSpesaUrl: API_BASE_URL + 'spese/voci-spesa',
  condominiLightUrl:API_BASE_URL + 'spese/condomini/light',
  statoPagamentiUrl : API_BASE_URL + 'spese/monitoraggio-pagamenti/unita',
  contabilitaUrl: API_BASE_URL + 'contabilita'
};
