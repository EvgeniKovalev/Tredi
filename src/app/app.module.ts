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
import { PimComponent } from './workspace/pim/pim.component';
import { AttributeManagementComponent } from './workspace/pim/attribute-management/attribute-management.component';
import { ProductMediaManagementComponent } from './workspace/pim/product-media-management/product-media-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkspaceComponent,
    MenuComponent,
    OrderManagementComponent,
    CrmComponent,
    PimComponent,
    AttributeManagementComponent,
    ProductMediaManagementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
