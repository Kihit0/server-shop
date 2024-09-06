import { Sequelize } from 'sequelize';
import config from '../../config/index.js';

const development = config.development;

const sequelize = new Sequelize(development);

export default sequelize;
