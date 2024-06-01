import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoClientesAseguradosEditPage } from './mantenimiento-clientes-asegurados-edit.page';

describe('MantenimientoClientesAseguradosEditPage', () => {
  let component: MantenimientoClientesAseguradosEditPage;
  let fixture: ComponentFixture<MantenimientoClientesAseguradosEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoClientesAseguradosEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
