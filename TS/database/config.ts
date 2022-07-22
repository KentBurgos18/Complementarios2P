const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env['DB_HORARIO'])
        console.log(`Base de datos ejecutándose sin problema`)
    } catch (error) {
        console.log(error)
        throw new Error(`Base de datos no disponible`)
    }
}

export {
    dbConnection
}