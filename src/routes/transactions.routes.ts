/* eslint-disable no-param-reassign */
import { Router } from 'express';
import multer from 'multer';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import uploadConfig from '../config/upload';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = new TransactionsRepository();
  const transactions = await transactionsRepository.getAll();

  transactions.map(transaction => delete transaction.category_id);

  const balance = await transactionsRepository.getBalance();

  return response.status(200).json({
    transactions,
    balance,
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

/*
transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
}); */

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();

    const newsTransactions = await importTransactionsService.execute({
      fileName: request.file.filename,
    });

    return response.status(200).json(newsTransactions);
  },
);

export default transactionsRouter;
