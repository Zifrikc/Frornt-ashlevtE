import { Component, OnInit } from '@angular/core';
import { WorkesService } from 'src/app/Services/workes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(private workesServices: WorkesService) { }

  newWorkerData = {
    fullName: '',
    lastName: '',
    typeDocument: '',
    numberDocument: '',
    birthDate: '',
    entryDate: '',
    numberChildren: ''
  };

  ngOnInit(): void { }

  formSubmitWorker() {
    // Convierte las fechas al formato adecuado
    this.newWorkerData.birthDate = new Date(this.newWorkerData.birthDate).toISOString();
    this.newWorkerData.entryDate = new Date(this.newWorkerData.entryDate).toISOString();

    this.workesServices.addNewWorke(this.newWorkerData).subscribe(
      (_data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Trabajador agregado',
          showConfirmButton: false,
          timer: 1500
        });
        location.reload();
      },
      (error: any) => {
        console.error('Error al agregar trabajador:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar trabajador',
          text: 'Hubo un problema al agregar el trabajador. Por favor, inténtalo de nuevo más tarde.',
        });
      }
    );
  }
}
