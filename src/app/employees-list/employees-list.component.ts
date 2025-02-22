import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { EmployeeService } from './../Services/employee.service';
import { Employee } from './../models/employee.model';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { DeleteDialogComponent } from './../dialog/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
  })
export class EmployeesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'position', 'salary', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);
  searchTerm: string = '';
  employees: Employee[] = [];
  private searchSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog, private router:Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.applySearch(searchText);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe((structure: any) => {
      this.employees = []; // Reset the array
  
      console.log('API Response:', structure.employees); // Debugging
  
      this.employees = Object.keys(structure.employees).map((key) => {
        const obj = structure.employees[key];
        return {
          id: key, 
          name: obj.name,
          position: obj.position,
          salary: obj.salary
        };
      });
  
      console.log('Processed Employees:', this.employees); 
  
      this.dataSource.data = this.employees;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  onSearch(event: any) {
    this.searchSubject.next(event.target.value);
  }

  applySearch(searchText: string) {
    this.dataSource.filter = searchText.trim().toLowerCase();
  }
  onNavigate(emp?:Employee) {
    if(!emp)
    this.router.navigate(['/employee']);
    else{
      this.router.navigate(['/employee'], {state:{initValue:emp}});
    }
  }

  openDialog(id:string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {id:id, employees:this.employees}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchEmployees();
    });
  }

}
  
