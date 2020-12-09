import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductoService } from 'src/app/_service/producto.service';
import { Producto } from 'src/app/_model/producto';
import { switchMap } from 'rxjs/operators'
import { pipe } from 'rxjs';
import { Linea } from 'src/app/_model/linea';
import { LineaService } from './../../../_service/linea.service';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Categoria } from 'src/app/_model/categoria';
import { isNgTemplate } from '@angular/compiler';
import { FamiliaService } from './../../../_service/familia.service';
import { ClaseService } from 'src/app/_service/clase.service';
import { Familia } from 'src/app/_model/familia';
import { Clase } from 'src/app/_model/clase';


@Component({
  selector: 'app-producto-agregar',
  templateUrl: './producto-agregar.component.html',
  styleUrls: ['./producto-agregar.component.css']
})
export class ProductoAgregarComponent implements OnInit {


  form: FormGroup;
  idProducto: number;
  edicion: boolean;


  categoriaList: any;
  familiaList: any;
  claseList: any;

  linea: Linea[] = [];



  constructor(
    private claseService: ClaseService,
    private familiaService: FamiliaService,
    private categoriaService: CategoriaService,
    private lineaService: LineaService,
    private router: ActivatedRoute,
    private route: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.lineaService.listar().subscribe(data => {
      this.linea = data
    });

    this.form = new FormGroup({
      'idProducto': new FormControl(0),
      'codigoProducto': new FormControl(''),
      'nombreProducto': new FormControl(''),
      'descripcionProducto': new FormControl(''),
      'precioProducto': new FormControl(''),
      'clase': new FormControl(''),
      'familia': new FormControl(''),
      'categoria': new FormControl(''),
      'linea': new FormControl('')
    });

    this.router.params.subscribe((data: Params) => {
      this.idProducto = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }

 
  onSelect(e: any) {
    this.categoriaService.listarPorId(e.value).subscribe(data =>{
      this.categoriaList = data;
    })
  }

  onSelectFam(e: any) {
    this.familiaService.listarPorId(e.value).subscribe(data =>{
      this.familiaList = data;
    })
  }

  onSelectClas(e: any) {
    this.claseService.listarPorId(e.value).subscribe(data =>{
      this.claseList = data;
    })
  }

  private initForm() {
    if (this.edicion) {
      this.productoService.listarPorId(this.idProducto).subscribe(data => {
        this.form = new FormGroup({
          'idProducto': new FormControl(data.idProducto),
          'codigoProducto': new FormControl(data.codigoProducto),
          'nombreProducto': new FormControl(data.nombreProducto),
          'descripcionProducto': new FormControl(data.descripcionProducto),
          'precioProducto': new FormControl(data.precioProducto),
          'clase': new FormControl(data.clase.descripClase),
          'familia': new FormControl(data.familia.descripFamilia),
          'categoria': new FormControl(data.categoria.descripCategoria),
          'linea': new FormControl(data.linea.descripLinea)
        });
      });
    }
  }

  operar() {
    let producto = new Producto();
    producto.idProducto = this.form.value['idProducto'];
    producto.codigoProducto = this.form.value['codigoProducto'];
    producto.nombreProducto = this.form.value['nombreProducto'];
    producto.descripcionProducto = this.form.value['descripcionProducto'];
    producto.precioProducto = this.form.value['precioProducto'];
    producto.clase = this.form.value['clase'];
    producto.familia = this.form.value['familia'];
    producto.categoria = this.form.value['categoria'];
    producto.linea = this.form.value['linea'];

    if (this.edicion) {
      //pipe concatena llamadas HTTP (subscribe)
      //switchmap ejecuta la anterior sin terminar la siguiente ejecucion, es decir ejecuta todo lo que hay y de ahi termina
      this.productoService.modificar(producto).pipe(switchMap(() => {
        return this.productoService.listar()
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('SE MODIFICÓ')
      });
    } else {
      this.productoService.registrar(producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('SE REGISTRÓ')
      })
    }
    this.route.navigate(['producto'])
  }
}
