import winston from 'winston';

const options: winston.LoggerOptions = {
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      format: winston.format.cli()
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' })
  ]
};

const Logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
  Logger.debug('Logging initialized at debug level');
}

export const stream = {
  write: (text: string) => {
    Logger.info(text);
  }
};

export default Logger;
