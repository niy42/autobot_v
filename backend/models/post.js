const { Model, DataTypes } = require('sequelize');

class Post extends Model {
    static associate(models) {
        // Define association here
        // Example: Post belongs to an Autobot
        this.belongsTo(models.Autobot, {
            foreignKey: 'autobotId',
            as: 'autobot'
        });

        // Example: Post has many Comments
        this.hasMany(models.Comment, {
            foreignKey: 'postId',
            as: 'comments'
        });
    }
}

module.exports = (sequelize) => {
    Post.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // Add more fields as necessary
    }, {
        sequelize,
        modelName: 'Post',
        tableName: 'Posts',
        timestamps: true
    });

    return Post;
};
