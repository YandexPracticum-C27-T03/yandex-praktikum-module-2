const fs = require('fs')

fs.copyFileSync('.env.template', '.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })
