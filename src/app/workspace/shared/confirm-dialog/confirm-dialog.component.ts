import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() Header: string = '';
  @Input() Body: string = '';
  @Input() ConfirmButtonText: string = '';
  @Input() ConfirmButtonColorClass: string = '';

  constructor(public activeModal: NgbActiveModal) {}
}
