import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { TabsComponent } from './core/components/header/tabs/tabs.component';
import { FooterComponent } from './core/components/footer/footer.component';

import localeIt from '@angular/common/locales/it';
import { authInterceptor } from './core/interceptors/authorization.interceptor';
import { AuthorizationService } from './core/services/authorization.service';
import { PatrimonioService } from './core/services/patrimonio.service';
import { AnagraficaService } from './core/services/anagrafica.service';
import { ContrattiService } from './core/services/contratti.service';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from './shared/loader.component';
import { ToastComponent } from './core/components/toast/toast.component';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './core/services/custom-paginator-intl';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent,
    FooterComponent,
    LoaderComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'it' },
    provideHttpClient(withInterceptors([authInterceptor, loaderInterceptor])),
    AuthorizationService,
    PatrimonioService,
    AnagraficaService,
    ContrattiService,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },

    { provide: 'tokenUrl', useValue: environment.tokenUrl },
    { provide: 'patrimonioUrl', useValue: environment.patrimonioUrl },
    { provide: 'anagraficaUrl', useValue: environment.anagraficaUrl },
    { provide: 'contrattiUrl', useValue: environment.contrattiUrl },
    { provide: 'morositaUrl', useValue: environment.morositaUrl },
    { provide: 'manutenzioneUrl', useValue: environment.manutenzioneUrl },
    { provide: 'condominiUrl', useValue: environment.condominiUrl },
    { provide: 'periodiGestioniUrl', useValue: environment.periodiGestioniUrl },
    { provide: 'condominiLightUrl', useValue: environment.condominiLightUrl },
    { provide: 'contabilitaUrl', useValue: environment.contabilitaUrl }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
