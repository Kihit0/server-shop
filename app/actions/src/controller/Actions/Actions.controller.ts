import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParams,
} from 'routing-controllers';
import ActionsService from './Actions.service';

@JsonController('/actions')
class ActionsController {
  private readonly actionsService = new ActionsService();

  @Get()
  async findByQuery(@QueryParams() query: findQuery) {
    return await this.actionsService.findByQuery(query);
  }

  @Post()
  async create(@Body() body: bodyCreate) {
    return await this.actionsService.create(body);
  }
}

export default ActionsController;

export type findQuery = {
  shop_id?: number;
  plu?: string;
  date_from?: Date;
  date_to?: Date;
  action?: string;
};

export type bodyCreate = {
  shop_id: number;
  action: string;
  on_shelf: number;
  in_order: number;
  plu: string;
};
