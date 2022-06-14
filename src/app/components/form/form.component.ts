import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'game-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public gameForm!: FormGroup;

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
  }

  public onSubmit(): void {
    const formValue = this.gameForm.value;
    const name = formValue['name'];
    const description = formValue['description'];
    const player1 = formValue['player1'];
    const player2 = formValue['player2'];
    console.log(name, description, player1, player2);
  }

}