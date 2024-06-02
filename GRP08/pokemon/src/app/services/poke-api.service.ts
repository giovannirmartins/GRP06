import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(private httpClient: HttpClient) { }
  
  public idTab3: number[] = [];
  public idTab2: number = Math.floor(Math.random() * 100);
  public id: number = Math.floor(Math.random() * 100);
  public idPokemon1: number = this.id; 
  public pokemon1: any = {
    abilities: '',
    vitoria: 0,
    derrota: 0,
    empate: 0
  };

  public pokemon2: any = {
    abilities: '',
    vitoria: 0,
    derrota: 0,
    empate: 0
  };


  public resultado: string ='';
  

  getPokeAPIService1() {
    if(this.idTab3[0]){
      this.idTab3[1]=this.id;
    }
    this.id = Math.floor(Math.random() * 100);
    this.idPokemon1= this.id;
    this.idTab3[0]=this.id;
    console.log(this.idPokemon1);
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
  }

  getPokeAPIService2() {
    this.idTab2 = Math.floor(Math.random() * 100);
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${this.idTab2}`);
    
  }
  getPokeAPIService3() {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${this.idTab3[0]}`);
    
  }
  getPokeAPIService4() {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${this.idTab3[1]}`);
    
  }
  getPokemon2(){
    return this.pokemon1;
  }

  batalhar(){
    this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${this.idPokemon1}`).subscribe((value) => {
      this.pokemon1.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
  
      this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${this.idTab2}`).subscribe((value) => {
        this.pokemon2.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
  
        if(this.pokemon1.abilities > this.pokemon2.abilities){
          this.resultado = "VITÓRIA";
          this.pokemon1.vitoria = this.pokemon1.vitoria+1;
          console.log("vitoria: "+this.pokemon1.vitoria);
        }
        else if (this.pokemon1.abilities < this.pokemon2.abilities){
          this.resultado = "DERROTA";
          this.pokemon1.derrota = this.pokemon1.derrota+1;
          console.log("Derrota: "+this.pokemon1.derrota);
        }
        else{
          this.resultado = "EMPATE";
          this.pokemon1.empate = this.pokemon1.empate+1;
          console.log("Empate: "+this.pokemon1.empate);
        }
      });
    });
  }
  
  showpokemons(){

  }

}
