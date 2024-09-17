import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface IProduct {
  id: string;
  name: string;
  description: string;
}

@Injectable ({
  providedIn: "root"
})


export  class ProductService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProduct(payload: IProduct): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  updateProduct(product: IProduct): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
