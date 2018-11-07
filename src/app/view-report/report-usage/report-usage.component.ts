import { Component, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { BoatUsageService } from '../../boat-usage.service'
import { KnownBoatsService } from '../../known-boats.service'
import { UsageInfo } from '../../Utils/objects/usageInfo'
import { BoatID } from '../../Utils/objects/boat'

const NUMBER_REGEX = /[0-9]+/;

@Component({
  selector: 'app-report-usage',
  templateUrl: './report-usage.component.html',
  styleUrls: ['./report-usage.component.css']
})
export class ReportUsageComponent {

  title = 'Report Boat Usage';
  maxDate = new Date();
  boats: BoatID [];

  usageForm: FormGroup;

  formErrors = {
    'boatID': '',
    'duration': '',
    'date': ''
  };

  validationMessages = {
    'boatID': {
      'required': 'Boat is required.'
    },
    'duration': {
      'required': 'Duration is required.',
      'min': 'Duration must be at least 0',
      'pattern': 'Duration must be at least 0'
    },
    'date': {
      'required': 'Date is required.'
    }
  };

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private usageService: BoatUsageService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private BOATS: KnownBoatsService
    ) {
      this.dateAdapter.setLocale('en-nz');
      this.createForm();
      this.boats = BOATS.boatInformation;
    }

  /** Build the form */
  private createForm() {
    this.usageForm = this.fb.group({
      boatID: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern(/[0-9]+/), Validators.min(0)]],
      date: new FormControl({value: this.maxDate}, Validators.required)
    });

    this.usageForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  /** Update error messages due to validation */
  private onValueChanged(data?: any) {
    if (!this.usageForm) { return; }
    const form = this.usageForm;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  /** Build BreakageInfo Object from submited data */
  public onSubmit() {
    if (this.usageForm.valid) {
      const usage = new UsageInfo(
        this.usageForm.get('boatID').value,
        this.usageForm.get('duration').value,
        this.usageForm.get('date').value
      )

      this.usageService.addUsageInfo(usage).then(
        () => (
          this.snackBar.open('Usage Succesfully Submited', 'Close', {
            duration: 2000,
          }),
          this.createForm()
        )
      )
        .catch(
        () =>
          this.snackBar.open('Something Went Wrong', 'Close', {
            duration: 2000,
          })
        );
    }
  }
}
