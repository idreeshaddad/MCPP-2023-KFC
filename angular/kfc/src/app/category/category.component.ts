import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryDS: Category[] = [];
  categoryColumns: string[] = ['id', 'name'];

  constructor(private catSvc: CategoryService) { }

  ngOnInit(): void {

    this.loadCategories();
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