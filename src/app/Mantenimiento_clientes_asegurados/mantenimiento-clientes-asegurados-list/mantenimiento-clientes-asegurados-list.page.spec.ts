import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoClientesAseguradosListPage } from './mantenimiento-clientes-asegurados-list.page';

describe('MantenimientoClientesAseguradosListPage', () => {
  let component: MantenimientoClientesAseguradosListPage;
  let fixture: ComponentFixture<MantenimientoClientesAseguradosListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoClientesAseguradosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
