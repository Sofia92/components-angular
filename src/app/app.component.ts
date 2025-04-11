import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconSelectComponent, SearchBoxComponent } from '../components';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, IconSelectComponent, SearchBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  keyword = '';
  title = 'components-angular';
}
