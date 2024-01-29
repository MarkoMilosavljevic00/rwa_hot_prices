import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/feature/post/models/report.model';
import { ReportService } from '../../service/report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: Report[];
  onePageReports: Report[];

  page = 0;
  size = 5;

  constructor(private reportService: ReportService){

  }

  ngOnInit() {
    // this.reports = this.reportService.getReports();
    // console.log(this.reports)
    // this.getData({ pageIndex: this.page, pageSize: this.size });
  }

  getData(obj: any) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.onePageReports = this.reports.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}
