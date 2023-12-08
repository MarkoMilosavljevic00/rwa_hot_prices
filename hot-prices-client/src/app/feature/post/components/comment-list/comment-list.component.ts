import { Component } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent {
  comments: Comment[] = [
    {
      id: 0,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquamvoluptatibus, quibusdam, quia, quos voluptatem voluptatum quodexercitationem quas voluptates quidem doloribus. Quisquam voluptatibus,quibusdam, quia, quos voluptatem voluptatum quod exercitationem quasvoluptates quidem doloribus.',
      postedDate: new Date('2021-01-01'),
      owner: 'Marko',
    },
    {
      id: 1,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquamvoluptatibus, quibusdam, quia, quos voluptatem voluptatum quodexercitationem quas voluptates quidem doloribus. Quisquam voluptatibus,quibusdam, quia, quos voluptatem voluptatum quod exercitationem quasvoluptates quidem doloribus.',
      postedDate: new Date('2021-01-01'),
      owner: 'Zoran',
    },
    {
      id: 2,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquamvoluptatibus, quibusdam, quia, quos voluptatem voluptatum quodexercitationem quas voluptates quidem doloribus. Quisquam voluptatibus,quibusdam, quia, quos voluptatem voluptatum quod exercitationem quasvoluptates quidem doloribus.',
      postedDate: new Date('2023-12-03'),
      owner: 'Nidza',
    },
    {
      id: 3,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquamvoluptatibus, quibusdam, quia, quos voluptatem voluptatum quodexercitationem quas voluptates quidem doloribus. Quisquam voluptatibus,quibusdam, quia, quos voluptatem voluptatum quod exercitationem quasvoluptates quidem doloribus.',
      postedDate: new Date('2022-01-01'),
      owner: 'Neven',
    },
    {
      id: 4,
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquamvoluptatibus, quibusdam, quia, quos voluptatem voluptatum quodexercitationem quas voluptates quidem doloribus. Quisquam voluptatibus,quibusdam, quia, quos voluptatem voluptatum quod exercitationem quasvoluptates quidem doloribus.',
      postedDate: new Date('2023-02-01'),
      owner: 'Nikola',
    },
  ];

  showAllComments = false; // Dodaj ovo kao promenljivu u tvom kodu

  showMoreComments() {
    this.showAllComments = true;
  }

  showLessComments() {
    this.showAllComments = false;
  }
}
