import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Trainer } from './models/trainer.model';
import { Pokemon } from './models/pokemon.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  apiUrl: string = 'http://pokedex-api.cleverapps.io/';
  accessToken: string = "";

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ) { }

  login(trainer: Trainer): Observable<any> {
    const url = this.apiUrl + "auth/login";
    return this.http.post<any>(url, trainer);
  }

  getTeam() {
    const url = this.apiUrl + "trainers/me/team";
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    });
    return this.http.get<any>(url, { headers: headers });
  }

  addPokemon(pokemon?: Pokemon) {
    const url = this.apiUrl + "trainers/me/team";
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    });

    return this.getTeam().pipe(
      switchMap(res => {
        let team = res;
        let message: string;

        if (team.length < 6) {
          team.push(pokemon?.id);
          message = pokemon?.name + " a été ajouté à l'équipe !";
        }
        else 
          message = "L'équipe est déjà pleine !";

        return this.http.put<any>(url, team, { headers: headers }).pipe(
          tap(() => {
            this._snackBar.open(message, "Fermer", {
              duration: 5000,
              panelClass: 'notification',
              verticalPosition: 'bottom',
              horizontalPosition: 'end'
            });
          }),
        );
      })
    )
  }

  removePokemon(index: number) {
    const url = this.apiUrl + "trainers/me/team";
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.accessToken,
    });

    return this.getTeam().pipe(
      switchMap(res => {
        let team = res;

        team.splice(index, 1);

        return this.http.put<any>(url, team, { headers: headers });
      })
    )    
  }
}
