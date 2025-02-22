import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError, pipe, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const headers = {
  'x-rapidapi-key': '01e88c0626mshda1df3f70535902p1f0dacjsncbe13dfb435b',
  'x-rapidapi-host': 'api-employee-management.p.rapidapi.com'
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://api-employee-management.p.rapidapi.com';
  constructor(private http:HttpClient, private snackBar:MatSnackBar) {
   }

   //get
   getEmployees()  {
    console.log('emoloyees api call');
    return this.http.get<any[]>(`${this.apiUrl}/employees`, {headers:headers});
   }

   //post
   addEmployee(body:any) {
    const headers = new HttpHeaders({
      'x-rapidapi-key': '01e88c0626mshda1df3f70535902p1f0dacjsncbe13dfb435b',
      'x-rapidapi-host': 'api-employee-management.p.rapidapi.com',
      'Content-Type': 'application/json'
    })
    return this.http.post(`${this.apiUrl}/employees/add`, body, {
      headers: headers
    }).pipe(
      tap(() => {
        this.snackBar.open('Employee added successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right', 
        });
      }),
      catchError((error) => {
        this.snackBar.open('Failed to add employee', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => error);
      })
    );
   }

   //put
   updateEmployee(id:string, body:any) {
    const headers = new HttpHeaders({
      'x-rapidapi-key': '01e88c0626mshda1df3f70535902p1f0dacjsncbe13dfb435b',
      'x-rapidapi-host': 'api-employee-management.p.rapidapi.com',
      'Content-Type': 'application/json'
    })
    return this.http.put(`${this.apiUrl}/employees/update/${id}`, body, {headers})
    .pipe(
      tap(() => {
        this.snackBar.open('Employee Updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right', 
        });
      }),
      catchError((error) => {
        this.snackBar.open('Failed to update employee', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        return throwError(() => error);
      })
    );
   }
   //delete
   deleteEmployee(id:string) {    
    return this.http.delete(`${this.apiUrl}/employees/delete/${id}`, {
      headers: {
        'x-rapidapi-key': '01e88c0626mshda1df3f70535902p1f0dacjsncbe13dfb435b',
        'x-rapidapi-host': 'api-employee-management.p.rapidapi.com'
      }
   })
   .pipe(
    tap(() => {
      this.snackBar.open('Employee Deleted successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right', 
      });
    }),
    catchError((error) => {
      this.snackBar.open('Failed to delete employee', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return throwError(() => error);
    })
  );
  }

}
