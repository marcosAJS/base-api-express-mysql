require('dotenv').config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Router } from 'express';
import './database';
import ValidationError from './exceptions/ValidationError';
import * as routes from './routes/_index';
import path from 'path';
import { Request, Response, NextFunction } from "express";

const _logResponseTime = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log("%s : %fms", req.path, elapsedTimeInMs);
  });

  next();
}

class App {
  public app: Application;
  public router: Router;
  public _stats: any;

  constructor() {

    this.app = express();
    this.router = express.Router();

    this.app.use(_logResponseTime);
    this.setConfig();

    this.initRoutes(this.router);

    
    this.app.use('/', this.router);
    
    this.app.use('/public/', express.static(path.join(__dirname, '../public')))

    // 404
    this.app.use(function (req, res, next) {
      console.log('ROUTE NOT FOUND: ', req.url);
      if (!req.route)
        return res.status(404).json({ message: 'Not Found: ' + req.url });
      next();
    })

    // error
    this.app.use(function (err, req, res, next) {
      const status = (err.name === ValidationError.name) ? 400 : 500;
      res.status(status).send({ message: err.message });
    });
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    //Enables cors
    this.app.use(cors());
  }

  private initRoutes(app: Router) {
    routes.initRoutes(app);
  }
}

export default new App().app;
