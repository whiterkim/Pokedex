import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-image',
  inputs: ['pokemonId', 'key', 'type', 'height'],
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {
  @Input()
  set pokemonId(value: number) {
    this._pokemonId = value;
    this.getUrl();
  }
  get pokemonId() {
    return this._pokemonId;
  }
  _pokemonId: number;

  @Input()
  set key(value: string) {
    this._key = value;
    this.getUrl();
  }
  get key() {
    return this._key;
  }
  _key: string;

  @Input()
  type: string;
  @Input()
  height: number;
  url: string;

  static baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getUrl();
  }

  getUrl(): void {
    if (this.type === 'pokemon') {
      this.getPokemonImageUrl(true);
    } else if (this.type === 'pokemon-icon') {
      this.getPokemonImageUrl(false);
    } else if (this.type === 'item') {
      this.url = "assets/item/" + this.key + ".png";
    } else if (this.type === 'item-icon') {
      this.url = "assets/item-icon/" + this.key + ".png";
    } else if (this.type === 'special-icon') {
      this.url = "assets/special-icon/" + this.key + ".png";
    }
  }

  async getPokemonImageUrl(isOnline: boolean): Promise<void> {
    if (this.pokemonId === undefined) {
      let pokemon = await this.pokemonService.getPokemonFromKey(this.key);
      this.pokemonId = pokemon.id;
    }

    if (isOnline)
      this.url = ImageComponent.getOnlineImageUrl(this.type, this.pokemonId);
    else
      this.url = ImageComponent.getLocalImageUrl(this.type, this.pokemonId);
  }

  static getOnlineImageUrl(type: string, id: number): string {
    var typePath = "";
    if (type === "pokemon") {
      typePath = "other/official-artwork/";
    } else if (type === "pokemon-icon") {
      typePath = "versions/generation-viii/icons/"
    }

    return ImageComponent.baseUrl + typePath + id + ".png"
  }

  static getLocalImageUrl(folder: string, id: number): string {
    var path = "assets/" + folder + "/";

    var pokeDexId = Math.floor(id);
    var formId = id * 10 % 10;
    var file;
    if (formId === 0)
      file = pokeDexId + ".png";
    else
      file = pokeDexId + "-" + formId + ".png";

    return path + file;
  }
}
