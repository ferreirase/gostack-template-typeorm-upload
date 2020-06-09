// import AppError from '../errors/AppError';

// import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute(): Promise<string> {
    return 'passou';
  }
}

export default CreateTransactionService;
