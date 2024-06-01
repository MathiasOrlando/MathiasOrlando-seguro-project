import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MantenimientoClientesAseguradosEditPage } from './mantenimiento-clientes-asegurados-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MantenimientoClientesAseguradosEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoClientesAseguradosEditPageRoutingModule {}
