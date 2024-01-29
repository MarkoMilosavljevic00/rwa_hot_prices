import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { MessageSeverity } from "src/app/common/enums/message-severity.enum";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  showMessage(severity: MessageSeverity, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}