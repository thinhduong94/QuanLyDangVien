import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { personGroupComponent } from './pages/personGroup/personGroup.component';
import { ChiBoComponent } from './pages/ChiBo/chibo.component';

const routes: Routes = [
  { path: '', component: ChiBoComponent },
  { path: 'persongroup' , component: personGroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }