import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconSelectComponent } from '../components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IconSelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'components-angular';
}
