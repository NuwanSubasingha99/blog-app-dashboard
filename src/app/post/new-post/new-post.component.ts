import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImage: any;
  categories!: any[];

  isDisabled: boolean = true;

  postForm : FormGroup;


  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postServise:PostService) { 
      this.postForm = this.fb.group({
        title:['',[Validators.required,Validators.minLength(10)]],
        permalink:['',[Validators.required]],
        excerpt:['',[Validators.required,Validators.minLength(50)]],
        category:['',[Validators.required]],
        postImg:['',[Validators.required]],
        content:['',[Validators.required]],
      })
      
    }

  ngOnInit(): void {

    this.categoryService.loadData().subscribe(val => {
      this.categories = val;})}

  get fc(){
    return this.postForm.controls
  }

  onTitelChange($event: any) {
    const titel = $event.target.value;
    let permalink = titel.replace(/\s/g, '-');
    this.permalink = permalink;

  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target!.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }
  onSubmit(){

    let splited = this.postForm.value.category.split('-');
    console.log(splited)

    const postData: Post ={
      titel: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category:{
        categgoryId:splited[0],
        category:splited[1]
      },
      postImgPath:'',
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createdAt: new Date()
    }
    this.postServise.uploadImage(this.selectedImage,postData);
    console.log(postData);
  }
}
