import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { CrmComponent } from './workspace/crm/crm.component';
import { OrderManagementComponent } from './workspace/order-management/order-management.component';
import { ProductMediaManagementComponent } from './workspace/pim/product-media-management/product-media-management.component';
import { AttributeManagementComponent } from './workspace/pim/attribute-management/attribute-management.component';
import { ProductComponent } from './workspace/pim/product-listing/product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:direction', component: LoginComponent },
  {
    path: 'workspace',
    component: WorkspaceComponent,
    children: [
      {
        path: 'product',
        component: ProductComponent,
        outlet: 'workspace',
      },
      {
        path: 'product-attributes',
        component: AttributeManagementComponent,
        outlet: 'workspace',
      },
      {
        path: 'product-media',
        component: ProductMediaManagementComponent,
        outlet: 'workspace',
      },
      {
        path: 'crm',
        component: CrmComponent,
        outlet: 'workspace',
      },
      {
        path: 'orders',
        component: OrderManagementComponent,
        outlet: 'workspace',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
