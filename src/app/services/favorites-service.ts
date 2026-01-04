import { Injectable } from '@angular/core';
import { MyData } from './my-data';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private key: string = 'favourite-recipes';

  constructor(private myData: MyData) { }

  async initializeFavourites() { 
    const favouritesExisting = await this.myData.get(this.key);
    if (favouritesExisting === null) {
      await this.myData.set(this.key, []);
    }
  }

  async addToFavourites(recipeId: number) {
    let listOfFavorites: number[] = (await this.myData.get(this.key));
    let inFavourites = await this.checkIfFavourite(recipeId);
    if (!inFavourites) {
      listOfFavorites.push(recipeId);
      await this.myData.set(this.key, listOfFavorites);
    }
  }

  async removeFromFavourites(recipeId: number) {
    let listOfFavorites: number[] = (await this.myData.get(this.key));
    listOfFavorites = listOfFavorites.filter(id => id !== recipeId);
    await this.myData.set(this.key, listOfFavorites);
  }

  async checkIfFavourite(recipeId: number): Promise<boolean> {
    let listOfFavorites: number[] = (await this.myData.get(this.key));
    return listOfFavorites.includes(recipeId);
  }

  async clearFavourites() {
    await this.myData.set(this.key, []);
  }


}
