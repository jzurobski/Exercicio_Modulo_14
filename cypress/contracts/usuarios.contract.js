const Joi_usuarios = require ('joi')

const usuariosSchema = Joi_usuarios.object({
    quantidade: Joi_usuarios.number(), 
    usuarios: Joi_usuarios.array().items({
        nome: Joi_usuarios.string(),
        email: Joi_usuarios.string(),
        password: Joi_usuarios.string(),
        administrador: Joi_usuarios.boolean(),
        _id: Joi_usuarios.string()
    })
})
export default usuariosSchema;


