import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../models/employee.model';
@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatToolbarModule], 
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
})
export class DeleteDialogComponent {
  constructor(
    private employeeService:EmployeeService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  onClick() {
    this.employeeService.deleteEmployee(this.data.id).subscribe((res:any)=>{
      console.log('deleted successfully');
      this.onNoClick(); 
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
