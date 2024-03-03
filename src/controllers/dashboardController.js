// ---------------------------------
// Backend Controller for Fashboard
// ---------------------------------

const model = require('../../models');
const Consume = model.Consume;
const Freeday = model.Freeday;
const Event = model.Event;
const applicationHelper = require('../helpers/applicationHelper.js');
const {Op} = require('sequelize');

const dashboardController = {
    dashboard: async (req, res) => {
        const consume = await Consume.findAll({
            include: [{
                model: Freeday,
                required: true,
            }]
        })

        let all = [];
        let byratehigh = [];
        let byratelow = [];
        consume.forEach(element => {
            let high = 0;
            let low = 0;
            let sum = 0;
            (element.Freedays).forEach(el => {
                let rate1 = parseInt(el.rate1);
                let rate2 = parseInt(el.rate2);
                let rate3 = parseInt(el.rate3);
                let rate4 = parseInt(el.rate4);
                let rate5 = parseInt(el.rate5);

                high += rate4 + rate5;
                low += rate1 + rate2;
                sum += (rate1)+(rate2 * 2)+(rate3 * 3)+(rate4 * 4)+(rate5 * 5);
            })
            all.push({img: element.img_url, name: element.name, type: element.type, summary: sum});
            byratehigh.push({img: element.img_url, name: element.name, type: element.type, rate: high});
            byratelow.push({img: element.img_url, name: element.name, type: element.type, rate: low});
        });

        const event = await Event.findAll({
            include: [{
                model: Freeday,
                required: true,
                limit: 1
            }]
        });

        let events = [];
        event.forEach(element => {
            let rate1 = parseInt(element.Freedays[0].rate1);
            let rate2 = parseInt(element.Freedays[0].rate2);
            let rate3 = parseInt(element.Freedays[0].rate3);
            let rate4 = parseInt(element.Freedays[0].rate4);
            let rate5 = parseInt(element.Freedays[0].rate5);

            let sum = (rate1)+(rate2)+(rate3)+(rate4)+(rate5);

            events.push({name: element.name, date: element.date, presence: sum})
        })

        let allsort = all.sort(applicationHelper.compare_sum);
        let byratehighsort = byratehigh.sort(applicationHelper.compare_rate);
        let byratelowsort = byratelow.sort(applicationHelper.compare_rate);
        let eventsort = events.sort(applicationHelper.compare_presence);

        res.status(200).send({message: 'Success', allsort, byratehighsort, byratelowsort, eventsort})
    }
}

module.exports = dashboardController;