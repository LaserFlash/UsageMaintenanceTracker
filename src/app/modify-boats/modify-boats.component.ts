import { Component, OnInit } from '@angular/core';
import { Boat } from '../Utils/objects/boat';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'modify-boats',
  templateUrl: './modify-boats.component.html',
  styleUrls: ['./modify-boats.component.css']
})
export class ModifyBoatsComponent implements OnInit {

  boatInfo = [
    { name: "Boat 1", selectable: true},
    { name: "Boat 2", selectable: false},
  ]
  constructor() { }

  ngOnInit() {
  }

  addItem() {
    this.boatInfo.push(new Boat('', true));
  }

  setDocItem(updatedOriginalDocs) {
    /*
    const updatedDoc = updatedOriginalDocs.updatedDoc;
    const originalDoc = updatedOriginalDocs.originalDoc;
    originalDoc.id = this.safetyDocsService.addOrUpdateDoc(updatedDoc);
    this.snackBar.open('Modified the boat', 'Undo', {
      duration: 2000,
    }).onAction().subscribe(() => {
      this.safetyDocsService.restore(originalDoc);
    });
    */

  }

}
