import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    private readonly pokemonSvc: PokemonService,
    private readonly configService: ConfigService,
  ) {}

  async executeSeed() {
    const env = this.configService.get('environment');
    if (env !== 'dev') return 'Only executed in DEV Enviroment';
    const limit = this.configService.get('limit');
    const pokeapi = this.configService.get('pokeapi');
    const data = await this.http.get<any>(`${pokeapi}?limit=${limit}`);
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
