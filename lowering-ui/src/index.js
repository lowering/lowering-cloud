import dva from 'dva';
import { error as onError } from './utils';
import './index.less';

// 1. Initialize
const app = dva({
    onError
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/global'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
