import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },

  {
    path: 'mantenimiento-clientes-asegurados-list',
    loadChildren: () => import('./Mantenimiento_clientes_asegurados/mantenimiento-clientes-asegurados-list/mantenimiento-clientes-asegurados-list.module').then( m => m.MantenimientoClientesAseguradosListPageModule)
  },
  {
    path: 'mantenimiento-clientes-asegurados-edit',
    loadChildren: () => import('./Mantenimiento_clientes_asegurados/mantenimiento-clientes-asegurados-edit/mantenimiento-clientes-asegurados-edit.module').then( m => m.MantenimientoClientesAseguradosEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

