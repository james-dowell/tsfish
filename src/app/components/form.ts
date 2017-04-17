import {FISH} from '../fish-list';

export const FISH_ERROR = 'Please select some fish';
export const FISH_ENDPOINT = 'https://fishshop.attest.tech/compatibility';

interface IResponse {
    errorMessage?: string;
    canLiveTogether?: boolean;
}

export default class Form {

    public elem: HTMLElement;
    public fish: string[];
    public buyButton: HTMLButtonElement;
    public error: Element;

    constructor(
        elem: HTMLElement,
        fish: string[]
    ) {
        this.elem = elem;
        this.fish = fish;

        this.render();
    }

    public submit() {
        let values = this.getCheckboxValues();

        if (!values.length) {
            this.setError('Please select some fish');
            return;
        }

        let request = new window['Request'](FISH_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                fish: values
            })
        });

        window.fetch(request)
            .then((res) => res.json())
            .then((data: IResponse) => {
                this.buyButton.disabled = !data.canLiveTogether;

                if (data.errorMessage) {
                    this.setError(data.errorMessage);
                } else if (data.canLiveTogether === false) {
                    this.setError('These fish won\'t co-habitate');
                } else {
                    this.setError('');
                }
            });

    }

    public render() {
        let formWrapper = document.createElement('div');
        formWrapper.id = 'fish-form';
        formWrapper.className = 'form';

        this.error = document.createElement('div');
        this.error.className = 'error';

        this.buyButton = this.getButton('Buy fish', 'buy-fish');
        this.buyButton.disabled = true;

        let button = this.getButton('Check fish', 'check-fish');
        button.onclick = this.submit.bind(this);
        let checkboxes = this.getCheckboxInputs(this.fish);
        let inputWrapper = document.createElement('div');
        checkboxes.forEach(checkbox => inputWrapper.appendChild(checkbox));
        formWrapper.appendChild(inputWrapper);
        formWrapper.appendChild(button);
        formWrapper.appendChild(this.buyButton);
        formWrapper.appendChild(this.error);
        this.elem.appendChild(formWrapper);
    }

    private setError(error: string) {
        this.error.textContent = error;
    }

    private getCheckboxValues(): string[] {
        let checkboxes = this.elem.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        let selected: string[] = [];

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true) {
                selected.push(checkboxes[i].value);
            }
        }

        return selected;
    }

    private getInput(name: string): HTMLInputElement {
        let input = document.createElement('input');
        input.type = "checkbox";
        input.name = 'fish-input';
        input.value = name;
        input.id = name;
        return input;
    }

    private getLabel(name: string): HTMLLabelElement {
        let label = document.createElement('label');
        label.htmlFor = name;
        label.textContent = name;
        return label;
    }

    private getCheckboxInputs(data: string[]): Element[] {
        return data.map(fish => {
            let label = this.getLabel(fish);
            let input = this.getInput(fish);

            let control = document.createElement('div');
            control.className = 'form-control';
            control.appendChild(input);
            control.appendChild(label);
            return control;
        });
    }

    private getButton(text: string, id: string): HTMLButtonElement {
        let button = document.createElement('button');
        button.id = id;
        button.textContent = text;
        return button;
    }

}