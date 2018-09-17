import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocLink } from '../../Utils/objects/docLink';

@Component({
  selector: 'app-inline-edit-input',
  templateUrl: './inline-edit-input.component.html',
  styleUrls: ['./inline-edit-input.component.css']
})
export class InlineEditInputComponent implements OnInit {

  @Input() value: DocLink;
  @Output() update: EventEmitter<DocLink> = new EventEmitter<DocLink>();
  @Output() delete: EventEmitter<DocLink> = new EventEmitter<DocLink>();

  remove = false;
  done = false;
  constructor() { }

  ngOnInit() {
  }

  submitEdit() {
    this.done = true;
    this.update.emit(this.value);
  }

  submitRemove() {
    this.remove = true;
    this.delete.emit(this.value);
  }

}
