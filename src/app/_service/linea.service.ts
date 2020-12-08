import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Linea } from '../_model/linea';

@Injectable({
  providedIn: 'root'
})
export class LineaService extends GenericService<Linea>{

  constructor(protected http: HttpClient) { 
    super(http,
    `${environment.HOST}/lineas`
    );
  }
}
