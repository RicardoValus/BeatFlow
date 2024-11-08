import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod'; //Comentário: Como eu configurei a API no environment.prod, devo importar de lá
import { Music } from '../models/music.model';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  private url = environment.api

  constructor(
    private httpClient: HttpClient //Comentário: o angular vai preencher (injetar dependencia) nesta variavel httpClient com a importação
  ) { }


  obterMusicas() { //Comentário: vai fazer um request pra API pra retornar as musicas que estão no db.json

    return this.httpClient.get<Music[]>(this.url + '/musics'); //Comentário: dentro de maior e menor <>, especificar o tipo do que está vindo da API, no caso importamos o Music que é a model | E ai é onde montamos a url para acessar o /musics da API onde estão os dados

  }

}
