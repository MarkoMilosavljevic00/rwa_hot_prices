import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Editor } from 'primeng/editor';

@Directive({
  selector: '[appCheckTextLength]',
})
export class CheckTextLengthDirective {
  @Input() editor!: Editor;
  @Input() maxLength: number = 10;
  @Input() newContent: any;

  constructor(private el: ElementRef) {}

  @HostListener('onTextChange') onTextChange() {
    let text = this.editor.getQuill().getText().trim();
    let textLength = text ? text.length : 0;
    if (textLength > this.maxLength) {
      // Delete extra characters
      let quill = this.editor.getQuill();
      let delta = quill.getLength() - 1 - this.maxLength;
      quill.deleteText(this.maxLength, quill.getLength() - 1);
      this.newContent = quill.getContents();
    }
  }
}
