const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
    static associate(models) {
        // Define association here
        // Example: Comment belongs to a Post
        this.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post'
        });
    }
}

module.exports = (sequelize) => {
    Comment.init({
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // Add more fields as necessary
    }, {
        sequelize,
        modelName: 'Comment',
        tableName: 'Comments',
        timestamps: true
    });

    return Comment;
};
