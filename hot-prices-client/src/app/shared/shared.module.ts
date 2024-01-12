import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { DateDisplayComponent } from './components/date-display/date-display.component';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { CheckTextLengthDirective } from './directives/check-text-length.directive';
import { EditorComponent } from './components/editor/editor.component';
import { MatNativeDateModule } from '@angular/material/core';
import { PriceComponent } from './components/price/price.component';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    YesNoDialogComponent,
    UserAvatarComponent,
    DateDisplayComponent,
    NoSanitizePipe,
    CheckTextLengthDirective,
    EditorComponent,
    PriceComponent,
    InputDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatNativeDateModule,
  ],
  exports:[
    HeaderComponent,
    SidenavComponent,
    YesNoDialogComponent,
    UserAvatarComponent,
    DateDisplayComponent,
    PriceComponent,
    CommonModule,
    MaterialModule,
    PrimengModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    NoSanitizePipe,
    CheckTextLengthDirective,
    EditorComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
