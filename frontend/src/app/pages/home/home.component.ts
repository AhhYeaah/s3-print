
import { UploadService } from './../../services/upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor( private uploadService : UploadService) { }

  isLoadingState : boolean = false

  ngOnInit(): void {
  }

  checkFiles(){}

  async upload({ files } : any){
    if(!files.item(0)) return 

    this.isLoadingState = true;
    
    await this.uploadService.upload(files)

    this.isLoadingState = false;
  }

}
