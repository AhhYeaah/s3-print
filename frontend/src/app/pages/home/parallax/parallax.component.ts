import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { ParallaxService } from './ParallaxService/parallax.service';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.sass']
})
export class ParallaxComponent implements AfterViewInit {

  image: HTMLImageElement | undefined
  imageBlur = new Image(64, 128)
  imgDimensions: number[] = [0, 0]
  currentImageSrc: string = ""
  imageLoaded = false
  @ViewChildren('parallax') parallax: any;

  constructor(private http: HttpClient, private imgService: ParallaxService) {
    //Here I see if image is already loaded on service, if is, it means that the page
    //has already loaded, so no need to show animations again.
    this.imageLoaded = this.imgService.isImageLoaded.every(x=>x)

    //I can get the blured image instantly because I dont need the viewport dimensions
    //(The image size for it is fixed at 480/240)
    let imageUrl = imgService.getImageLowRes()
    this.imageBlur.src = imageUrl
    this.currentImageSrc = `url('${imageUrl}')`
  }
  ngAfterViewInit(): void {
    //Taking caution with network, so this component will only ask for a img that fits exactly
    //the same size of viewport, this way i will not get unecessaryly long images that causes
    //the page to be too slow
    this.imgDimensions = [this.parallax.first.nativeElement.clientWidth + 100, this.parallax.first.nativeElement.clientHeight + 100]
    this.image = new Image(this.imgDimensions[0], this.imgDimensions[1])
    this.image.src = this.imgService.getImage(this.imgDimensions)

    this.image.addEventListener('load', () => {
      this.currentImageSrc = `url('${this.image!.src}')`
      //when the image finishes loading it will change and then comunicate to the service that
      //the page has already loaded, making the first check on the constructor possible.
      this.imgService.secondImageLoaded()
    })
  }
}
