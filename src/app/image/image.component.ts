import { Component, OnInit, Input } from '@angular/core';
import { Utility } from '../utility';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-image',
  inputs: ['id', 'key', 'type', 'height'],
  templateUrl: './image.component.html',
})
export class ImageComponent implements OnInit {
  @Input()
  id: number;
  @Input()
  key: string;
  @Input()
  type: string;
  @Input()
  height: number;
  url: string;

  constructor(
    private pokemonService: PokemonService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.id === undefined) {
      let pokemon = await this.pokemonService.getPokemonFromKey(this.key);
      this.id = pokemon.id;
    }

    this.url = Utility.getImageURL(this.type, this.id);
  }
}
