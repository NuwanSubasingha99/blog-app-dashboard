import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryArray?: any[]
  formCategory?: string
  formStatus: string = 'Add'
  categoryId: string = ''

  ngOnInit(): void {

    this.categoryService.loadData().subscribe(val => {
      
      this.categoryArray = val;
    })

  }
  constructor(private categoryService: CategoriesService) {

  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    }
    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset()
    }
    else if (this.formStatus == 'Update') {
      this.categoryService.updateDta(this.categoryId, categoryData)
      formData.reset();
      this.formStatus = 'Add';
    }


  }

  onEdit(categoy: any, id: any) {
    this.formCategory = categoy;
    this.formStatus = 'Update';
    this.categoryId = id;

  }

  onDelet(id: any) {
    this.categoryService.deleteData(id);
    this.formStatus = 'Add';
  }


}
