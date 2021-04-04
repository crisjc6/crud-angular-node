import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../models/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductoService} from "../../services/producto.service";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo:string = 'Crear Producto'
  id:string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,private _productoService: ProductoService,
              private aRouter: ActivatedRoute
              ) {
    this.productoForm = this.fb.group(
      {
        producto: ['',Validators.required],
        categoria: ['',Validators.required],
        ubicacion: ['',Validators.required],
        precio: ['',Validators.required],
      }
    )
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar()
  }
  agregarProducto() {
    console.log(this.productoForm)
    console.log(this.productoForm.get('producto')?.value)

    const PRODCUTO: Producto  = {
      categoria: this.productoForm.get('categoria')?.value,
      nombre: this.productoForm.get('producto')?.value,
      precio: +this.productoForm.get('precio')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value

    }
    if(this.id !== null ){
      this._productoService.editarProducto(this.id, PRODCUTO).subscribe(data => {
        this.toastr.success('El producto fue actualizado con éxito', 'Producto Actualizado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
        this.toastr.error('Error Actualizando producto', 'Error Actualizando');
        this.productoForm.reset();
      })
    } else {
      console.log(PRODCUTO);
      this._productoService.guardarProducto(PRODCUTO).subscribe(data => {
        this.toastr.success('El producto fue registrado con éxito', 'Producto Registrado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
        this.toastr.error('Error Creando producto', 'Error Creando');
        this.productoForm.reset();
      })
    }

  }

  esEditar(){
    if(this.id !== null) {
      this.titulo = 'Editar Producto'
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }
  }
}
