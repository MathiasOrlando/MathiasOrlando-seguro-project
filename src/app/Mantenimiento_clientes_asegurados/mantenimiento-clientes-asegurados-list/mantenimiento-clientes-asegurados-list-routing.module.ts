import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MantenimientoClientesAseguradosListPage } from './mantenimiento-clientes-asegurados-list.page';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoClientesAseguradosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoClientesAseguradosListPageRoutingModule {}
