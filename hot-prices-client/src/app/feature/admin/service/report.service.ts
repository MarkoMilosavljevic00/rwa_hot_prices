import { Injectable } from '@angular/core';
import { ReportTest } from '../../post/models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  getReports(): ReportTest[]{
    return [
      {
        id: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae egestas turpis. Aliquam nec viverra orci. Etiam eget molestie diam. Suspendisse placerat neque a turpis ornare egestas. Nunc vitae porta velit. Cras sed tincidunt nibh. Cras pulvinar gravida ante eget iaculis. Integer mattis ex vel tortor vulputate, nec imperdiet nunc dictum. Suspendisse nulla sapien, porta a diam eget, faucibus aliquet lorem. Phasellus efficitur lorem lectus, a posuere arcu suscipit a. Sed vitae enim at purus tincidunt maximus. Nullam lobortis nunc ac accumsan faucibus. In eget dui ut ex consequat pretium.Proin sed sagittis purus. Nulla cursus lobortis leo a dignissim. Curabitur in risus ipsum. Nunc ligula nisi, scelerisque at ullamcorper et, tincidunt gravida nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec suscipit id lectus a aliquam. Aenean sed sapien nulla. Praesent fermentum massa nulla, sed convallis est ultricies a. Ut mattis sollicitudin metus eu sagittis. Vestibulum iaculis aliquam molestie.Etiam gravida quis ipsum eu porta. Donec mollis nunc id fermentum dapibus. Fusce cursus consequat risus, dignissim commodo quam tincidunt ut. Praesent eu laoreet ligula. Donec maximus elit magna, eu interdum urna dignissim vel. Vestibulum egestas mi rhoncus, dignissim sapien ut, condimentum nisi. Nulla facilisis suscipit felis, sit amet mattis nibh lobortis ac. Sed venenatis imperdiet massa a ullamcorper. In et mauris massa. Nullam sollicitudin non sapien id posuere. Cras imperdiet risus eget auctor consequat. Vestibulum et tellus quis sem facilisis efficitur. Etiam condimentum eget justo vitae varius. Sed egestas, libero vel vehicula condimentum, ante arcu accumsan libero, in faucibus dui tortor ut tellus. Nam eu aliquam felis. Donec eget congue erat. Praesent faucibus urna sit amet interdum auctor. Morbi ex purus, mollis eu pellentesque in, cursus non justo. Nulla vestibulum faucibus dui, id sagittis est vehicula quis. Curabitur consequat diam et purus eleifend cursus. Phasellus tincidunt mi in nisi hendrerit tempus ac at orci. Vivamus tortor enim, viverra vitae augue nec, ultricies rhoncus lacus. Nunc varius sed lectus nec fermentum.Mauris a nunc ac odio condimentum commodo at vitae ante. Praesent lacus mi, sagittis in nulla ac, varius interdum felis. Nulla sed faucibus elit, ac pulvinar sapien. Nullam ipsum justo, sagittis eget augue nec, consectetur iaculis dolor. Nam in consectetur nunc. Nullam nec lorem at orci bibendum hendrerit dictum a arcu. Integer laoreet rutrum velit, quis interdum justo. In cursus blandit massa id porta.',
        reportDate: new Date('2021-08-01'),
        reportedBy: {
          id: 1,
          username: 'User 1',
        },
        reportedUser: {
          id: 2,
          username: 'User 2',
        },
      },
      {
        id: 2,
        description: 'Report 2',
        reportDate: new Date('2021-08-02'),
        reportedBy: {
          id: 1,
          username: 'User 1',
        },
        reportedUser: {
          id: 2,
          username: 'User 2',
        },
      },
      {
        id: 3,
        description: 'Report 3',
        reportDate: new Date('2021-08-03'),
        reportedBy: {
          id: 1,
          username: 'User 1',
        },
        reportedUser: {
          id: 2,
          username: 'User 2',
        },
      }
    ]
  }
}
