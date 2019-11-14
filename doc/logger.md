# how to use logger

```
npm i winston
```

# import the logger

```
const {logger} = require('your_path/common/logger')
```
# use

```
logger.info(`string infomation`);
logger.error(`error string`);
```
# log files
logger will auto create logs directory in your root and write files to it.
you should ignore the logs directory.

# reference
https://github.com/winstonjs/winston

