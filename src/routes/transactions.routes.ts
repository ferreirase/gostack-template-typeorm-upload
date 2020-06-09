import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = new TransactionsRepository();
  const transactions = await transactionsRepository.getAll();

  return response.status(200).json({
    transactions,
  });
});

transactionsRouter.post('/', async (request, response) => {
  const transactionsService = new CreateTransactionService();

  const newTransaction = await transactionsService.execute({
    title: request.body.title,
    value: request.body.value,
    type: request.body.type,
    category: request.body.category,
  });

  return response.status(201).json(newTransaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
