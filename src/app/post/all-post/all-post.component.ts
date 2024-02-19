import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{

  postArray!: any[];

  constructor(private postServise : PostService){}

  ngOnInit(): void {

    this.postServise.loadData().subscribe(val =>{
      this.postArray = val;
    })
    
  }

  onDelete(postImgPath:string,id:string){

    this.postServise.deleteImage(postImgPath,id);

  }

}
