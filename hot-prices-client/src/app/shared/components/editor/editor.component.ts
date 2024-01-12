import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Editor, EditorTextChangeEvent } from 'primeng/editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  @ViewChild(Editor) editor!: Editor;
  @Output() onContentChange = new EventEmitter<string>();
  @Input() maxLength: number = 300;
  @Input() height: string = '320px';
  @Input() width: string = '100%';
  @Input() content: string = '';
  textLength = 0;  

  checkContentLength() {
    // console.log(this.newContent);
    let text = this.editor.getQuill().getText().trim();
    let quill = this.editor.getQuill();
    this.textLength = text ? text.length : 0;
    if (this.textLength > this.maxLength){
      quill.deleteText(this.maxLength, quill.getLength() - 1);
    }
    this.content = quill.root.innerHTML;
  }

  onTextChange() {
    this.checkContentLength();
    this.onContentChange.emit(this.content);
  }
}
