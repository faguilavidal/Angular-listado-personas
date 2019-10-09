import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { LoginService } from './login/login.service';

@Injectable()
export class DataService {
  token: string;
  constructor(private httpClient: HttpClient, private loginService: LoginService) {
    this.token = this.loginService.getIdToken();
  }

  // Guardar Personas
  guardarPersonas(personas: Persona[]) {
    this.httpClient.put('https://listado-personas-b3c43.firebaseio.com/datos.json?auth=' + this.token, personas)
    .subscribe(
      res => console.log('Resultado de guardar personas: ' + res),
      err => console.log('Error al intentar guardar personas: ' + err)
    );
  }

  // Obtener listado de personas
  cargarPersonas() {
    return this.httpClient.get('https://listado-personas-b3c43.firebaseio.com/datos.json?auth=' + this.token);
  }

  // Editar persona
  modificarPersona(index: number, persona: Persona){
    let url: string;
    url = 'https://listado-personas-b3c43.firebaseio.com/datos/'+ index + '.json?auth=' + this.token;
    this.httpClient.put(url, persona)
    .subscribe(
      res => console.log('resultado modificar persona: ' + res),
      err => console.log('Error al intentar modificar persona: ' + err)
    );
  }

  // Eliminar persona
  eliminarPersona(index: number) {
    let url: string;
    url = 'https://listado-personas-b3c43.firebaseio.com/datos/'+ index + '.json?auth=' + this.token;
    this.httpClient.delete(url)
    .subscribe(
      res => console.log('resultado eliminar persona: ' + res),
      err => console.log('Error al intentar eliminar persona: ' + err)
    );
  }
}
