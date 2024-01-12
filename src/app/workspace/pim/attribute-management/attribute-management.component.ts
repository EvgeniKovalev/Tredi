import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PimService } from 'src/app/data-access/pim.service';
import { Requestor } from 'src/app/data-access/requestor';
import { Attribute } from 'src/app/models/Attribute';
import { AttributeTypeEnum } from 'src/app/models/AttributeTypeEnum';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { AttributeOption } from 'src/app/models/AttributeOption';

@Component({
  selector: 'app-attribute-management',
  templateUrl: './attribute-management.component.html'
})
export class AttributeManagementComponent {
  private subscriptions = new Subscription();
  private requestor = new Requestor<any>();
  public attributes: Attribute[] = [];
  public currentAttribute: Attribute = {} as Attribute;
  public currentAttributeOption: AttributeOption = {} as AttributeOption;
  public attributeTypes = Object.keys(AttributeTypeEnum).filter((element) => {
    return isNaN(Number(element));
  });

  constructor(
    private modalService: NgbModal,
    private platformLocation: PlatformLocation,
    private pimService: PimService
  ) {
    this.subscriptions.add(
      this.pimService.allAttributes.subscribe(
        (attr) => (this.attributes = attr)
      )
    );

    platformLocation.onPopState(() => {
      if (this.modalService.hasOpenModals()) {
        this.modalService.dismissAll();
        window.history.forward();
      }
    });

    this.pimService.ReloadAttributes();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  OpenAddAttribute(content: any) {
    this.modalService.open(content, { fullscreen: true }).result.then(
      (result) => {
        this.requestor
          .load(this.pimService.AddAttribute(this.currentAttribute))
          .then((result) => {
            if (!this.requestor.hasError) {
              this.pimService.ReloadAttributes();
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
              this.pimService.ReloadAttributes();
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
              this.pimService.ReloadAttributes();
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

  SetAttrubuteType(enumKey: string) {
    if (this.currentAttribute) {
      if (this.currentAttribute.value) {
        if (confirm("Vaihtamalla ominaisuuden tyypin, menetät edellisen tyypin valintoja. Jatketaanko?")) {
          this.currentAttribute.value = '';
          this.currentAttribute.attributeType = Number(enumKey);
        }
      }
      else {
        this.currentAttribute.attributeType = Number(enumKey);
      }
    }
  }

  GetAttributesToTrack(): Attribute[] {
    return this.attributes.filter(a => a.id != this.currentAttribute.id);
  }

  TrackedAttributeAlreadyAdded(attribute: Attribute) {
    var added = false;
    if (attribute && this.currentAttribute && this.currentAttribute.value) {
      var existingAttributeIndex = (this.currentAttribute.value as Attribute[]).findIndex(a => a.id === attribute.id);
      added = existingAttributeIndex >= 0;
    }
    return added;
  }

  AddRemoveTrackedAttribute(attribute: Attribute) {
    if (attribute && this.currentAttribute) {
      if (!this.currentAttribute.value) {
        this.currentAttribute.value = [];
        this.currentAttribute.value.push(attribute);
      }
      else {
        var existingAttributeIndex = (this.currentAttribute.value as Attribute[]).
          findIndex(a => a.id === attribute.id);
        if (existingAttributeIndex >= 0) {
          (this.currentAttribute.value as Attribute[]).splice(existingAttributeIndex, 1);
        }
        else {
          this.currentAttribute.value.push(attribute);
        }
      }
    }
  }

  AddAttributeOption() {
    if (this.currentAttribute && this.currentAttributeOption) {
      if (!this.currentAttribute.value) {
        this.currentAttribute.value = []
        this.currentAttribute.value.push(this.currentAttributeOption);
      }
      else {
        var existingOptionIndex = (this.currentAttribute.value as AttributeOption[]).
          findIndex(a => a.name === this.currentAttributeOption.name);

        if (existingOptionIndex < 0) {
          this.currentAttribute.value.push(this.currentAttributeOption);
        }
      }
      this.currentAttributeOption = {} as AttributeOption;
    }
  }

  SetAttributeOptionToEdit(attributeOption: AttributeOption) {
    (this.currentAttribute.value as AttributeOption[]).forEach(option => {
      option.selected = (option.name == attributeOption.name);
    });
  }

  RemoveAttributeOption(attributeOption: AttributeOption) {
    var existingOptionIndex = (this.currentAttribute.value as AttributeOption[]).
      findIndex(a => a.name === attributeOption.name);
    if (existingOptionIndex >= 0) {
      (this.currentAttribute.value as AttributeOption[]).splice(existingOptionIndex, 1);
    }
  }
}
