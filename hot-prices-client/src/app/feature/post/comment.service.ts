import { Injectable } from '@angular/core';
import { Comment } from './models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
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
        'asas',
      postedDate: new Date('2023-02-01'),
      owner: 'Nikola',
    },
  ];

  getAllComments(): Comment[] {
    return this.comments;
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
  }

  constructor() { }
}
