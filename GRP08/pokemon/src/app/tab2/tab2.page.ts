import { Camera, CameraResultType } from '@capacitor/camera';
import { PhotoService } from '../services/photo.service';
import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pokemon2: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: '',
    weight: ''
  }

  constructor(public pokeAPIService: PokeAPIService, public photoService: PhotoService) {}

  ionViewWillEnter(){
    this.pokeAPIService.getPokeAPIService2()
      .subscribe((value) => {
        this.pokemon2.name          = JSON.parse(JSON.stringify(value))['name'];
        this.pokemon2.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
        this.pokemon2.abilities     = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon2.height        = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon2.weight        = JSON.parse(JSON.stringify(value))['weight'];
      });
      
      this.pokeAPIService.batalhar();
    }

    getResultadoColor() {
      switch (this.pokeAPIService.resultado) {
        case 'VITÓRIA':
          return 'green';
        case 'DERROTA':
          return 'red';
        case 'EMPATE':
          return 'yellow';
        default:
          return 'black';
      }
    }
    
  

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    // imageElement.src = imageUrl;
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
