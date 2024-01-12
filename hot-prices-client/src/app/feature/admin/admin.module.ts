import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from '../user/components/users/users.component';
import { UserListComponent } from '../user/components/user-list/user-list.component';
import { UserItemComponent } from '../user/components/user-item/user-item.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportItemComponent } from './components/report-item/report-item.component';

@NgModule({
  declarations: [
    AdminComponent,
    ReportsComponent,
    ReportListComponent,
    ReportItemComponent,
  ],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
