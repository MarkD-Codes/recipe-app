import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { RecipesPage } from '../recipes/recipes.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonButtons, IonIcon, FormsModule, RecipesPage],
})
export class HomePage {
  Ingredients: string = '';
  searchedIngredients: string = '';

  constructor(private myData: MyData, private router: Router) {}

  async searchRecipesByIngredient() {
   await this.myData.set('ingredients', this.Ingredients);
   // only update the child input when the user presses Search
   this.searchedIngredients = this.Ingredients;
  }

  goToSettings() {
    // Navigate to the settings page
    this.router.navigate(['/settings']);
  }
}
