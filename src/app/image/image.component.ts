import { Component, OnInit, Input } from '@angular/core';
import { Utility } from '../utility';
import { PokemonService } from '../service/pokemon.service';

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

  async getUrl(): Promise<void> {
    if (this.pokemonId === undefined) {
      let pokemon = await this.pokemonService.getPokemonFromKey(this.key);
      this.pokemonId = pokemon.id;
    }

    this.url = Utility.getImageURL(this.type, this.pokemonId);
  }
}
