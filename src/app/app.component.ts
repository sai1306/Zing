import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeesListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Zing';
  
}
