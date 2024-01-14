import { render } from './react.js';

export default {
    createRoot: (container) => {
        return {
            render: (el) => {
                render(el, container);
            }
        }
    }
}