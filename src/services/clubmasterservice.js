const ClubMaster = require('../models').wallet_club_master;
const Op = require('sequelize').Op

class ClubMasterService {

    getClubDetails(req, res) {
        return new Promise((resolve, reject) => {

            let where = {}

            if (req.body.clubId) {
                where.club_id = req.body.clubId;
            }

            if (req.body.clubName) {
                where.club_name = req.body.clubName;
            }

            return ClubMaster.findAndCountAll({
                where: where,
                offset: req.body.offset || 0,
                limit: req.body.limit || 50,
                order: [
                    ['club_entry_point', 'ASC']
                ]
            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }

    createClub(req) {
        var date = new Date();
        var dateStr =
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + "-" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);

        return new Promise((resolve, reject) => {
            let cnd = {
                where: {
                    club_name: { [Op.like]: `%${req.body.clubName}%` },
                    club_entry_point: req.body.clubEntryPoint
                }
            }
            return ClubMaster.findAll(cnd).then((result) => {
                if (result.length <= 0) {
                    return ClubMaster.create({
                        club_name: req.body.clubName,
                        club_entry_point: req.body.clubEntryPoint,
                        status: 1,
                        created_at: dateStr
                    }).then(result => {
                        resolve(result);
                    })
                        .catch(error => reject(error));
                } else {
                    let errResp = {
                        statusCode: 101,
                        status: false,
                        message: 'Club name already exists',
                        data: []
                    }
                    resolve(errResp);
                }

            })
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }

    updateClub(req, res) {

        var date = new Date();
        var dateStr =
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + "-" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);

        return new Promise((resolve, reject) => {

            let where = {};
            let data = {};

            if (req.body.clubId) {
                where.club_id = req.body.clubId;
            }

            if (req.body.clubName) {
                data.club_name = req.body.clubName;
            }

            if (req.body.clubEntryPoint) {
                data.club_entry_point = req.body.clubEntryPoint;
            }

            if (req.body.status) {
                data.status = req.body.status;
            }

            data.updated_at = dateStr;

            return ClubMaster.update(data, {
                where: where,

            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }

    deleteClub(req, res) {
        return new Promise((resolve, reject) => {

            let where = {};

            if (req.body.clubId) {
                where.club_id = req.body.clubId;
            }

            return ClubMaster.destroy({
                where: where
            }).then(result => resolve(result))
                .catch(error => reject(error));
        })
            .catch(err => {
                return (err.message)
            })
    }
}

module.exports = ClubMasterService;