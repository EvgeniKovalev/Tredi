import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PimService } from 'src/app/data-access/pim.service';
import { Requestor } from 'src/app/data-access/requestor';
import { Attribute } from 'src/app/models/Attribute';
import { AttributeTypeEnum } from 'src/app/models/AttributeTypeEnum';

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

  SetAttrubuteType(attribute: Attribute, enumKey: string) {
    if (attribute) {
      attribute.attributeType = Number(enumKey);
    }
  }

  OpenAddAttribute(content: any) {
    this.modalService.open(content, { fullscreen: true }).result.then(
      (result) => {
        this.requestor
          .load(this.pimService.AddAttribute(this.currentAttribute))
          .then((result) => {
            if (!this.requestor.hasError) {
              this.attributes = result;
            }
          });
      },
      (reason) => {
        this.currentAttribute = {} as Attribute;
      }
    );
  }
}
