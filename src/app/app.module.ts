import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './core/components/header/header.component';
import { TabsComponent } from './core/components/header/tabs/tabs.component';
import { FooterComponent } from './core/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, TabsComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
