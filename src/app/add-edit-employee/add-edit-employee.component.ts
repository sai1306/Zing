import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { EmployeeService } from '../Services/employee.service';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Employee } from '../models/employee.model';
@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatError,
    CommonModule
  ],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.css'
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  isUpdate = false;
  initValue!:Employee;
  id: string = '';
  constructor(private fb: FormBuilder, private employeeService:EmployeeService) {

  }

  ngOnInit(): void {
    const navigation = window.history.state;
    if(navigation.initValue) {
      this.initValue = navigation.initValue;
      this.isUpdate = true;
      this.id  = this.initValue.id;
    }
    this.employeeForm = this.fb.group({
      name: [(this.isUpdate)?this.initValue.name:'', [Validators.required, Validators.minLength(3)]],
      position: [(this.isUpdate)?this.initValue.position:'', Validators.required],
      salary: [(this.isUpdate)?this.initValue.salary:'', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Employee Data:', this.employeeForm.value);
      this.employeeService.addEmployee(this.employeeForm.value).subscribe((res:any)=>{
        console.log(res);
      })
  }}

  onUpdate() : void {
    if(this.employeeForm.valid) {
      console.log('employee data update', this.employeeForm.value);
      this.employeeService.updateEmployee(this.id, this.employeeForm.value).subscribe((res:any)=>{
        console.log(res);
      })
    }
  }
}
