
import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // O seletor do componente raiz
  templateUrl: './app.component.html', // O arquivo HTML associado a este componente
  styleUrls: ['./app.component.css'] // O arquivo CSS associado a este componente
})
export class AppComponent {
  title = 'Psychomeet'; // Uma propriedade que pode ser usada no template HTML
}
