import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BeatsComponent } from './beats/beats.component';
import { StateService } from './state.service';

@NgModule({
  declarations: [
    AppComponent,
    BeatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ StateService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
