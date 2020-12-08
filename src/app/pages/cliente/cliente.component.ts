import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.listar().subscribe(data => console.log(data));
  }

}
