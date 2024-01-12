import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PimService } from 'src/app/data-access/pim.service';
import { Requestor } from 'src/app/data-access/requestor';
import { Attribute } from 'src/app/models/Attribute';
import { ProductGroup } from 'src/app/models/ProductGroup';

@Component({
  selector: 'app-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.scss']
})
export class ProductGroupsComponent {
  private subscriptions = new Subscription();
  private requestor = new Requestor<any>();
  public allAttributes: Attribute[] = [];
  public productGroups: ProductGroup[] = [];

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
    this.subscriptions.add(this.pimService.allAttributes.subscribe((attr) => {
      this.allAttributes = attr
      //this.LoadProducts();
    })
    );
  }

  OpenAddProductGroup() {
    /*this.UpdateFreeAttributes();
    this.modalService.open(content, { fullscreen: true }).result.then(
      (result) => {
        this.requestor
          .load(this.pimService.AddProduct(this.currentProduct))
          .then((result) => {
            if (!this.requestor.hasError) {
              this.LoadProducts();
            }
          });
      },
      (reason) => {
        this.currentProduct = {} as Product;
      }
    );*/
  }

}
