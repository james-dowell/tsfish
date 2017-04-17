import Home from './components/home';

export const app = () => {
    let wrapper = document.getElementById('app');
    let home = new Home(wrapper);
    console.log(home);
}

app();