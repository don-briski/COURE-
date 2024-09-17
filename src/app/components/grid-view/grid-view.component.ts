import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent {
  @Input() products: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();
  constructor() { }

  editProduct(product: any): void {
    this.edit.emit(product);
  }

  deleteProduct(productId: any): void {
    this.delete.emit(productId);
  }

}
