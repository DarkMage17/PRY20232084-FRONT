import { Routes } from '@angular/router';
import { MovementsComponent } from './movements/movements.component';
import { CreateMovementsComponent } from './create-movements/create-movements.component';
import { RawMaterialsComponent } from './raw-materials/raw-materials.component';
import { CreateRawMaterialComponent } from './create-raw-material/create-raw-material.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditRawMaterialComponent } from './edit-raw-material/edit-raw-material.component';
import { MeasurementUnitsComponent } from './measurement-units/measurement-units.component';
import { CreateMeasurementUnitsComponent } from './create-measurement-units/create-measurement-units.component';
import { EditMeasurementUnitsComponent } from './edit-measurement-units/edit-measurement-units.component';
import { ProductSizesComponent } from './product-sizes/product-sizes.component';
import { CreateProductSizeComponent } from './create-product-size/create-product-size.component';
import { EditProductSizeComponent } from './edit-product-size/edit-product-size.component';
import { ProductStylesComponent } from './product-styles/product-styles.component';
import { CreateProductStyleComponent } from './create-product-style/create-product-style.component';
import { EditProductStyleComponent } from './edit-product-style/edit-product-style.component';
import { LoginComponent } from './login/login.component';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
  {
    path: 'movements',
    component: MovementsComponent
  },
  {
    path: 'movements/create',
    component: CreateMovementsComponent
  },
  {
    path: 'raw-materials',
    component: RawMaterialsComponent
  },
  {
    path: 'raw-materials/create',
    component: CreateRawMaterialComponent
  },
  {
    path: 'raw-materials/edit/:id',
    component: EditRawMaterialComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/create',
    component: CreateProductComponent
  },
  {
    path: 'products/edit/:id',
    component: EditProductComponent
  },
  {
    path: 'product-sizes',
    component: ProductSizesComponent
  },
  {
    path: 'product-sizes/create',
    component: CreateProductSizeComponent
  },
  {
    path: 'product-sizes/edit/:id',
    component: EditProductSizeComponent
  },
  {
    path: 'product-styles',
    component: ProductStylesComponent
  },
  {
    path: 'product-styles/create',
    component: CreateProductStyleComponent
  },
  {
    path: 'product-styles/edit/:id',
    component: EditProductStyleComponent
  },
  {
    path: 'measurement-units',
    component: MeasurementUnitsComponent
  },
  {
    path: 'measurement-units/create',
    component: CreateMeasurementUnitsComponent
  },
  {
    path: 'measurement-units/edit/:id',
    component: EditMeasurementUnitsComponent
  },
  {
    path: 'register',
    component: CreateUserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export { Routing };
