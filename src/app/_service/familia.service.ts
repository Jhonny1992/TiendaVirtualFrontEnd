import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Familia } from '../_model/familia';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService extends GenericService<Familia> {

  constructor(protected http: HttpClient) { 
    super(
      http,
      `${environment.HOST}/familias`
    )

  }
}
