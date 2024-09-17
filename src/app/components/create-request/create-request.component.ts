import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../sharedmodule/sharedmodule.module';
import { ProductService } from '../../core/service/productService';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.scss'
})

export class CreateRequestComponent {
  createProductForm!: FormGroup;
  isLoading = false;
  isEdit = false;
  errorMessage: string | null = null;
  productData: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<CreateRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data?.isEdit || false;
    this.productData = this.data?.product || null;

    this.createProductForm = this.fb.group({
      name: [
        this.isEdit ? this.productData.name : '',
        [Validators.required, Validators.minLength(3)]
      ],
      description: [
        this.isEdit ? this.productData.description : '',
        [Validators.required, Validators.minLength(5)]
      ]
    });
  }

  submit(): void {
    if (this.createProductForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const payload = {
        id: this.isEdit ? this.productData.id : Math.floor(Math.random() * 10000).toString(),
        name: this.createProductForm.get('name')?.value,
        description: this.createProductForm.get('description')?.value
      };

      const productRequest = this.isEdit
        ? this.productService.updateProduct(payload)
        : this.productService.createProduct(payload);

      productRequest.subscribe({
        next: (data) => {
          this.isLoading = false;
          this.dialogRef.close(data);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to process request. Please try again.';
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
}

}
