import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { CustomerService } from '../customer.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-customer-resetpassword-form',
  templateUrl: './customer-resetpassword-form.component.html',
  styleUrls: ['./customer-resetpassword-form.component.css']
})
export class CustomerResetpasswordFormComponent implements OnInit {

  resetPasswordForm: FormGroup;
  formInfo: FormLayout;
  customer: any = {};
  hide: boolean;

  get password() { return this.resetPasswordForm.get('password'); }
  get repeatPassword() { return this.resetPasswordForm.get('repeatPassword'); }

  constructor(
    private fb: FormBuilder,
    private customService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.resetPasswordForm = this.modelCreate();

    this.formInfo = {
      submitText: 'Enviar',
      title: 'Restaurar',
      subtitle: 'Contraseña',
      isEditing: true
    };
  }

  modelCreate = () => this.fb.group({
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  })

  onSubmit() {
    if (this.password.value != this.repeatPassword.value) {
      return this.snackBar.open('Las contraseñas no coinciden.', null, { duration: 2500 });
    }

    if (!this.resetPasswordForm.valid) { return; }

    this.customer.password = this.password.value;
    this.customer.id = this.route.snapshot.params.id;

    this.customService.resetPassword(this.customer)
      .subscribe( (res) => {
        this.snackBar.open('La contraseña se ha actualizado correctamente.', null, { duration: 2500 });
        this.goToList();
      });
  }

  goToList = () => this.router.navigate(['customer']);

}
