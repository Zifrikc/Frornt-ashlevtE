import { Component, OnInit, ViewChild, AfterViewInit, inject, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormField, MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { WorkesService } from 'src/app/Services/workes.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit, AfterViewInit {
  workesData: any[] = [];
  workesDelete: any[] = [];
  displayedColumns: string[] = ['#','fullName', 'lastName', 'typeDocument', 'numberDocument', 'birthDate', 'entryDate', 'edit', 'delete', 'viewChildren'];
  dataSourceWorkers = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
	private offcanvasService = inject(NgbOffcanvas);
	closeResult = '';
  constructor(public dialog: MatDialog, public workeService: WorkesService, public snack:MatSnackBar) { }

  ngOnInit(): void {
    this.workeService.getAllWorkes().subscribe(
      (data: any) => {
        this.workesData = data;
        this.dataSourceWorkers.data = this.workesData;
      }
    );
  }

  deleteByIdWorker(id: any) {
    this.workeService.deleteWorkeyId(id).subscribe(
      () => {
        console.log('Trabajador eliminado');
        this.snack.open('Trabajador eliminado', 'Cerrar', {
          duration: 2000,
        });
        this.workeService.getAllWorkes().subscribe(
          (data: any) => {
            this.workesDelete = data;
          }
        );
        location.reload();
      },
      (error) => {
        console.error('Error al eliminar el Trabajador:', error);
        this.snack.open('Error al eliminar el Trabajador', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

  ngAfterViewInit() {
    this.dataSourceWorkers.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceWorkers.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}

@Component({
  selector: 'DialogComponent',
  templateUrl: '../dialog/dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, MatIconModule, FormsModule ],

})
export class DialogElementsExampleDialog implements OnInit {
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
  ngOnInit(): void {
  }

  formSubmitWorker()  {
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
