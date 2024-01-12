import { PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PimService } from 'src/app/data-access/pim.service';
import { Requestor } from 'src/app/data-access/requestor';
import { Attribute } from 'src/app/models/Attribute';
import { AttributeTypeEnum } from 'src/app/models/AttributeTypeEnum';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  private subscriptions = new Subscription();
  private requestor = new Requestor<any>();
  public products: Product[] = [];
  public currentProduct: Product = {} as Product;
  public allAttributes: Attribute[] = [];
  public freeAttributes: Attribute[] = [];
  public listedProductAttributes: Attribute[] = [];

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
      this.LoadProducts();
    })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  LoadProducts() {
    this.currentProduct = {} as Product;
    this.requestor.load(this.pimService.LoadProducts()).then((result) => {
      if (!this.requestor.hasError) {
        this.products = result;
        this.listedProductAttributes = []

        // Mapping attributes
        this.products.forEach((p) => {
          p.attributes?.forEach(attr => {
            if (!this.listedProductAttributes.find(la => la.id === attr.id)) {
              this.listedProductAttributes.push(attr);
            }

            var attribute = this.allAttributes.find(a => a.id === attr.id);
            if (attribute) {
              attr.partitionKey = attribute.partitionKey;
              attr.name = attribute.name;
              attr.label = attribute.label;
              attr.attributeType = attribute.attributeType;
              attr.value = attribute.value;
            }
          });
        });
      }
    });
  }

  AddAttributeToProduct(attribute: Attribute) {
    if (!this.currentProduct.attributes) this.currentProduct.attributes = []
    this.currentProduct.attributes?.push(attribute);
    this.UpdateFreeAttributes();
  }

  RemoveAttributeFromProduct(attribute: Attribute) {
    this.currentProduct.attributes?.forEach((a, index) => {
      if (a.id === attribute.id) {
        attribute.value = {} as string;
        this.currentProduct.attributes?.splice(index, 1);
      }
    });
    this.UpdateFreeAttributes();
  }

  UpdateFreeAttributes() {
    this.freeAttributes = [];
    this.allAttributes.forEach((attr) => {
      if (!this.currentProduct.attributes || this.currentProduct.attributes?.findIndex((a) => a.id === attr.id) === -1) {
        this.freeAttributes.push(attr);
      }
    });
  }

  OpenAddProduct(content: any) {
    this.UpdateFreeAttributes();
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
    );
  }

  OpenEditProduct(content: any, productToEdit: Product) {
    this.currentProduct = productToEdit;
    this.UpdateFreeAttributes();

    this.modalService.open(content, { fullscreen: true }).result.then(
      (result) => {
        this.requestor
          .load(this.pimService.EditProduct(this.currentProduct))
          .then((result) => {
            if (!this.requestor.hasError) {
              this.LoadProducts();
            }
          });
      },
      (reason) => {
        this.currentProduct = {} as Product;
      }
    );
  }

  GetAttributeTypeName(typeNumber: number) {
    return AttributeTypeEnum[typeNumber];
  }

  GetAttributeValue(attribute: Attribute, productAttributes?: Attribute[]) {
    var productAttribute = productAttributes?.find(a => a.id === attribute.id);
    return productAttribute?.value;
  }
}
