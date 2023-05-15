import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  constructor(private catSvc: CategoryService, private activatedRoute: ActivatedRoute) { }

  categoryId!: number;
  category!: Category;

  ngOnInit(): void {

    this.getCategoryIdFromUrl();

    if (this.categoryId) {

      this.loadCategory();
    }
  }

  //#region Private Functions

  private getCategoryIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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

  //#endregion

}
