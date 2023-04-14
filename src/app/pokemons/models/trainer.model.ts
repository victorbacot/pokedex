import { Pokemon } from "./pokemon.model";

export interface Trainer {
    email: string;
    password: string;
    team?: Pokemon[];
}