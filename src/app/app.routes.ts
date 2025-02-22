import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
export const routes: Routes = [{
    path:'',
    component:EmployeesListComponent
},
{
    path: 'employee',
    component:AddEditEmployeeComponent
}];
