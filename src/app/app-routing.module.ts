import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { personGroupComponent } from './pages/personGroup/personGroup.component';
import { ChiBoComponent } from './pages/ChiBo/chibo.component';
import { DangVien213Component } from './pages/DangVien213/dangvien213.component';

const routes: Routes = [
  { path: '', component: ChiBoComponent },
  { path: 'persongroup' , component: personGroupComponent},
  { path: 'dangvien213' , component: DangVien213Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }