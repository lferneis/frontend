export interface Category{
  id?: number;
  name: string;
  descripcion: string;
}


export interface Product {
    id?: number;
    name: string;
    categoriaId: number;
    Categorium: Category;
}
