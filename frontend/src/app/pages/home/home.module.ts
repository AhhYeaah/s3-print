import { HomeComponent } from './home.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ParallaxComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
