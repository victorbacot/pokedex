import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { TeamComponent } from './pokemons/team/team.component';

const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokemons', component: PokemonListComponent },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  { path: 'pokemons/:id', component: PokemonDetailComponent },
  { path: 'login', component: TeamComponent },
  { path: 'team', component: TeamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
