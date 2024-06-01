import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'cargo', 'fecha', 'clave', 'actions'];
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.dataSource.data = this.usuarios;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUsuario(): void {
    this.openDialog();
  }

  editUsuario(id: number): void {
    // Lógica para abrir un diálogo o navegar a un formulario para editar al usuario
  }

  deleteUsuario(id: number): void {
    this.usuarioService.deleteUsuario(id).subscribe(() => this.getUsuarios());
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'DialogComponent',
  templateUrl: '../dialog/dialog.component.html',
  standalone: true,
})
export class DialogElementsExampleDialog {}
