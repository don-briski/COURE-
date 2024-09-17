import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { SharedModule } from '../../sharedmodule/sharedmodule.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent implements AfterViewInit, OnChanges {

  displayedColumns: string[] = [ 'name', 'description', 'actions'];
  @Input() products: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();
  itemList: any[] = []
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource.data = this.products;
  }



  editProduct(product: any): void {
    this.edit.emit(product);
  }

  deleteProduct(productId: string): void {
    this.delete.emit(productId);
  }
}
