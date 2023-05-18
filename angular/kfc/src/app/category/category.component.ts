import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryDS: Category[] = [];
  categoryColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private catSvc: CategoryService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.loadCategories();
  }

  openDeleteDialog() {

    this.dialog.open(DeleteCategoryComponent);
  }


  //#region Private Functions

  private loadCategories(): void {

    this.catSvc.getCategories().subscribe({
      next: (categoriesFromApi: Category[]) => {
        this.categoryDS = categoriesFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });
  }

  //#endregion

}
