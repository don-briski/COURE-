import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../../sharedmodule/sharedmodule.module';
import { ListViewComponent } from '../../components/list-view/list-view.component';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';
import { ProductService } from '../../core/service/productService';
import { MatDialog } from '@angular/material/dialog';
import { CreateRequestComponent } from '../../components/create-request/create-request.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, ListViewComponent, GridViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currentView: string = 'grid';
  products: any[] = [];
  filteredProducts: any[] = [];

  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;

      // set Api response into session storage
      sessionStorage.setItem('data', JSON.stringify(data));
        // set Api response into local storage
      localStorage.setItem("data", JSON.stringify(data))
    });
  }

  searchProducts(event: any): void {
    const searchTerm = event.target.value?.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name?.toLowerCase().includes(searchTerm)
    );
  }

  createProduct(): void {
    const dialogRef = this.dialog.open(CreateRequestComponent, {
      width: '500px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Product created successfully!', 'Close', {
          duration: 3000,
        });
        this.getProduct();
      }
    });
  }

  updateProduct(product: any): void {
    const dialogRef = this.dialog.open(CreateRequestComponent, {
      width: '500px',
      data: { isEdit: true, product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Product updated successfully!', 'Close', {
          duration: 3000,
        });
        this.getProduct();
      }
    });
  }

  deleteProduct(productId: string): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: { productId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.snackBar.open('Product deleted successfully!', 'Close', {
              duration: 3000,
            });
            this.getProduct();
          },
          (error) => {
            this.snackBar.open(
              'Failed to delete product. Try again later.',
              'Close',
              { duration: 3000 }
            );
          }
        );
      }
    });
  }

  setView(view: string): void {
    this.currentView = view;
  }

  toggleView(): void {
    this.currentView = this.currentView === 'grid' ? 'list' : 'grid';
  }
}
