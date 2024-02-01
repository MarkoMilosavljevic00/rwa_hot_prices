import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { NotificationSeverity } from "src/app/common/enums/message.enum";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  showMessage(severity: NotificationSeverity, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}