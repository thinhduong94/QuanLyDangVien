import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ShareModule } from './app-share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { chiboCreateDaiolog } from './pages/ChiBo/daiolog/chibo.daiolog';
import { ChiBoComponent } from './pages/ChiBo/chibo.component';
import { imageComponent } from './pages/share/image/image.component';
import { dangvien213CreateDaiolog } from './pages/DangVien213/daiolog/dangvien213.daiolog';
import { DangVien213Component } from './pages/DangVien213/dangvien213.component';
import { alertComponent } from './pages/share/alert/alert.component';
import { importExcelComponent } from './pages/share/importExcel/importExcel.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ShareModule,
        FormsModule, 
        ReactiveFormsModule,
    ],
    exports:[
        MaterialModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ChiBoComponent,
        chiboCreateDaiolog,
        imageComponent,
        DangVien213Component,
        dangvien213CreateDaiolog,
        alertComponent,
        importExcelComponent
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ],
})

export class AppModule {
}
