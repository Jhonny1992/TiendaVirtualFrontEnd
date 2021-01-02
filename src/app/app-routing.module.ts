import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoAgregarComponent } from './pages/producto/producto-agregar/producto-agregar.component';
import { ProductoComponent } from './pages/producto/producto.component';

const routes: Routes = [
  {
    path: 'producto', component: ProductoComponent, children: [
      { path: 'nuevo', component: ProductoAgregarComponent },
      {path: 'edicion/:id', component: ProductoAgregarComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
