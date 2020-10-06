import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../customer.model';
import { PriceList } from 'src/app/price-list/price-list.model';
import { PriceListService } from 'src/app/price-list/price-list.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup;
  formInfo: FormLayout;
  priceLists: PriceList[];
  fiscalconditions: any;
  isEditing: boolean;
  customer: Customer = new Customer({});
  hide: boolean;
  imgControl: FormControl = new FormControl();
  imgDefault = '../../assets/avatar_person.png';
  shipmentDays: String[] = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo' ];

  get businessName() { return this.customerForm.get('businessName'); }
  get username() { return this.customerForm.get('username'); }
  get cellphone() { return this.customerForm.get('cellphone'); }
  get email() { return this.customerForm.get('email'); }
  get password() { return this.customerForm.get('password'); }
  get clientcode() { return this.customerForm.get('clientcode'); }
  get cuit() { return this.customerForm.get('cuit'); }
  get address() { return this.customerForm.get('address'); }
  get city() { return this.customerForm.get('city'); }
  get province() { return this.customerForm.get('province'); }
  get fiscalconditionid() { return this.customerForm.get('fiscalconditionid'); }
  get pricelistid() { return this.customerForm.get('pricelistid'); }
  get shipmentday() { return this.customerForm.get('shipmentday'); }

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private priceListService: PriceListService
  ) { }

  ngOnInit() {
    this.customerForm = this.modelCreate();
    this.isEditing = this.route.snapshot.url.toString().includes('edit');
    this.priceListService.getAll().subscribe( res => {
      this.priceLists = res;
    });

    this.customerService.getAllFiscalConditions().subscribe( res => {
      this.fiscalconditions = res;
    });

    if (this.isEditing) {
      this.formInfo = {
        submitText: 'Actualizar',
        title: 'Clientes',
        subtitle: 'Editar cliente',
        isEditing: true
      };
      this.customer = this.route.snapshot.data.customer;

      this.businessName.patchValue(this.customer.businessName);
      this.cellphone.patchValue(this.customer.cellphone);
      this.username.patchValue(this.customer.username);

    } else {
      this.formInfo = {
        submitText: 'Guardar',
        title: 'Clientes',
        subtitle: 'Crear cliente',
        isEditing: false
      };
    }
  }

  modelCreate = () => this.fb.group({
    businessName: ['', Validators.required],
    username: ['', Validators.required],
    cellphone: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    clientcode: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    cuit: ['', Validators.required],
    fiscalconditionid: ['', Validators.required],
    pricelistid: ['', Validators.required],
    shipmentday: ['', Validators.required]
  })

  onSubmit = () => {
    if (!this.customerForm.valid) { return; }

    const newCustomer = new Customer(this.customerForm.value);
    newCustomer.img = this.imgControl.value;
    this.customerService.add(newCustomer)
      .subscribe(this.goToList);
  }

  goToList = () => this.router.navigate(['customer']);

  imageUploaded = (image) => this.imgControl.setValue(image);
}

