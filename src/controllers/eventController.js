// ---------------------------------
// Backend Controller for Event
// ---------------------------------

const model = require('../../models');
const Event = model.Event;
const {Op} = require('sequelize');

const eventController = {
    index: async (req, res, next) => {
        try{
            const name = req.query.name || ''
            const events = await Event.findAll({
                where: {
                    name: {
                        [Op.like]: '%'+name+'%'
                    }
                }
            });

            res.status(200).send({events})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    show: async (req, res, next) => {
        try{
            const id_event = req.params.event;
            const event = await Event.findOne({
                where: {id: id_event}
            })

            res.status(200).send({message: 'Success', event})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Create
    create: async (req, res, next) => {
        try{
            let data = {
                name: req.body.name,
                date: req.body.date
            }

            let check = await Event.findOne({
                where: data
            })

            if (check){
                throw new Error('Event Already Existed !!!');
            }

            const event = await Event.create(data)
            res.status(200).send({message: 'Success', event})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Update
    update: async (req, res, next) => {
        try{
            let data = {
                name: req.body.name,
                date: req.body.date
            }

            const event = await Event.update(data,
                {
                    where: {
                        id: req.body.id
                    }
                })
            res.status(200).send({message: 'Success', event})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    }
}

module.exports = eventController;