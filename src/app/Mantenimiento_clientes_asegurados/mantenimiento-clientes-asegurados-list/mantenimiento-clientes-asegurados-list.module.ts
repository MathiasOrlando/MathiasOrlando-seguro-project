import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MantenimientoClientesAseguradosListPageRoutingModule } from './mantenimiento-clientes-asegurados-list-routing.module';

import { MantenimientoClientesAseguradosListPage } from './mantenimiento-clientes-asegurados-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MantenimientoClientesAseguradosListPageRoutingModule
  ],
  declarations: [MantenimientoClientesAseguradosListPage]
})
export class MantenimientoClientesAseguradosListPageModule {}
