import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./app-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./pages/home/home.component";
import { ShareModule } from "./app-share.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { chiboCreateDaiolog } from "./pages/ChiBo/daiolog/chibo.daiolog";
import { ChiBoComponent } from "./pages/ChiBo/chibo.component";
import { DangVienComponent } from "./pages/Dang-vien/dang-vien.component";
import { DangVienFormDialog } from "./pages/Dang-vien/dang-vien-form-dialog/dang-vien-form-dialog.component";

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
  exports: [MaterialModule],
  declarations: [
    AppComponent,
    HomeComponent,
    ChiBoComponent,
    chiboCreateDaiolog,
    DangVienComponent,
    DangVienFormDialog,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
