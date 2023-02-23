const Sequelize = require("sequelize");

module.exports = class Transaction extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        hash: {
          type: Sequelize.STRING(66),
        },
        nonce: {
          type: Sequelize.STRING(64),
        },
        blockHash: {
          type: Sequelize.STRING(66),
        },
        // blockNumber: {
        //   type: Sequelize.STRING(64),
        // },
        transactionIndex: {
          type: Sequelize.STRING(64),
        },
        from: {
          type: Sequelize.STRING(44),
        },
        to: {
          type: Sequelize.STRING(44),
        },
        value: {
          type: Sequelize.STRING(64),
        },
        gas: {
          type: Sequelize.STRING(16),
        },
        gasPrice: {
          type: Sequelize.STRING(64),
        },
        input: {
          type: Sequelize.STRING(64),
        },
        type: {
          type: Sequelize.STRING(64),
        },
        chainId: {
          type: Sequelize.STRING(64),
        },
        v: {
          type: Sequelize.STRING(64),
        },
        r: {
          type: Sequelize.STRING(128),
        },
        s: {
          type: Sequelize.STRING(128),
        },
      },
      {
        sequelize,
        modelName: "Transaction",
        tableName: "transaction",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(db) {
    db.Transaction.belongsTo(db.Block, {
      targetKey: "number",
      foreignKey: "BlockNumber",
    });
  }
};
