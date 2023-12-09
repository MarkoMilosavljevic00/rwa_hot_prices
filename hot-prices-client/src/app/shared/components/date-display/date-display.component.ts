import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.css']
})
export class DateDisplayComponent {
  @Input() date: Date = new Date();
  @Input() isPostedDate: boolean = false;
  @Input() isExpiringDate: boolean = false;

  formatDate(date: Date): string {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  }
  
  formatPostedAgo(): string {
    const now = new Date();
    const diff = now.getTime() - this.date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `Posted ${months} month${months > 1 ? 's' : ''} ago `;
    } else if (days > 0) {
      return `Posted ${days} day${days > 1 ? 's' : ''} ago `;
    } else if (hours > 0) {
      return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago `;
    } else if (minutes > 0) {
      return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago `;
    } else {
      return 'Just posted';
    }
  }
  
  formatExpiresAgo(): string {
    const now = new Date();
    const diff = this.date.getTime() - now.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return `Expires in ${years} year${years > 1 ? 's' : ''} `;
    } else if (months > 0) {
      return `Expires in ${months} month${months > 1 ? 's' : ''} `;
    } else if (days > 0) {
      return `Expires in ${days} day${days > 1 ? 's' : ''} `;
    } else if (hours > 0) {
      return `Expires in ${hours} hour${hours > 1 ? 's' : ''} `;
    } else if (minutes > 0) {
      return `Expires in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      return 'Expires soon';
    }
  }
}
