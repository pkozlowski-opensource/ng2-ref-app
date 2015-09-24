import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'greeter',
    properties: ['name']
})
@View({template: `
    <h1>Hello, {{name}}!</h1>
    <input type="text" [value]="name" (input)="name = $event.target.value">
`})
export class Greeter {
    name: string;
}