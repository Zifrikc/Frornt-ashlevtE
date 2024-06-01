export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    cargo: string;
    fecha: Date;
    clave: string;
  
    constructor(
      id: number = 0,
      nombre: string = '',
      apellido: string = '',
      cargo: string = '',
      fecha: Date = new Date(),
      clave: string = ''
    ) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.cargo = cargo;
      this.fecha = fecha;
      this.clave = clave;
    }
  }
  