const Sequelize = require("sequelize");

module.exports = class Block extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        miner: {
          type: Sequelize.STRING(42),
        },
        difficulty: {
          type: Sequelize.STRING(16),
        },
        mixHash: {
          type: Sequelize.STRING(66),
        },
        number: {
          type: Sequelize.STRING(16),
          unique: true,
        },
        logsBloom: {
          type: Sequelize.TEXT,
        },
        gasLimit: {
          type: Sequelize.STRING(16),
        },
        gasUsed: {
          type: Sequelize.STRING(16),
        },
        timestamp: {
          type: Sequelize.STRING(32),
        },
        extraData: {
          type: Sequelize.STRING(100),
        },
        nonce: {
          type: Sequelize.STRING(64),
        },
        hash: {
          type: Sequelize.STRING(66),
        },
        parentHash: {
          type: Sequelize.STRING(66),
        },
        receiptsRoot: {
          type: Sequelize.STRING(66),
        },
        sha3Uncles: {
          type: Sequelize.STRING(66),
        },
        size: {
          type: Sequelize.STRING(16),
        },
        stateRoot: {
          type: Sequelize.STRING(66),
        },
        totalDifficulty: {
          type: Sequelize.STRING(16),
        },
        transactions: {
          type: Sequelize.JSON,
        },
        transactionsRoot: {
          type: Sequelize.STRING(66),
        },
        uncles: {
          type: Sequelize.JSON,
        },
      },
      {
        sequelize,
        modelName: "Block",
        tableName: "block",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(db) {
    db.Block.hasMany(db.Transaction, {
      sourceKey: "number",
      foreignKey: "BlockNumber",
    });
  }
};
