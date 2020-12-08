import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Producto } from './../_model/producto';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  private productoCambio = new Subject<Producto[]>();
  private mensajeCambio = new Subject<string>();
  //private url: string = `${environment.HOST}/productos`;

  constructor(protected http:  HttpClient) { 
    super(
      http,
      `${environment.HOST}/productos`
    )
  }

  /*listar(){
    return this.http.get<Producto[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  registrar( producto: Producto){
    return this.http.post(this.url, producto);
  }

  modificar( producto: Producto){
    return this.http.put(this.url, producto);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }*/

  ////get, set////
  //RECUEPRAR LOS VALORES
  getProductoCambio(){
    return this.productoCambio.asObservable();
  }


  //ESTABLECE NUEVOS VALORES AL TIEMP
  setProductoCambio(productos: Producto[]){
    this.productoCambio.next(productos);
    
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }


  //ESTABLECE NUEVOS VALORES AL TIEMP
  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
    
  }
}
