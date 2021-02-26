import { Sequelize } from 'sequelize-typescript';
import models from '../models/_index';
import { DB_URL, configDB } from '../config/database.config';

const sequelize = new Sequelize(DB_URL, configDB)

// ADD MODELS HERE FROM MODEL'S _index.ts
sequelize.addModels(models)

export default sequelize;