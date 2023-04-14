import { Component, Input } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { TrainerService } from '../trainer.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  @Input() id?: number;
  pokemon?: Pokemon;
  message?: string;
  
  constructor(
    //private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private trainerService: TrainerService,
  ) { }

  ngOnInit() {
    this.trainerService.login(environment.trainer).subscribe(
      res => this.trainerService.accessToken = res.access_token
    );    
  }

  ngOnChanges(): void {
    this.pokemon = undefined;
    this.getPokemon();
  }

  getPokemon() {
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id)
      this.pokemonService.getPokemon(this.id).subscribe(pokemon => this.pokemon = pokemon);
  }

  addPokemonToTeam() {
    this.trainerService.addPokemon(this.pokemon).subscribe();
  }
}
