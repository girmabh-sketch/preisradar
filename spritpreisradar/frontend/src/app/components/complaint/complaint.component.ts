import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusyComponent } from '@pascada/marlene';
import { ToastrService } from 'ngx-toastr';
import { Complaint } from '../../models/complaint';
import { IComplaint } from '../../models/complaint.interface';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'spr-station-complaint',
  templateUrl: './complaint.component.html'
})
export class ComplaintComponent extends BusyComponent {
  complaint: IComplaint;
  complaintData = {
    complaintType: null,
    message: ''
  };

  options = [
    {
      value: '1',
      label: 'Falscher Super E5 Preis'
    },
    {
      value: '2',
      label: 'Falscher Super E10 Preis'
    },
    {
      value: '3',
      label: 'Falscher Diesel Preis'
    },
    {
      value: '4',
      label: 'Falsche Öffnungszeiten'
    },
    {
      value: '5',
      label: 'Falsche Tankstellenmarke'
    },
    {
      value: '6',
      label: 'Falscher Tankstellenname'
    },
    {
      value: '7',
      label: 'Falsche Straße'
    },
    {
      value: '8',
      label: 'Falsche Hausnummer'
    },
    {
      value: '9',
      label: 'Falsche PLZ'
    },
    {
      value: '10',
      label: 'Falscher Ort'
    }
  ];

  @Input()
  stationId!: string;

  constructor(
    private apiService: ComplaintService,
    private toastr: ToastrService
  ) {
    super();
    this.complaint = new Complaint();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const index = this.complaintData.complaintType ? this.complaintData.complaintType : 0;
      this.complaint = {
        stationId: this.stationId,
        version: 1,
        complaintType: this.options[index].label,
        message: this.complaintData.message,
        fromDate: new Date()
      };

      const msg = `Beschwerde vom ${this.complaint.complaintType} wurde erfolgreich eingereicht`;
      const obs$ = this.apiService.create(this.complaint);

      this.busy$('save', obs$).subscribe(
        () => {
          this.toastr.success(msg, 'Speichern erfolgreich');
        },
        (err) => (this.loadError = err)
      );
      this.reset(form);
    } else {
      form.form.markAllAsTouched();
    }
    return;
  }

  reset(form: NgForm): void {
    form.form.reset({ complaintType: null, message: '' });
  }
}
