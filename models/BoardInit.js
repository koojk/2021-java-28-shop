module.exports = (sequelize, { DataTypes, Op }) => {
  const BoardInit = sequelize.define(
    'BoardInit',
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      boardType: {
        type: DataTypes.ENUM,
        values: ['D', 'G'],
        defaultValue: 'D',
        allowNull: false,
      },
      useImg: {
        type: DataTypes.ENUM,
        values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        allowNull: false,
        defaultValue: '0',
      },
      useFile: {
        type: DataTypes.ENUM,
        values: ['0', '1', '2'],
        allowNull: false,
        defaultValue: '0',
      },
      useComment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      tableName: 'boardinit',
      paranoid: true,
    }
  );
  return BoardInit;
};
