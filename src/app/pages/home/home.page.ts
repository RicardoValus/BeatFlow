import { Component, inject, OnInit } from '@angular/core';
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
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';


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
    MatCardModule,
    MatRippleModule,

    //Utilidades:
    CommonModule, //Comentário: Precisa importar isso para poder usar o async no html
    FormsModule,


  ],
})
export class HomePage implements OnInit {

  public add: boolean = false;
  public testArray: string[] = ['teste1', 'teste2', 'teste3'];
  private _snackBar = inject(MatSnackBar);

  // musicas: Music[] = [];
  public musicas$ = new Observable<Music[]>(); //Comentário: usar $ para informar que a variavel é observable

  //Forms
  id = '';
  title = ''; //Comentário: Nome da musica
  artist = '';
  album = '';
  year = '';
  url = '';

  constructor(
    private musicService: MusicService,
  ) {
    this.obterMusicasCadastradas();
  }

  ngOnInit(): void {
    this.abrirAvisoSnackBar()
  }

  obterMusicasCadastradas() {
    // this.musicService.obterMusicas()
    //   .subscribe(musicas => { //Comentário: A variavel musicas da arrow function é um array de Music (model)
    //     this.musicas = musicas //Comentário: O this está acessando o valor da variavel e atraibuindo para o musicas lá de cima que é usado no FOR
    //   }); //Comentário: .subscribe (to me inscrevendo na função de requisição de obterMusicas do service que retorna um observable)

    this.musicas$ = this.musicService.obterMusicas(); //Comentário: não é necessário usar o .subscribe acima, o ideia é com o observable que estamos montando aqui

  }



  cadastrarMusica() {
    if (!this.title || !this.artist) {
      return
    }

    this.musicService.cadastrarMusica({
      id: this.id,
      title: this.title,
      artist: this.artist,
      album: this.album,
      year: this.year,
      url: this.url
    }).subscribe(() => this.obterMusicasCadastradas())
    // Comentário: na hora que clicar em cadastrarMusica, vai executar o cadastrarMusica do service passando essas propriedades, e na hora que voltar requisição que deu createComponent, então irá executar o obterMusicasCadastradas, vai jogar no observable um novo array de musics
  }

  // editarMusica(musica: Music) {
  //   this.id = musica.id!.toString();
  //   this.title = musica.title;
  // }

  abrirAdd() {
    this.add = !this.add;
  }

  abrirLinkMusica(url: string): void {
    window.open(url, '_blank');
  }

  abrirAvisoSnackBar() {
    this._snackBar.open('Clique em uma música para ouvir', 'Fechar', {
      duration: 10000
    });

  }

}
