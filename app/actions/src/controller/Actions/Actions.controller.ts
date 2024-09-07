import { Get, JsonController, Param, Params } from 'routing-controllers';
import ActionsService from './Actions.service';

@JsonController('/actions')
class ActionsController {
  private readonly actionsService = new ActionsService();

  @Get()
  async findByQuery(
    @Params()
    query: {
      shop_id: number;
      plu: string;
      date_from: Date;
      date_to: Date;
      action: string;
    },
  ) {}
}
