import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHttp } from '../services/my-http';
import { MyData } from '../services/my-data';
import { FavoritesService } from '../services/favorites-service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon],
})

export class RecipeDetailsPage implements OnInit {

  detailsBaseUrl: string = "https://api.spoonacular.com/recipes/";
  apiKey: string = '70759a4f7911402abcc53d3c51d3b759';
  recipeData!: any;
  recipeIngredients!: any[];
  recipeSteps!: any[];
  metric: boolean = true; // true = metric, false = imperial
  isFavourite: boolean = false; 

  constructor(private MyHttp: MyHttp, private MyData: MyData, private router: Router, private fs: FavoritesService) { }

  ngOnInit() {
    this.loadRecipeDetails();
  }

  ionViewWillEnter(){ // called each time the view is entered, 
    this.loadRecipeDetails();
  }

  async getRecipeIDNumber(){
    let id = await this.MyData.get('recipeIDNumber');
    return id;
  }

  async getRecipeDetails(id: number) {
      const url = this.detailsBaseUrl + id + '/information?apiKey=' + this.apiKey;
      const options: HttpOptions = { url };
      let recipeDetails = await this.MyHttp.get(options);
      this.metric = await this.checkUnitPreference();
      this.recipeData = recipeDetails.data;
      this.recipeIngredients = this.recipeData.extendedIngredients;
      this.recipeSteps = this.recipeData.analyzedInstructions[0]?.steps || [];
    }

    async loadRecipeDetails() {
      let id = await this.getRecipeIDNumber();
      await this.getRecipeDetails(id);
      this.isFavourite = await this.checkIfFavourite(); //should set isFavourite correctly for the current recipe
    }

    async checkIfFavourite(): Promise<boolean> {
      let id = await this.MyData.get('recipeIDNumber');
      let result = await this.fs.checkIfFavourite(id);
      return result;
    }

    async checkUnitPreference(){
      const pref: string = await this.MyData.get('unit-preferences');
      if (pref === 'imperial'){
        return false;
      } else {
        return true;
      }
    }

    returnToHome() {
    this.router.navigate(['/home']);
  }

  async addToFavourites(){
    let recipeID = await this.getRecipeIDNumber();
    await this.fs.addToFavourites(recipeID);
    await this.updateIsFavourite();//ensure isFavourite is updated correctly
    }

  async removeFromFavourites(){
    let recipeID = await this.getRecipeIDNumber();
    await this.fs.removeFromFavourites(recipeID);
    await this.updateIsFavourite();//ensure isFavourite is updated correctly
    }

    async updateIsFavourite(){
      this.isFavourite = await this.checkIfFavourite();
    }

}