import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Music } from 'src/app/models/music.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from 'src/app/services/music.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-music',
  templateUrl: './edit-music.page.html',
  styleUrls: ['./edit-music.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,

    //Material:
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,



    //Utilidades:
    ReactiveFormsModule,
    FormsModule,


  ]
})
export class EditMusicPage implements OnInit {

  public music: Music = { id: '', title: '', artist: '', album: '', year: '', url: '' };

  private _snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private router: Router,
    private location: Location //Comentário: do angular common
  ) { }

  ngOnInit() {
    // Comentário: Obtém o valor do parâmetro 'id' da URL da musica
    const musicId = this.route.snapshot.paramMap.get('id');
    if (musicId) {
      // Comentário: Chama o serviço para obter os dados da música com base no 'id' e, ao receber a resposta,
      // Comentário: atribui os dados da música clicada à variável 'this.music' pra listar
      this.musicService.obterMusicaPorId(musicId).subscribe(musica => this.music = musica);
    }
  }

  atualizarMusica() {
    this.musicService.editarMusica(this.music).subscribe(() => { //Comentário: passando os dados digitados no form do html como parametro para o service
      this.router.navigate(['/home']);
      this.abrirAvisoSnackBar();
    });
  }

  navegarParaTras() {
    this.location.back(); // Comentário: Volta para a página anterior
  }

  abrirAvisoSnackBar() {
    this._snackBar.open('Musica atualizada com sucesso!', 'Fechar', {
      duration: 3000
    });
  }

}
