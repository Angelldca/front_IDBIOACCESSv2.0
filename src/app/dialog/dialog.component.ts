import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, Form} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, 
    MatDialogActions,
     MatDialogClose, 
     MatDialogTitle,
     MatInputModule,
     FormsModule, ReactiveFormsModule, 
     MatDialogContent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}
  descripcion = new FormControl('', 
  [Validators.required, 
    
 ]);
 deleteForm = new FormGroup({
  descipcion:this.descripcion,
});
 getErrorMessage(element:FormControl) {
  if (element.hasError('required')) {
    return 'El campo es obligatorio';
  }
  if (element.hasError('maxlength') || element.hasError('minlength') ) {
    return 'Longitud incorrecta';
  }

  return element.hasError('pattern') ? `El contenido no es válido "${element.value}"` : '';
}
  onAceptarClick( deleteForm:FormGroup): void {
    if(deleteForm.valid)
     this.dialogRef.close({delete:true, descripcion: this.descripcion.value}); 
  }
  
  onEliminarClick(): void {
    this.dialogRef.close({delete:false, descripcion: ''});
  }
}
