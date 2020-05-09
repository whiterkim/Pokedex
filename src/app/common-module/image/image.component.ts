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

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getUrl();
  }

  getUrl(): void {
    if (this.type === 'pokemon') {
      this.getPokemonImageUrl();
    } else if (this.type === 'pokemon-icon') {
      this.getPokemonImageUrl();
    } else if (this.type === 'item') {
      this.url = "assets/item/" + this.key + ".png";
    } else if (this.type === 'item-icon') {
      this.url = "assets/item-icon/" + this.key + ".png";
    }
  }

  async getPokemonImageUrl(): Promise<void> {
    if (this.pokemonId === undefined) {
      let pokemon = await this.pokemonService.getPokemonFromKey(this.key);
      this.pokemonId = pokemon.id;
    }

    this.url = ImageComponent.getImageURL(this.type, this.pokemonId);
  }

  static getImageURL(folder: string, id: number): string {
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
