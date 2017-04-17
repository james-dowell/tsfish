import Home from './home';
import {FISH} from '../fish-list';

const expect: Chai.ExpectStatic = chai.expect;

describe('Home tests', () => {

    let home: Home;
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement('div');
        element.id = 'app';

        home = new Home(element);
    });

    it('should render a form compoenent', () => {
        let formComponent = element.querySelector('#fish-form');
        expect(formComponent).to.exist;
    });

});