import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostGame } from 'src/app/models/post-game';


@Component({
  selector: 'game-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public gameForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<PostGame>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
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
  }

  public onSubmit(): void {
    const formValue = this.gameForm.value;
    const name = formValue['name'];
    const description = formValue['description'];
    const player1 = formValue['player1'];
    const player2 = formValue['player2'];
    this.formSubmit.emit({ name, description, player1, player2 });
  }

}