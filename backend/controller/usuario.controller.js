const usuarioService = require('../services/usuario.service');

const cadastrarUsuario = async (req, res) => {
    const {nome, email, senha} = req.body;

    try{
        const usuario = await usuarioService.criarUsuario(nome, email, senha)
        res.status(201).json({usuario})
    }catch(error){
        console.log("Erro cadastrar usuário", error)
        res.status(500).json({erro: error.message})
    }
};

module.exports = {cadastrarUsuario};