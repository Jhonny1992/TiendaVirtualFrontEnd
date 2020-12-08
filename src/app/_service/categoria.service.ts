import { Injectable } from '@angular/core';
import { Categoria } from '../_model/categoria';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericService<Categoria>{

  categoriaCambio = new Subject<Categoria[]>();

  constructor(protected http: HttpClient ) { 
    super(
      http,
      `${environment.HOST}/categorias`
    )
  }
}
