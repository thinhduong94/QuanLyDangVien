import { NgModule } from '@angular/core';
import { MatSliderModule  } from '@angular/material/slider';
import { MatSidenavModule  } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
    imports: [
      MatSliderModule,
      MatSidenavModule,
      MatIconModule,
      MatTableModule,
      MatInputModule,
      MatPaginatorModule
    ],
    exports: [
      MatSliderModule,
      MatSidenavModule,
      MatIconModule,
      MatTableModule,
      MatInputModule,
      MatPaginatorModule
    ]
})
export class MaterialModule { }