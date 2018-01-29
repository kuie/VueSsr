module.exports = {
  webpack: (config, options, webpack) => {
    console.log(config)
    console.log(options)
    //{ env: 'production' }
    console.log(webpack)
    config.entry.main = './server/index.js'
    return config
  }
}
