import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Persona } from '../../persona.model';
import { LoggingService } from '../../LoggingService.service';
import { PersonaService } from '../../personas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  // @Output() personaCreada = new EventEmitter<Persona>();
  // @ViewChild('nombreInput', {static: false}) nombreInput: ElementRef;
  // @ViewChild('apellidoInput', {static: false}) apellidoInput: ElementRef;

  nombreInput: string;
  apellidoInput: string;
  index: number;
  modoEdicion: number;

  constructor(private loggingService: LoggingService,
              private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) {
    this.personaService.saludar.subscribe(
      (indice: number) => alert('El indice es: ' + indice)
    );
  }

  ngOnInit() {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];

    if (this.modoEdicion != null && this.modoEdicion === 1) {
      const persona: Persona = this.personaService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }

  onGuardarPersona() {
    const persona1 = new Persona(this.nombreInput, this.apellidoInput);
    if (this.modoEdicion != null && this.modoEdicion === 1) {
      this.personaService.modificarPersona(this.index, persona1);
    } else {
      this.personaService.agregarPersona(persona1);
    }
    this.router.navigate(['personas']);
  }

  eliminarPersona() {
    if (this.index != null) {
      this.personaService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }
}
