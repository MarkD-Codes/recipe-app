import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonButton],
})

export class RecipesPage implements OnChanges {

  @Input() ingredients: string = '';
  apiKey: string = '70759a4f7911402abcc53d3c51d3b759';
  recipes!: any;

  // base URL used to construct the request each time
  baseUrl: string = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + this.apiKey + "&query=";

  constructor(private myData: MyData, private MyHttp: MyHttp) { }

  async ngOnInit() {
    // If an ingredients value was stored previously, load it and fetch results
    const stored = await this.myData.get('ingredients');
    if (stored) {
      this.ingredients = stored;
      await this.getRecipes();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ingredients'] && this.ingredients) {
      this.getRecipes();
    }
  }

  async getRecipes() {
    // Prefer the input-provided ingredients; fall back to stored value if empty
    if (!this.ingredients) {
      this.ingredients = await this.myData.get('ingredients');
    }

    if (!this.ingredients) return; // nothing to search

    const url = this.baseUrl + this.ingredients;
    const options: HttpOptions = { url };
    let recipeResults = await this.MyHttp.getRecipes(options);
    this.recipes = recipeResults.data.results;
  }




}
