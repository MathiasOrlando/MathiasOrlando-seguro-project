import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, getDoc, doc, Firestore, deleteDoc } from '@angular/fire/firestore';
import { Storage, StorageError, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-mantenimiento-clientes-asegurados-edit',
  templateUrl: './mantenimiento-clientes-asegurados-edit.page.html',
  styleUrls: ['./mantenimiento-clientes-asegurados-edit.page.scss'],
})
export class MantenimientoClientesAseguradosEditPage implements OnInit {
  id: any;
  asegurado: any = [];
  bien_foto: string = '';

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private rt: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      if (this.id) {
        this.obtenerAsegurado(this.id);
      }
    });
  }

  incluirAsegurado = () => {
    let aseguradoRef = collection(this.firestore, 'asegurado');

    addDoc(aseguradoRef, {
      codigo: this.asegurado.codigo,
      nombre: this.asegurado.nombre,
      bien_asegurado: this.asegurado.bien_asegurado,
      monto: this.asegurado.monto,
      fecha: new Date(this.asegurado.fecha)
    }).then(doc => {
      this.volver();
    }).catch((error) => {
      console.error("Error: ", error);
    });
  }

  editarAsegurado = (id: string) => {
    const document = doc(this.firestore, 'asegurado', this.id);

    updateDoc(document, {
      codigo: this.asegurado.codigo,
      nombre: this.asegurado.nombre,
      bien_asegurado: this.asegurado.bien_asegurado,
      monto: this.asegurado.monto,
      fecha: new Date(this.asegurado.fecha)
    }).then(doc => {
      this.volver();
    }).catch((error) => {
      console.error("Error: ", error);
    });
  }

  obtenerAsegurado = (id: string) => {
    const document = doc(this.firestore, 'asegurado', id);

    getDoc(document).then(doc => {
      if (doc.exists()) {
        this.asegurado = doc.data();
        if (this.asegurado.fecha && this.asegurado.fecha.toDate) {
          this.asegurado.fecha = this.asegurado.fecha.toDate()
            .toISOString()
            .substring(0, 10) + "";
        }
        if (this.asegurado.bien_foto) {
          this.obtenerBien_fotoAsegurado();
        }
      } else {
        this.asegurado = {};
      }
    }).catch(error => {
      console.error("Error al obtener el asegurado: ", error);
    });
  }

  volver = () => {
    this.rt.navigate(['//mantenimiento-clientes-asegurados-list']);
  }

  accion = (id: string) => {
    if (this.id) {
      this.editarAsegurado(this.id);
    } else {
      this.incluirAsegurado();
    }
    this.volver();
  }

  eliminarAsegurado = () => {
    const document = doc(this.firestore, "asegurado", this.id);

    deleteDoc(document).then(() => {
      console.log("Registro Eliminado");
      this.volver();
    }).catch(error => {
      console.error("Error al eliminar el asegurado: ", error);
    });
  }

  uploadFile = (input: HTMLInputElement) => {
    if (!input.files) return;

    const files: FileList = input.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, `bien_fotos/asegurado/${this.id}`);

        uploadBytesResumable(storageRef, file).on(
          'state_changed',
          this.onUploadChange,
          this.onUploadError,
          this.onUploadComplete
        );
      }
    }
  }

  onUploadChange = (response: UploadTaskSnapshot) => {
    console.log('onUploadChange', response);
  }

  onUploadError = (error: StorageError) => {
    console.log('onUploadError', error);
  }

  onUploadComplete = () => {
    this.editarBien_foto();
    this.obtenerBien_fotoAsegurado();
  }

  editarBien_foto = () => {
    const document = doc(this.firestore, "asegurado", this.id);
    updateDoc(document, {
      bien_foto: 'bien_fotos/asegurado/' + this.id
    }).then(() => {
      console.log("Foto Editado");
    }).catch(error => {
      console.error("Error al editar la foto: ", error);
    });
  }

  obtenerBien_fotoAsegurado = () => {
    const storageRef = ref(this.storage, `bien_fotos/asegurado/${this.id}`);
    getDownloadURL(storageRef).then(url => {
      this.bien_foto = url;
    }).catch(error => {
      console.error("Error al obtener la foto: ", error);
    });
  }

  eliminarBien_foto = () => {
    const storageRef = ref(this.storage, `bien_fotos/asegurado/${this.id}`);
    deleteObject(storageRef).then(() => {
      console.log('Foto eliminado del almacenamiento');

      const document = doc(this.firestore, "asegurado", this.id);
      updateDoc(document, {
        bien_foto: ''
      }).then(() => {
        console.log('Foto eliminado del documento');
        this.bien_foto = '';
      }).catch(error => {
        console.error('Error al actualizar el documento: ', error);
      });
    }).catch(error => {
      console.error('Error al eliminar la foto del almacenamiento: ', error);
    });
  }
}