import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Input } from '@angular/core';
@Component({
  selector: 'app-header',
  standalone:true,
  imports: [MatToolbar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title:string='';

}
