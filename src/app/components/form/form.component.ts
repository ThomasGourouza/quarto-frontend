import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostGame } from 'src/app/models/post-game';
import { FormService } from 'src/app/services/form.service';


@Component({
  selector: 'game-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter<PostGame>();
  gameForm!: FormGroup;
  disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.gameForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        player1: ['', Validators.required],
        player2: ['', Validators.required]
        // translation: [{ value: '', disabled: true }, Validators.required]
      }
    );
    this.gameForm.controls['name'].valueChanges.subscribe((name) => {
      // TODO: check si le nom existe
      console.log(name);
    });
    this.gameForm.controls['player1'].valueChanges.subscribe((player1) => {
      console.log(player1);
    });
    this.gameForm.controls['player2'].valueChanges.subscribe((player2) => {
      console.log(player2);
    });
    this.formService.disabled$.subscribe((value) => this.disabled = value);
  }

  onSubmit(): void {
    if (!this.disabled) {
      this.formService.setDisabled(true);
      const formValue = this.gameForm.value;
      const name = formValue['name'];
      const description = formValue['description'];
      const player1 = formValue['player1'];
      const player2 = formValue['player2'];
      this.formSubmit.emit({ name, description, player1, player2 });
    }
  }

}