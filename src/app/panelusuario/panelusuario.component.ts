import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-panelusuario',
  templateUrl: './panelusuario.component.html',
  styleUrls: ['./panelusuario.component.css']
})
export class PanelusuarioComponent implements OnInit {
  player: any;
  playerForm: any;
  showForm = false;
  showMatchForm: boolean[] = [];

  constructor(private fb: FormBuilder, public playerService: PlayerService) { }

  ngOnInit(): void {
    this.player = this.playerService.getPlayer();
    this.playerForm = this.fb.group({
      age: [this.player.age, Validators.required],
      city: [this.player.city, Validators.required],
      level: [this.player.level, Validators.required],
      matchResult: ['', Validators.required]
    });

    // Inicializa showMatchForm con todos los valores en false
    this.showMatchForm = new Array(this.player.matches.length).fill(false);
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  toggleMatchForm(index: number) {
    this.showMatchForm[index] = !this.showMatchForm[index];
  }

  updateProfile() {
    if (this.playerForm.valid) {
      console.log(this.playerForm.value);
      // Aquí puedes enviar los datos del formulario a tu backend para actualizar el perfil del usuario
    }
  }

  updateMatchResult(index: number) {
    const result = this.playerForm.value.matchResult;
    if (result) {
      this.player.matches[index].result = result;
      console.log(this.player.matches[index]);
      // Aquí puedes enviar los datos del partido actualizado a tu backend
    }
  }
}