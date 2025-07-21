import { setupServer } from 'msw/node';
import { animesHandlers } from '../mocks/handlers/animesHandlers';

export const server = setupServer(...animesHandlers);