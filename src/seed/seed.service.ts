import { Injectable } from '@nestjs/common';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    private readonly pokemonSvc: PokemonService,
  ) {}

  async executeSeed() {
    const data = await this.http.get<any>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const id = +segments[6];
      return {
        name,
        no: id,
      };
    });
    await this.pokemonSvc.seedDB(pokemons);
    return 'Seed Executed';
  }
}
