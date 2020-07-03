import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ShareModule } from './app-share.module';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ShareModule
    ],
    exports:[
        MaterialModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ],
})

export class AppModule {
}
