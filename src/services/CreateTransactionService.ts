import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (!title) throw Error('Title is required');
    if (!value) throw Error('Value is required');
    if (!type) throw Error('Type is required');
    if (type !== 'income' && type !== 'outcome') throw Error('Invalid type');

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total)
      throw Error('There are not enough funds');

    const repository = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return repository;
  }
}

export default CreateTransactionService;
