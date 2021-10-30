import * as httpService from './httpService'

process.on('SIGINT', () => {
    console.log('Closing service')
    httpService.close()
})

httpService.start();

