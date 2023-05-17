import {render} from "../test-utils";
import {BrowserRouter} from 'react-router-dom';
import App from '../app/App';

describe('should renders index', () => {

    it('should renders index', () => {
        const root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);

        const index = render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );

        expect(root).toBeInTheDocument();
        expect(index).toMatchSnapshot();
    });
});