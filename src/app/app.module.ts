import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';  
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './_interceptor/loading.interceptor';
import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";
import { TimeagoModule } from 'ngx-timeago';

@NgModule({ declarations: [
        AppComponent,
        NavComponent,  
        ListsComponent,
        MessagesComponent,
        TestErrorComponent,
        NotFoundComponent,
        ServerErrorComponent,  
    ],
    bootstrap: [AppComponent], 
    imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgxSpinnerComponent,
    TabsModule.forRoot(), 
    TimeagoModule.forRoot()
],
    providers: [
        // Provide HTTP interceptors using the new Angular 18 API
        provideHttpClient(
          withInterceptors([loadingInterceptor]),
          withInterceptorsFromDi()
        ),
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ]
})
export class AppModule { }
