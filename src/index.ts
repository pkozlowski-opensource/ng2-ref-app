import {Component, View, bootstrap} from 'angular2/angular2';

@Component({selector: 'ng2-ref-app'})
@View({template: `
    <h1>Hello, {{name}}!</h1>
    <input type="text" [value]="name" (input)="name = $event.target.value">
`})
class Ng2RefApp {
    name = 'Angular2';
}

bootstrap(Ng2RefApp);