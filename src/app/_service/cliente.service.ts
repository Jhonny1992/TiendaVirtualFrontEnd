import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../_model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = `${environment.HOST}/clientes`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Cliente[]>(this.url);
  }
}
