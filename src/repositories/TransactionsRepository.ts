import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getAll(): Promise<Array<Transaction>> {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    return transactions;
  }

  public async getBalance(): Promise<Balance> {
    // TODO
  }
}

export default TransactionsRepository;
