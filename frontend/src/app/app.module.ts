import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
// import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

/**    PRIMENG IMPORTS
 *
import { TableModule } from 'primeng/table';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {ButtonModule} from 'primeng/components/button/button';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {ContextMenuModule} from 'primeng/components/contextmenu/contextmenu';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
// import {MultiSelectModule} from 'primeng/components/multiselect/multiselect';
import {SliderModule} from 'primeng/components/slider/slider';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {GrowlModule} from 'primeng/components/growl/growl';

***/

// Application Module
import { AuthModule } from './auth/auth.module';

import { HttpErrorHandler } from './shared/_services/http-handle-error.service';
import { AppHttpInterceptorService } from './shared/_services/app-http-interceptor.service';
import { LanguageService } from './views/terminology/shared/services/language.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    AuthModule,
    HttpClientModule

    /*
    TableModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ContextMenuModule,
    SliderModule,
    DropdownModule,
   // MultiSelectModule,
    GrowlModule
    */
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    // LoginComponent,
    RegisterComponent
  ],


  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy }  // Used to add Hash # to url
    // Title,
    LanguageService,
    HttpErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService ,
      multi: true
    }
  ],






  bootstrap: [ AppComponent ]
})
export class AppModule { }
