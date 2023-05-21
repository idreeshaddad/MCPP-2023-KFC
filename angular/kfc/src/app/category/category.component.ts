import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loadCategories();
  }

  openDeleteDialog(category: Category) {

    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      data: category
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {

        if (result) {
          this.catSvc.deleteCategory(category.id).subscribe({
            next: () => {
              this.loadCategories();
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(`${category.name} cannot be deleted. ${err.message}`);
            }
          });
        }

      }
    });
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
