// ---------------------------------
// Backend Controller for Event
// ---------------------------------

const model = require('../../models');
const Event = model.Event;
const Freeday = model.Freeday;
const Consume = model.Consume;
const {Op} = require('sequelize');

const freedayController = {
    index: async (req, res, next) => {
        try{
            const freedays = await Freeday.findAll({
                include: [{
                    model: Event,
                    required: true,
                    where: {
                        name: {
                            [Op.like]: '%'+req.query.name+'%'
                        }
                    }
                }],
                group: ['id_event']
            });

            res.status(200).send({freedays})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    show: async (req, res, next) => {
        try{
            const id_event = req.params.event;
            const freeday = await Freeday.findAll({
                where: {id_event: id_event},
                include: [{
                    model: Consume,
                    required: true,
                }]
            })

            const event = await Event.findOne({
                where: {id: id_event}
            })

            res.status(200).send({message: 'Success', freeday, event})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Create
    create: async (req, res, next) => {
        try{
            let ids = req.body.id_arr;
            let event = req.body.id_event;

            let check = await Freeday.findOne({
                where: {
                    id_event: event.id
                }
            })

            if (check){
                console.log('hi')
                throw new Error('Event Already Existed !!!');
            }

            ids.forEach(async element => {
                if (element.inList === true){
                    const fdc = await Freeday.create({
                        id_event: event.id,
                        id_consume: element.id,
                        rate1: 0,
                        rate2: 0,
                        rate3: 0,
                        rate4: 0,
                        rate5: 0,
                        status: false
                    })
                }
            });
            
            res.status(200).send({message: 'Success'})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Update
    update: async (req, res, next) => {
        try{
            let ids = req.body.id_arr;
            let event = req.body.id_event;
            console.log(event)

            let todestroy = await Freeday.findAll({
                where: {
                    id_event: event
                }
            })

            todestroy.forEach(async el => {
                let items = await Freeday.findOne({
                    where: {
                        id: el.id
                    }
                })

                let status = await items.destroy()
            })

            

            ids.forEach(async element => {
                if (element.inList === true){
                    const fdc = await Freeday.create({
                        id_event: event,
                        id_consume: element.id,
                        rate1: 0,
                        rate2: 0,
                        rate3: 0,
                        rate4: 0,
                        rate5: 0,
                        status: false
                    })
                }
            });
            res.status(200).send({message: 'Success', event})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Update Rate
    update_rate: async (req, res, next) => {
        try{
            let ids = req.body.id_con;
            let event = req.body.id_event;
            let rate = req.body.rate;
            

            let item = await Freeday.findOne({
                where: {
                    id_event: event,
                    id_consume: ids
                }
            })

            if (!item){
                throw new Error('Event Not Found !!!');
            }

            let data = {
                id_event: event,
                id_consume: ids,
                rate1: item.rate1,
                rate2: item.rate2,
                rate3: item.rate3,
                rate4: item.rate4,
                rate5: item.rate5
            }

            if (rate === 'rate1'){
                data = {
                    id_event: event,
                    id_consume: ids,
                    rate1: item.rate1+1,
                    rate2: item.rate2,
                    rate3: item.rate3,
                    rate4: item.rate4,
                    rate5: item.rate5
                }
            }else if (rate === 'rate2'){
                data = {
                    id_event: event,
                    id_consume: ids,
                    rate1: item.rate1,
                    rate2: item.rate2+1,
                    rate3: item.rate3,
                    rate4: item.rate4,
                    rate5: item.rate5
                }
            }else if (rate === 'rate3'){
                data = {
                    id_event: event,
                    id_consume: ids,
                    rate1: item.rate1,
                    rate2: item.rate2,
                    rate3: item.rate3+1,
                    rate4: item.rate4,
                    rate5: item.rate5
                }
            }else if (rate === 'rate4'){
                data = {
                    id_event: event,
                    id_consume: ids,
                    rate1: item.rate1,
                    rate2: item.rate2,
                    rate3: item.rate3,
                    rate4: item.rate4+1,
                    rate5: item.rate5
                }
            }else if (rate === 'rate5'){
                data = {
                    id_event: event,
                    id_consume: ids,
                    rate1: item.rate1,
                    rate2: item.rate2,
                    rate3: item.rate3,
                    rate4: item.rate4,
                    rate5: item.rate5+1
                }
            }

            let update = await item.update(data);
            res.status(200).send({message: 'Success', update})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
    // Update Status
    update_status: async (req, res, next) => {
        try{
            let event = req.body.id_event;

            let check = await Freeday.findOne({
                where: {
                    id_event: event
                }
            })

            if (!check){
                throw new Error('Check Not Found !!!');
            }

            let item = await Freeday.update({
                status: true
            },{
                where: {
                    id_event: event,
                }
            })

            res.status(200).send({message: 'Success', item})
        }catch(e){
            res.status(400).send({error: e.message});
        }
    },
}

module.exports = freedayController;