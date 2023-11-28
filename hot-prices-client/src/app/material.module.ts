import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import{MatDatepickerModule} from '@angular/material/datepicker';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatIconModule} from '@angular/material/icon';
import{MatSidenavModule} from '@angular/material/sidenav';
import{MatListModule} from '@angular/material/list';


const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
]

@NgModule({
  declarations: [],
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class MaterialModule { }
