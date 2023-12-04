import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  listCategory: Category[] = []
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _errorService: ErrorService,
    private _categoryService: CategoryService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoriaId: [null, Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
    this.getListCategory();
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false;
      this.form.setValue({
        name: data.name,
        categoriaId: data.categoriaId,
        Categorium: data.Categorium
      })
    })
  };

  getListCategory() {
    this.loading = true;

    this._categoryService.getListCategory().subscribe((data: Category[]) => {
      this.listCategory = data;
      this.loading = false;
    })
  }
  addProduct() {

    const product: Product = {
      name: this.form.value.name,
      categoriaId: this.form.value.categoriaId,
      Categorium: this.form.value.Categorium
    }
    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe({
        next: () => {
          this.toastr.info(`El producto ${product.name} fue actualizado con exito`, 'Producto actualizado');
          this.loading = false;
          this.router.navigate(['/list-products']);
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
          this.loading = false
        }
      })

    } else {
      // Es agregar
      this._productService.saveProduct(product).subscribe({
        next: () => {
          this.toastr.success(`El producto ${product.name} fue registrado con exito`, 'Producto registrado');
          this.loading = false;
          this.router.navigate(['/list-products']);
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
          this.loading = false
        }
      })
    }

  }
}
