import { Component, EventEmitter, Output } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  @Output() pokemonId = new EventEmitter<number>();
  pokemons: Pokemon[] = [];
  offset: number = 0;
  limit: number = 20;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe(res => {
      this.pokemons = this.pokemons.concat(...res.data); // this.pokemons.push(...res.data);
      this.offset += res.limit;
    });
  }

  onScroll() {
    this.getPokemons();
  }

  setPokemonId(id: number) {
    this.pokemonId.emit(id);
  }

  searchPokemon(input: string) {
    this.pokemons = [];
    this.offset = 0;
    
    if (input.length == 0)
      this.getPokemons();
    else
      this.pokemonService.getPokemonsBySearch(input).subscribe(res => this.pokemons = res.data);
  }
}
