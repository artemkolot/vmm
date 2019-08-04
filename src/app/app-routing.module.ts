import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { PanelComponent } from './components/admin/panel/panel.component';
import { AuthComponent } from './components/admin/auth/auth.component';

AdminComponent
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'card', component: CardComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'auth', component: AuthComponent},
    {path: 'panel', component: PanelComponent}
  ]},
  {path: '**', redirectTo: '/home'}
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({
  imports: [RouterModule.forRoot(routes,  routerOptions)],
  exports: [RouterModule],
  providers: [],
  // {provide: LocationStrategy, useClass: PathLocationStrategy}
})
export class AppRoutingModule { }
