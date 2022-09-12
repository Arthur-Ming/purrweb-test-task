import Form from './components/Form';
import CookiesNotification from './components/CookiesNotification';
import './scss/app.scss';
/* 
const root = document.getElementById('root');

root && root.append(new CookiesNotification().render()); */

const formRoot = document.getElementById('form-root');

formRoot && formRoot.append(new Form().render());
