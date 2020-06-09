import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  category: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction | string> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getRepository(Transaction);
    const categoryLowed = category.toLowerCase();

    const result = await categoryRepository.findOne({
      where: {
        title: categoryLowed,
      },
    });

    if (result) {
      const newTransaction = transactionRepository.create({
        title,
        value,
        type,
        category_id: result.id,
      });

      await transactionRepository.save(newTransaction);

      return newTransaction;
    }

    const newCategory = categoryRepository.create({
      title: categoryLowed,
    });

    await categoryRepository.save(newCategory);

    const newTransaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: newCategory.id,
    });

    await transactionRepository.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
