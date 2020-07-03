import { NgModule } from '@angular/core';
import { leftMenuComponent } from './pages/share/left-menu/left-menu.component';


@NgModule({
  declarations: [leftMenuComponent],
  exports:[leftMenuComponent]
})
export class ShareModule { }