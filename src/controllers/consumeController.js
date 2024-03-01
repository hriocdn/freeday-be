// ---------------------------------
// Backend Controller for Event
// ---------------------------------

const model = require('../../models');
const Consume = model.Consume;
const {Op} = require('sequelize');

const consumeController = {
    index: async (req, res, next) => {
        try{
            const name = req.query.name || ''

            const consumes = await Consume.findAll({
                where: {
                    name: {
                        [Op.like]: '%'+name+'%'
                    }
                }
            });

            res.status(200).send({consumes})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    index_name: async (req, res, next) => {
        try{
            const consumes = await Consume.findAll({
                where: {
                    name: {
                        [Op.iLike] : req.query.name
                    }
                }
            });

            res.status(200).send({consumes})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    show: async (req, res, next) => {
        try{
            const id_consume = req.params.consume;
            const consume = await Consume.findOne({
                where: {id: id_consume}
            })

            res.status(200).send({message: 'Success', consume})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Create
    create: async (req, res, next) => {
        try{
            let data = {
                name: req.body.name,
                type: req.body.type
            }

            const consume = await Consume.create(data)
            res.status(200).send({message: 'Success', consume})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Update
    update: async (req, res, next) => {
        try{
            let data = {
                name: req.body.name,
                type: req.body.type
            }

            const consume = await Consume.update(data,
                {
                    where: {
                        id: req.body.id
                    }
                })
            res.status(200).send({message: 'Success', consume})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Update
    update_img: async (req, res, next) => {
        try{
            if (req.file == undefined) {
                return res.status(400).send("Please upload a image file!");
            }
            let path = req.file.filename;
            let data = {
                img_url: path
            }

            const consume = await Consume.create(data)

            return res.status(200).send({message: 'Success', consume})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    }
}

module.exports = consumeController;