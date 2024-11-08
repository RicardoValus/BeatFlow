import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MusicService } from 'src/app/services/music.service';
import { Music } from 'src/app/models/music.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [

    //Material:
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,




    //Utilidades:
    CommonModule //Comentário: Precisa importar isso para poder usar o async no html

  ],
})
export class HomePage {

  public add: boolean = false;


  public testArray: string[] = ['teste1', 'teste2', 'teste3'];

  // musicas: Music[] = [];
  musicas$ = new Observable<Music[]>(); //Comentário: usar $ para informar que a variavel é observable

  constructor(
    private musicService: MusicService,
  ) {
    this.obterMusicasCadastradas();
  }

  obterMusicasCadastradas() {
    // this.musicService.obterMusicas()
    //   .subscribe(musicas => { //Comentário: A variavel musicas da arrow function é um array de Music (model)
    //     this.musicas = musicas //Comentário: O this está acessando o valor da variavel e atraibuindo para o musicas lá de cima que é usado no FOR
    //   }); //Comentário: .subscribe (to me inscrevendo na função de requisição de obterMusicas do service que retorna um observable)

    this.musicas$ = this.musicService.obterMusicas(); //Comentário: não é necessário usar o .subscribe acima, o ideia é com o observable que estamos montando aqui

  }



  abrirAdd() {
    this.add = !this.add;
  }

}
