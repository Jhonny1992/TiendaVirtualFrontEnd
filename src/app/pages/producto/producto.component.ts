import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from './../../_service/producto.service';
import { LineaService } from './../../_service/linea.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Categoria } from 'src/app/_model/categoria';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns = ['idProducto','codigoProducto', 'nombreProducto', 'descripcionProducto', 'precioProducto', 'acciones'];
  dataSource: MatTableDataSource<Producto>;

  //ViewChild busca la columna para ordenar de mayor a menor o viceversa. en este caso
  //coge el MatSort que son (flechas)
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  productos: Producto[];

  categoria: Categoria[];

  constructor(
    private snackbar: MatSnackBar,
    private categoriaService: CategoriaService,
    private productoService: ProductoService) { }

  ngOnInit(): void {

    this.productoService.getProductoCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort=this.sort
      this.dataSource.paginator = this.paginator;
    });

    this.productoService.getMensajeCambio().subscribe(data =>{
      this.snackbar.open(data, 'AVISO', {duration : 2000});
    });

    this.productoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort=this.sort
      this.dataSource.paginator = this.paginator;

    });
  }
  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idProducto: number){
    this.productoService.eliminar(idProducto).pipe(switchMap(() =>{
    return this.productoService.listar();     
    })).subscribe(data =>{
      this.productoService.setProductoCambio(data);
      this.productoService.setMensajeCambio('SE ELIMINÓ');
    });
  }

}
