import { Component, OnInit } from '@angular/core';
import {ProductoService} from "../../services/producto.service";
import {Producto} from "../../models/producto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listProductos : Producto[] = [];
  constructor(
    private _productoService: ProductoService,
    private _toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.obtenerProdcutos()
  }

  obtenerProdcutos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    },error => {
      console.log(error)
    })

  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      this._toastService.success('El producto fue eliminado con éxito', 'Producto Eliminado');
      this.obtenerProdcutos()
      console.log(data);
      this.listProductos = data;
    },error => {
      this._toastService.error('Eror al eliminar', 'Error Eliminando');
      console.log(error)
    })

  }
}
