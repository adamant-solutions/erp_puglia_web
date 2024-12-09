import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { TabsComponent } from './core/components/header/tabs/tabs.component';
import { FooterComponent } from './core/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, TabsComponent, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [provideHttpClient(), DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
