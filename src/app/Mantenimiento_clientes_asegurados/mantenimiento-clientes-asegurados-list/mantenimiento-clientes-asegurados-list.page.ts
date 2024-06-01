
import { Component, OnInit } from '@angular/core';
import { collection, Firestore, doc, deleteDoc, query, limit, getDocs, startAfter, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-mantenimiento-clientes-asegurados-list',
  templateUrl: './mantenimiento-clientes-asegurados-list.page.html',
  styleUrls: ['./mantenimiento-clientes-asegurados-list.page.scss'],
})
export class MantenimientoClientesAseguradosListPage implements OnInit {
  listaAsegurados: any[] = [];
  li = 20;
  lastVisible: any = null;
  hayMasDatos: boolean = true;
  isSearch: boolean = false;
  query = "";

  constructor(private readonly firestore: Firestore, private rt: Router) { }

  ngOnInit() {
    this.iniciar();
  }

  ionViewWillEnter() {
    this.iniciar();
  }

  iniciar() {
    this.listaAsegurados = [];
    this.lastVisible = null;
    this.hayMasDatos = true;
    this.listarAsegurados();
  }

  async listarAseguradosSinFiltro() {
    const aseguradosRef = collection(this.firestore, 'asegurado');
    let q = this.lastVisible
      ? query(aseguradosRef, limit(this.li), startAfter(this.lastVisible))
      : query(aseguradosRef, limit(this.li));

    try {
      const re = await getDocs(q);
      this.procesarDocumentos(re);
    } catch (error) {
      console.error("Error al listar asegurados sin filtro: ", error);
    }
  }

  async listarAsegurados() {
    if (this.query.trim().length > 0) {
      await this.listarAseguradosConFiltro();
    } else {
      await this.listarAseguradosSinFiltro();
    }
  }

  async listarAseguradosConFiltro() {
    const aseguradosRef = collection(this.firestore, 'asegurado');
    let q = this.lastVisible
      ? query(
        aseguradosRef,
          where("nombre", ">=", this.query),
          where("nombre", "<=", this.query + '\uf8ff'),
          limit(this.li),
          startAfter(this.lastVisible)
        )
      : query(
        aseguradosRef,
          where("nombre", ">=", this.query),
          where("nombre", "<=", this.query + '\uf8ff'),
          limit(this.li)
        );

    try {
      const re = await getDocs(q);
      this.procesarDocumentos(re, this.query);
    } catch (error) {
      console.error("Error al listar asegurados con filtro: ", error);
    }
  }

  procesarDocumentos(re: any, query: string = "") {
    if (!re.empty) {
      const nuevosDocs = re.docs.map((doc: any) => {
        let asegurado: any = doc.data();
        asegurado.id = doc.id;

        if (asegurado.fecha && asegurado.fecha.toDate) {
          const date = asegurado.fecha.toDate();
          asegurado.fecha = date.toLocaleDateString('es-ES', { timeZone: 'UTC' });
        }

        return asegurado;
      });

      const resultadosFiltrados = nuevosDocs.filter((asegurado: any) =>
        asegurado.nombre.toLowerCase().includes(query.toLowerCase())
      );

      this.listaAsegurados.push(...resultadosFiltrados);
      this.lastVisible = re.docs[re.docs.length - 1];

      if (resultadosFiltrados.length < this.li) {
        this.hayMasDatos = false; 
      }
    } else {
      this.hayMasDatos = false; 
    }
  }

  clearSearch() {
    this.isSearch = false;
    this.query = "";
    this.listaAsegurados = [];
    this.lastVisible = null;
    this.listarAsegurados();
  }

  buscarSearch(e: any) {
    this.isSearch = false;
    this.query = e.target.value;
    this.listaAsegurados = [];
    this.lastVisible = null;
    this.listarAsegurados();
  }

  nuevo() {
    this.rt.navigate(['//mantenimiento-clientes-asegurados-edit']);
  }

  eliminarAsegurados(id: string) {
    console.log('Eliminando asegurado en Firebase...');
    deleteDoc(doc(this.firestore, 'asegurado', id)).then(() => {
      console.log('Registro eliminado');
      this.iniciar();
    }).catch((error) => {
      console.error("Error al eliminar el documento: ", error);
    });
  }

  clickSearch() {
    this.isSearch = true;
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    if (this.hayMasDatos) {
      this.listarAsegurados();
    }
    setTimeout(() => {
      ev.target.complete();
      if (!this.hayMasDatos) {
        ev.target.disabled = true;  // Deshabilitamos el ion-infinite-scroll si no hay más datos
      }
    }, 500);
  }
}
