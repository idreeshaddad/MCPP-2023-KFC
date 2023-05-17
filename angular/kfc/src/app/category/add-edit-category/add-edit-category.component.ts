import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enum/pageMode.enum';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  categoryForm!: FormGroup;

  categoryId!: number;
  category!: Category;
  pageMode: PageMode = PageMode.add;

  pageModeEnum = PageMode;

  constructor(
    private fb: FormBuilder,
    private catSvc: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.buildForm();

    this.getCategoryIdFromUrl();

    if (this.pageMode == PageMode.edit) {

      this.loadCategory();
    }

  }

  submitForm() {

    if (this.categoryForm.valid) {

      if (this.pageMode == PageMode.add) {

        this.createCategory();
      }
      else {
        //this.editCategory();
      }
    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.categoryForm = this.fb.group({
      id: [0],
      name: ['', Validators.required]
    });
  }

  private getCategoryIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.edit;
    }
  }

  private loadCategory(): void {

    this.catSvc.getCategory(this.categoryId).subscribe({
      next: (categoryFromApi: Category) => {
        this.category = categoryFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      }
    });
  }

  private createCategory(): void {

    this.catSvc.createCategory(this.categoryForm.value).subscribe({
      next: (categoryFromApi: Category) => {
        // TODO snack bar notification: Categoty has been created Successfully
        this.router.navigate(['category']);
      },
      error: (err: HttpErrorResponse) => {
        // TODO snack the error
      }
    });
  }

  //#endregion

}
