import { Router, macro } from '@stricjs/router';

export default new Router()
  .get('/', macro('Hi client'));
