import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

const formats = [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`;
  })
];

if (!isProd) {
  formats.unshift(winston.format.colorize());
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(...formats),
  transports: [new winston.transports.Console()]
});

export const morganStream = {
  write: message => logger.info(message.trim())
};
