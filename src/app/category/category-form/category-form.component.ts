import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  formInfo: FormLayout;

  isEditing: boolean;
  category: Category = new Category({id: 0, name: ''});

  get name() { return this.categoryForm.get('name'); }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryForm = this.modelCreate();

    this.isEditing = this.route.snapshot.url.toString().includes('edit');

    if (this.isEditing) {
      this.formInfo = {
        submitText: 'Actualizar',
        title: 'Categoría',
        subtitle: 'Editar categoría',
        isEditing: true
      };
      this.category = this.route.snapshot.data.category;
      this.name.patchValue(this.category.name);

    } else {
      this.formInfo = {
        submitText: 'Guardar',
        title: 'Categoría',
        subtitle: 'Crear nueva categoría',
        isEditing: false
      };
    }
  }

  modelCreate = () => this.fb.group({
    name: ['', Validators.required]
  })

  onSubmit = () => {
    if (!this.categoryForm.valid) { return; }
    const categoryModified = new Category({ name: this.name.value, id: this.category.id });

    this.isEditing
    ? this.categoryService.update(categoryModified)
      .subscribe(this.goToList)
    : this.categoryService.add(categoryModified)
      .subscribe(this.goToList);
  }

  goToList = () => this.router.navigate(['category']);
}
