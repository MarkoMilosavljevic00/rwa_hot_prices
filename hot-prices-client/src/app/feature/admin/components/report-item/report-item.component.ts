import { Component, Input } from '@angular/core';
import { ReportTest } from 'src/app/feature/post/models/report.model';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent {
  @Input() report!: ReportTest;
}
