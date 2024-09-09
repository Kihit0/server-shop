import { Op } from 'sequelize';
import Actions from '../../models/Actions';
import { bodyCreate, findQuery } from './Actions.controller';

class ActionsService {
  private readonly actions = Actions;

  async findByQuery(query: findQuery) {
    if (!Object.keys(query)) {
      return {
        message: 'Bad request',
        status: 400,
      };
    }

    const whereConditions = new Map<string, any>();

    if (query.date_from && query.date_to) {
      whereConditions.set('date', {
        [Op.between]: [query.date_from, query.date_to],
      });
    } else if (query.date_from || query.date_to) {
      return {
        message: 'Bad request',
        status: 400,
      };
    }

    const where = {
      ...query,
      ...Object.fromEntries(whereConditions),
    };

    return {
      data: (
        await this.actions.findAll({
          where,
        })
      ).map((item) => item.dataValues),
    };
  }

  async create(body: bodyCreate) {
    const requiredKeys = ['shop_id', 'action', 'on_shelf', 'in_order', 'plu'];

    if (!body || !requiredKeys.every((key) => key in body)) {
      return {
        message: 'Bad request',
        status: 400,
      };
    }

    return this.actions.create({ ...body, date: new Date() });
  }
}

export default ActionsService;
