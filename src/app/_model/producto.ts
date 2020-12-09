import { Categoria } from './categoria';
import { Clase } from "./clase";
import { Familia } from './familia';
import { Linea } from './linea';

export class Producto{
    idProducto: number;
    codigoProducto: string;
    nombreProducto: string;
    descripcionProducto: string;
    fotoProducto:any;
    precioProducto: number;
    clase: Clase;
    familia: Familia;
    categoria: Categoria;
    linea: Linea;

     
}