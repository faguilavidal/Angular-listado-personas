import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../../persona.model';
import { PersonaService } from '../../personas.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})

export class PersonaComponent implements OnInit {

  @Input() persona: Persona;
  @Input() indice: number;

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
  }

  emitirSaludo() {
    this.personaService.saludar.emit(this.indice + 1);
  }

}
