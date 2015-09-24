import {Component, View, bootstrap} from 'angular2/angular2';
import {Greeter} from './greeter';

@Component({selector: 'ng2-ref-app'})
@View({
    template: `<greeter name="World"></greeter>`,
    directives: [Greeter]
})
class Ng2RefApp {
}

bootstrap(Ng2RefApp);