import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './data-access/authentication.service';
import { WorkspaceComponent } from './workspace/workspace.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './workspace/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { OrderManagementComponent } from './workspace/order-management/order-management.component';
import { CrmComponent } from './workspace/crm/crm.component';
import { AttributeManagementComponent } from './workspace/pim/attribute-management/attribute-management.component';
import { ProductMediaManagementComponent } from './workspace/pim/product-media-management/product-media-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { PimService } from './data-access/pim.service';
import { ConfirmDialogComponent } from './workspace/shared/confirm-dialog/confirm-dialog.component';
import { ProductComponent } from './workspace/pim/product-listing/product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkspaceComponent,
    MenuComponent,
    OrderManagementComponent,
    CrmComponent,
    ProductComponent,
    AttributeManagementComponent,
    ProductMediaManagementComponent,
  ],
  imports: [
    NgbPaginationModule,
    NgbAlertModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ConfirmDialogComponent,
  ],
  providers: [AuthenticationService, PimService],
  bootstrap: [AppComponent],
})
export class AppModule {}
