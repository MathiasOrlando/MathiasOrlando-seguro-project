import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MantenimientoClientesAseguradosEditPageRoutingModule } from './mantenimiento-clientes-asegurados-edit-routing.module';

import { MantenimientoClientesAseguradosEditPage } from './mantenimiento-clientes-asegurados-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MantenimientoClientesAseguradosEditPageRoutingModule
  ],
  declarations: [MantenimientoClientesAseguradosEditPage]
})
export class MantenimientoClientesAseguradosEditPageModule {}
