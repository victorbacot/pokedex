import { Component } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { Trainer } from '../models/trainer.model';
import { TrainerService } from '../trainer.service';
import { forkJoin, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  apiUrl: string = 'http://pokedex-api.cleverapps.io/auth/login';
  trainer: Trainer = { ...environment.trainer };

  constructor(
    private pokemonService: PokemonService,
    private trainerService: TrainerService,
  ) {}

  ngOnInit() {
    this.trainerService.login(this.trainer).subscribe(
      res => {
        this.trainerService.accessToken = res.access_token;
        this.getTeam();
      }
    );
  }

  getTeam() {
    this.trainerService.getTeam().subscribe(
      team => {
        if (team.length) {
          const observables: Observable<Pokemon>[] = [];
          team.forEach((pokemon: number) => observables.push(this.pokemonService.getPokemon(pokemon)));
          forkJoin(observables).subscribe(res => this.trainer.team = res);
        }
        else
          delete this.trainer.team;
      }
    );
  }

  removePokemonFromTeam(index: number) {
    this.trainerService.removePokemon(index).subscribe(() => this.getTeam());
  }
}
