import { Persona } from './persona.model';
import { LoggingService } from './LoggingService.service';
import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class PersonaService{

    personas: Persona[] = [];

    saludar = new EventEmitter<number>();

    constructor(private loggingService: LoggingService, private dataService: DataService) {
    }

    setPersonas(personas: Persona[]) {
      this.personas = personas;
    }

    obtenerPersonas() {
      return this.dataService.cargarPersonas();
    }

    agregarPersona(persona: Persona){
        this.loggingService.enviaMensajeAConsola('Agregamos persona: ' + persona.nombre);
        if (this.personas == null) {
          this.personas = [];
        }
        this.personas.push(persona);
        this.dataService.guardarPersonas(this.personas);
      }

    encontrarPersona(index: number) {
      const persona: Persona = this.personas[index];
      return persona;
    }

    modificarPersona(index: number, persona: Persona) {
      const persona1 = this.personas[index];
      persona1.nombre = persona.nombre;
      persona1.apellido = persona.apellido;
      this.dataService.modificarPersona(index, persona);
    }

    eliminarPersona(index: number) {
      this.personas.splice(index, 1);
      this.dataService.eliminarPersona(index);
      // se vuelven a guardar el arreglo para regenerar los indices en la bd
      this.modificarPersonas();
    }

    modificarPersonas() {
      if (this.personas != null) {
        this.dataService.guardarPersonas(this.personas);
      }
    }
}
