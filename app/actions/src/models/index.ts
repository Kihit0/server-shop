import { Sequelize } from 'sequelize';
import config from '../config/index';

const development = config.development;

//@ts-ignore
const sequelize = new Sequelize(development);

export default sequelize;
