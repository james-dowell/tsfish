import Form, {FISH_ERROR} from './form';

const expect: Chai.ExpectStatic = chai.expect;

describe('Form tests', () => {

    let form: Form;
    let element: HTMLElement;
    let mockFish: string[];

    beforeEach(() => {
        element = document.createElement('div');
        element.id = 'app';
        mockFish = ['fish1', 'fish2'];
        window.fetch = sinon.stub();
        window['Request'] = sinon.stub();

        form = new Form(element, mockFish);
    });

    describe('rendering elements', () => {

        it('should render checkbox elements for each fish in the fish list', () => {
            let checkboxList: NodeListOf<Element> = element.querySelectorAll('input[type="checkbox"]');
            expect(checkboxList).to.have.lengthOf(mockFish.length);
        });

        it('should render a label for each checkbox', () => {
            let fish1Label = element.querySelector('label[for=fish1]');
            expect(fish1Label).to.exist;
            expect(fish1Label.textContent).to.equal('fish1');
        });

        it('should have a method which renders a button', () => {
            let button = element.querySelector('#check-fish');
            expect(button).to.exist;
            expect(button.textContent).to.equal('Check fish');
        });

        it('should render a buy button', () => {
            let button = element.querySelector('#buy-fish') as HTMLButtonElement;
            expect(button).to.exist;
            expect(button.textContent).to.equal('Buy fish');
            expect(button.disabled).to.be.true;
        });

    });

    describe('submitting the form', () => {

        it('should make a request to the correct endpoint when the Check fish button is pressed', () => {
            let promise = new Promise((resolve, reject) => {
                resolve({ data: { canLiveTogether: true } });
            });
            window.fetch['returns'](promise);

            let checkbox = element.querySelector('#fish1') as HTMLInputElement;
            checkbox.checked = true;
            form.submit();
            expect(window.fetch).to.have.been.calledOnce;

            expect(window['Request']).to.have.been.calledOnce
                .and.calledWith('https://fishshop.attest.tech/compatibility', {
                    method: 'POST',
                    body: JSON.stringify({ fish: ['fish1'] })
                });
        });

        it('should set the buy button to be enabled', (done) => {
            let promise = new Promise((resolve, reject) => {
                resolve({ json: () => ({ canLiveTogether: true }) });
            });
            window.fetch['returns'](promise);
            let checkbox = element.querySelector('#fish1') as HTMLInputElement;
            checkbox.checked = true;
            form.submit();

            promise
                .then((res: any) => res.json())
                .then(() => {
                    let button = element.querySelector('#buy-fish') as HTMLButtonElement;
                    expect(button.disabled).to.be.false;
                    done();
                });
        });

        it('should prevent the form from submitting if no fish are selected', () => {
            form.submit();
            expect(window.fetch).to.not.have.been.called;
        });

    });

});