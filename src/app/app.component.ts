import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
@Component({
  selector: 'app-root',
  imports: [FormsModule, NzInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  keyword = '';
  title = 'components-angular';
}
