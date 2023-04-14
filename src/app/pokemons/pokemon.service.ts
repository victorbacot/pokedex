import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData } from './models/paged-data.models';
import { Pokemon } from './models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemonsUrl: string = 'http://pokedex-api.cleverapps.io/pokemons';

  constructor(private http: HttpClient) { }

  getPokemons(offset: number, limit: number): Observable<PagedData<Pokemon>> {
    const url = this.pokemonsUrl + `?offset=${offset}&limit=${limit}`;
    return this.http.get<PagedData<Pokemon>>(url);
  }

  getPokemonsBySearch(input: string): Observable<PagedData<Pokemon>> {
    const url = this.pokemonsUrl + `?search=${input}`;
    return this.http.get<PagedData<Pokemon>>(url);
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = this.pokemonsUrl + `/${id}`;
    return this.http.get<Pokemon>(url);
  }
}
