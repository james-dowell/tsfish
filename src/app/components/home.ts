import {FISH} from '../fish-list';
import Form from './form';

export default class Home {

    public elem: HTMLElement;

    constructor(elem: HTMLElement) {
        this.elem = elem;

        this.render();
    }

    public render() {
        let wrapper = document.createElement('div');
        wrapper.classList.add('l-constrain');
        this.elem.appendChild(wrapper);

        let form = new Form(wrapper, FISH);
    }

}