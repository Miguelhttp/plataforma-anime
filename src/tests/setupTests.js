import '@testing-library/jest-dom';
import { server } from './server';

// Inicia o MSW antes de todos os testes
beforeAll(() => server.listen());

// Reseta os handlers entre testes (caso tenha override)
afterEach(() => server.resetHandlers());

// Encerra o MSW após todos os testes
afterAll(() => server.close());
