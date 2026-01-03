import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonButton, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  unitPreference: string = 'metric';

  constructor(private myData: MyData, private router: Router) { }

  async ngOnInit() {
    await this.loadPreference();
  }

  async loadPreference(){
    const unitPreference: string = await this.myData.get('unit-preferences');
    if (unitPreference === null || unitPreference === undefined){
      this.unitPreference = 'metric';
      await this.myData.set('unit-preferences', this.unitPreference);
    } else {
      this.unitPreference = unitPreference;
    }
  }

  async onPreferenceChange(event: any){
    const value = event?.detail?.value ?? this.unitPreference;
    this.unitPreference = value;
    await this.myData.set('unit-preferences', this.unitPreference);
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }


}
