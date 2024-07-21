"use strict";

class MasterRepository {
  constructor(model) {
    this.model = model;
  }

  count(query) {
    return this.model.find(query).countDocuments().exec();
  }

  /**
   * @description Function to use all data from a collection
   * @returns {Promise<>}
   */
  findAll() {
    return this.model.find();
  }

  /**
   * @description Function used to find a document by id
   * @param {string} _id
   * @param {{}} projection
   * @returns {Promise<>}
   */
  findById(_id, projection) {
    return this.model.findById(_id, projection).exec();
  }

  /**
   * @description Function used to find one document
   * @param {string} query
   * @param {{}} projection
   * @returns {Promise<>}
   */
  findOne(query, projection) {
    return this.model.findOne(query, projection).exec();
  }

  /**
   * @description Function to save/insert and return the save data
   * @param {Object} data
   * @returns {Promise<>}
   */
  save(data) {
    const saveData = new this.model(data);
    return saveData.save();
  }

  /**
   * @description Function to insert multiple items in the collection
   * @param {Object} data
   * @returns {Promise<>}
   */
  insertMany(data) {
    return this.model.insertMany(data);
  }

  /**
   * @description Function use to find the item with sort, skip and limit
   * @param {Object} query
   * @param {number} skip
   * @param {number} limit
   * @param {Object} projection
   * @param {Object} sortBy
   * @returns {Promise<>}
   */
  list(query, skip, limit, projection, sortBy) {

    return this.model
      .find(query, projection)
      .sort(sortBy || { createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  /**
   * @description Function to soft delete an item by id
   * @param {String} _id
   * @returns {Promise<>}
   */
  delete(_id) {
    return this.model.updateOne({ _id: _id }, { is_deleted: true }).exec();
  }

  /**
   * @description Function to soft delete an item by query
   * @param {Object} query
   * @returns
   */
  deleteMany(query) {
    return this.model.update(query, { is_deleted: true }).exec();
  }

  /**
   * @description Function to hard delete an item by _id
   * @param {String} _id
   * @returns {Promise<>}
   */
  hardDelete(_id) {
    return this.model.deleteOne({ _id: _id }).exec();
  }

  /**
   * @description Function to update an item by id
   * @param {string} _id
   * @param {{}} fields
   * @returns
   */
  update(_id, fields) {
    return this.model.updateOne({ _id: _id }, fields).exec();
  }

  /**
   * @description Function to update an item by query
   * @param {{}} query
   * @param {{}} fields
   * @returns
   */
  updateOne(query, fields) {
    return this.model.updateOne(query, fields).exec();
  }

  /**
   * @description Function to update multiple items
   * @param {{}} query
   * @param {{}} fields
   * @returns
   */
  updateMany(query, fields) {
    return this.model.updateMany(query, fields).exec();
  }

  /**
   * @description Function to update an item by query and return the updated object
   * @param {{}} query
   * @param {{}} fields
   * @returns
   */
  findOneAndUpdate(query, fields) {
    return this.model.findOneAndUpdate(query, fields).exec();
  }
}

export default MasterRepository;
