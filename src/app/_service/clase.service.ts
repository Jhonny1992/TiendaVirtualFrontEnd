import { Injectable } from '@angular/core';
import { Clase } from '../_model/clase';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaseService extends GenericService<Clase>{

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/clases`
    )
   }
}
