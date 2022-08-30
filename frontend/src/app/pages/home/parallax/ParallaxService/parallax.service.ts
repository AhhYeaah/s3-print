import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParallaxService {

  numeroImagem : number = 0
  photoIdArray : number[] = [1005,1011,1012,1015,1018,1035,1039,1042,1041,109,129,203,202]
  isImageLoaded : boolean[] = [false, false]
  urlImageLowRes : string = ""
  urlImageHighRES : string = ""
  imgDimensions : number[] = [0,0]
  
  constructor() { 
    this.numeroImagem = Math.trunc(Math.random() * (this.photoIdArray.length - 0) + 0);
  }

  getImageLowRes(){
    if(this.urlImageLowRes != "") return this.urlImageLowRes

    let url = `https://picsum.photos/id/${this.photoIdArray[this.numeroImagem]}/480/240?blur`
    this.urlImageLowRes = url

    this.isImageLoaded[0] = true
    return this.urlImageLowRes
  }
 
  getImage(imgDimensions : number[]){
    if(this.urlImageHighRES != "") return this.urlImageHighRES
    this.imgDimensions  = imgDimensions

    let url = `https://picsum.photos/id/${this.photoIdArray[this.numeroImagem]}/${this.imgDimensions[0]}/${this.imgDimensions[1]}`
    this.urlImageHighRES = url

    return this.urlImageHighRES
  }

  secondImageLoaded(){
    this.isImageLoaded[1] = true
  }
}
