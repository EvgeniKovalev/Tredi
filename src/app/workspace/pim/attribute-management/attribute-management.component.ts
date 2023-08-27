import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PimService } from 'src/app/data-access/pim.service';
import { Requestor } from 'src/app/data-access/requestor';
import { Attribute } from 'src/app/models/Attribute';
import { AttributeTypeEnum } from 'src/app/models/AttributeTypeEnum';
import { ConfirmDialogComponent } from '../../Shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-attribute-management',
  templateUrl: './attribute-management.component.html',
  styleUrls: ['./attribute-management.component.scss'],
})
export class AttributeManagementComponent {
  private requestor = new Requestor<any>();
  public attributes: Attribute[] = [];
  public currentAttribute: Attribute = {} as Attribute;
  public attributeTypes = Object.keys(AttributeTypeEnum).filter((element) => {
    return isNaN(Number(element));
  });

  constructor(
    private modalService: NgbModal,
    private platformLocation: PlatformLocation,
    private pimService: PimService
  ) {
    platformLocation.onPopState(() => {
      if (this.modalService.hasOpenModals()) {
        this.modalService.dismissAll();
        window.history.forward();
      }
    });

    this.LoadAttributes();
  }

  LoadAttributes() {
    this.requestor.load(this.pimService.LoadAttributes()).then((result) => {
      if (!this.requestor.hasError) {
        this.attributes = result;
      }
    });
  }

  OpenAddAttribute(content: any) {
    this.modalService.open(content, { fullscreen: true }).result.then(
      (result) => {
        this.requestor
          .load(this.pimService.AddAttribute(this.currentAttribute))
          .then((result) => {
            if (!this.requestor.hasError) {
              this.LoadAttributes();
            }
          });
      },
      (reason) => {
        this.currentAttribute = {} as Attribute;
      }
    );
  }

  OpenEditAttribute(content: any, attributeToEdit: Attribute) {
    this.currentAttribute = attributeToEdit;
    this.modalService.open(content, { fullscreen: true }).result.then(
      (result) => {
        this.requestor
          .load(this.pimService.EditAttribute(this.currentAttribute))
          .then((result) => {
            if (!this.requestor.hasError) {
              this.LoadAttributes();
            }
          });
      },
      (reason) => {
        this.currentAttribute = {} as Attribute;
      }
    );
  }

  OpenConfirmDeleteAttribute(attributeToDelete: Attribute) {
    this.currentAttribute = attributeToDelete;
    const deleteDialog = this.modalService.open(ConfirmDialogComponent, {
      fullscreen: true,
    });
    deleteDialog.componentInstance.Header =
      'Poistetanko ominaisuus ' + this.currentAttribute.name + '?';
    deleteDialog.componentInstance.ConfirmButtonText = 'Poista';
    deleteDialog.componentInstance.ConfirmButtonColorClass = 'btn-danger';

    deleteDialog.result.then(
      (result) => {
        this.requestor
          .load(this.pimService.DeleteAttribute(this.currentAttribute))
          .then((result) => {
            if (!this.requestor.hasError) {
              this.LoadAttributes();
            }
          });
      },
      (reason) => {
        this.currentAttribute = {} as Attribute;
      }
    );
  }

  GetAttributeTypeName(attributeTypeNumber: number) {
    return AttributeTypeEnum[attributeTypeNumber];
  }

  IsAttributeType(attribute: Attribute, enumKey: string) {
    if (attribute) {
      return Number(attribute.attributeType) === Number(enumKey);
    }
    return false;
  }

  SetAttrubuteType(attribute: Attribute, enumKey: string) {
    if (attribute) {
      attribute.attributeType = Number(enumKey);
    }
  }
}
