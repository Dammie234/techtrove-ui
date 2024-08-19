import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { DashboardComponent } from './pages/account/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/account/categories/categories.component';
import { CreateCategoryComponent } from './pages/account/categories/create-category/create-category.component';
import { EditCategoryComponent } from './pages/account/categories/edit-category/edit-category.component';
import { ProductsComponent } from './pages/account/products/products.component';
import { CreateProductComponent } from './pages/account/products/create-product/create-product.component';
import { EditProductComponent } from './pages/account/products/edit-product/edit-product.component';
import { CollectionComponent } from './pages/collections/collection/collection.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BillingsComponent } from './pages/account/billings/billings.component';
import { BillingComponent } from './pages/account/billings/billing/billing.component';
import { MyBillingsComponent } from './pages/account/my-billings/my-billings.component';
import { MyBillingComponent } from './pages/account/my-billings/my-billing/my-billing.component';

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'shop', component: ShopComponent, title: 'Shop'},
  {path: 'about', component: AboutComponent, title: 'About'},
  {path: 'blog', component: BlogComponent, title: 'Blog'},
  {path: 'contact', component: ContactComponent, title: 'Contact'},
  {path: 'collections', component: CollectionsComponent, title: 'Collections'},
  {path: 'collections/:slug', component: CollectionComponent, title: 'Collection'},
  {path: 'product-details/:slug', component: ProductDetailsComponent, title: 'Product Details'},
  {path: 'search-products/:title', component: SearchProductsComponent},
  {path: 'cart', component: CartComponent, title: 'Cart'},
  {path: 'checkout', component: CheckoutComponent, title: 'Checkout'},
  {path: 'auth/login', component: LoginComponent, title: 'Login'},
  {path: 'auth/register', component: RegisterComponent, title: 'Register'},
  {path: 'account/dashboard', component: DashboardComponent, title: 'Dashboard'},
  {path: 'account/categories', component: CategoriesComponent, title: 'Categories'},
  {path: 'account/categories/create', component: CreateCategoryComponent, title: 'Create Category'},
  {path: 'account/categories/:id/edit', component: EditCategoryComponent, title: 'Edit Category'},
  {path: 'account/products', component: ProductsComponent, title: 'Products'},
  {path: 'account/products/create', component: CreateProductComponent, title: 'Create Product'},
  {path: 'account/products/:id/edit', component: EditProductComponent, title: 'Edit Product'},
  {path: 'account/billings', component: BillingsComponent, title: 'Billings'},
  {path: 'account/billings/:id', component: BillingComponent, title: 'Billing'},
  {path: 'account/my-billings', component: MyBillingsComponent, title: 'My Billings'},
  {path: 'account/my-billings/:id', component: MyBillingComponent, title: 'My Billing'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
