import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/categorias/'
  }

  getListCategory(): Observable<Category[]> {
   return this.http.get<Category[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveCategory(category: Category): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,category)
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateCategory(id: number, category: Category): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, category);
  }
}
