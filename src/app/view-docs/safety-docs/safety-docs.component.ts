import { Component, OnInit } from '@angular/core';
import { DocLink } from '../../Utils/objects/docLink';

import { SafetyDocsService } from '../../safety-docs.service'
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-safety-docs',
  templateUrl: './safety-docs.component.html',
  styleUrls: ['./safety-docs.component.css']
})
export class SafetyDocsComponent implements OnInit {
  links: DocLink[];
  editMode: Boolean = false;
  constructor(private safetyDocsService: SafetyDocsService,private FIREBASE_AUTH: AuthenticationService) {
    this.links = safetyDocsService.safetyDocLinks;
  }

  ngOnInit() {
  }

  editModeToggle() {
      this.editMode = !this.editMode;
  }

}
