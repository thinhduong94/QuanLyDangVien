import { NgModule } from '@angular/core';
import { MatSliderModule  } from '@angular/material/slider';
import { MatSidenavModule  } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
    imports: [
      MatSliderModule,
      MatSidenavModule,
      MatIconModule,
      MatTableModule,
      MatInputModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule
    ],
    exports: [
      MatSliderModule,
      MatSidenavModule,
      MatIconModule,
      MatTableModule,
      MatInputModule,
      MatPaginatorModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatSortModule
    ]
})
export class MaterialModule { }