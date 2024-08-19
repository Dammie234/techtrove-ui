import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { DashboardComponent } from './pages/account/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriesComponent } from './pages/account/categories/categories.component';
import { CreateCategoryComponent } from './pages/account/categories/create-category/create-category.component';
import { EditCategoryComponent } from './pages/account/categories/edit-category/edit-category.component';
import { ProductsComponent } from './pages/account/products/products.component';
import { CreateProductComponent } from './pages/account/products/create-product/create-product.component';
import { EditProductComponent } from './pages/account/products/edit-product/edit-product.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CollectionComponent } from './pages/collections/collection/collection.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BillingsComponent } from './pages/account/billings/billings.component';
import { BillingComponent } from './pages/account/billings/billing/billing.component';
import { MyBillingsComponent } from './pages/account/my-billings/my-billings.component';
import { MyBillingComponent } from './pages/account/my-billings/my-billing/my-billing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    PageHeaderComponent,
    CollectionsComponent,
    DashboardComponent,
    LoaderComponent,
    SidebarComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ProductsComponent,
    CreateProductComponent,
    EditProductComponent,
    CollectionComponent,
    ProductDetailsComponent,
    PaginationComponent,
    SearchProductsComponent,
    CartComponent,
    CheckoutComponent,
    BillingsComponent,
    BillingComponent,
    MyBillingsComponent,
    MyBillingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [provideClientHydration(), provideToastr(), provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
