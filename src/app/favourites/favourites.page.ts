import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonList, IonButton } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { MyHttp } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonList, IonButton, CommonModule, FormsModule]
})
export class FavouritesPage implements OnInit {

  constructor(private md: MyData, private mh: MyHttp, private router: Router) { }

  detailsBaseUrl: string = "https://api.spoonacular.com/recipes/";
  apiKey: string = '70759a4f7911402abcc53d3c51d3b759';
  recipeData!: any;

  favouriteRecipesList: number[] = [];
  favouriteRecipes: any[] = [];

  ngOnInit() {
    this.loadFavouritesList();
  }

  async loadFavouritesList() {
    const ids: number[] = (await this.md.get('favourite-recipes')) || [];
    this.favouriteRecipesList = ids;
    console.log('Loaded favourite IDs:', this.favouriteRecipesList); // For debugging purposes

    this.favouriteRecipes = []; //empty array for holding recipe details

    if (ids.length === 0) {
      return;
    }

    // Fetch details for each recipe ID and push to favouriteRecipes array
    for (const id of ids) {
      try {
        const details = await this.getRecipeDetails(Number(id));
        this.favouriteRecipes.push(details);
        console.log('Fetched details for', id);
      } catch (err) {
        console.error('Failed to fetch details for', id, err);
      }
    }
  }

  async getRecipeDetails(id: number) {
    const url = this.detailsBaseUrl + id + '/information?apiKey=' + this.apiKey;
    const options: HttpOptions = { url };
    let recipeDetails = await this.mh.get(options);
    return recipeDetails.data;
  }
  
  //stores the selected recipe ID and navigates to the details page
  async goToRecipe(recipeIDNumber: number) {
    await this.md.set('recipeIDNumber', recipeIDNumber);
    this.router.navigate(['/recipe-details']);
  }






}

