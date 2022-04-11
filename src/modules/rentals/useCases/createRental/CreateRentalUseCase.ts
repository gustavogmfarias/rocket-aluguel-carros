import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expect_return_date,
  }: IRequest): Promise<void> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );
    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const userOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (userOpenRental) {
      throw new AppError('There is a rental in progress for user! ');
    }
  }
}

export { CreateRentalUseCase };