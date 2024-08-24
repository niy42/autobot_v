const { Model } = require('sequelize');

class Autobot extends Model {
    static associate(models) {
        // Define association here
        // Example: Autobot has many Posts
        this.hasMany(models.Post, {
            foreignKey: 'autobotId',
            as: 'posts'
        });
    }
}

module.exports = (sequelize, DataTypes) => {
    Autobot.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // Add more fields as necessary
    }, {
        sequelize,
        modelName: 'Autobot',
        tableName: 'Autobots',
        timestamps: true
    });

    return Autobot;
};
