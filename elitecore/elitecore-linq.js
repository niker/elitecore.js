'use strict';
(function()
{
  /**
   * Implements Linq Where function
   * @param constraint {Function}
   * @return {Array}
   * @constructor
   */
  Array.prototype.QWhere = function(constraint)
  {
    const array = this;
    let res = [];
    if (!array)
    {
      return res;
    }

    for (let item of array)
    {
      if (!constraint || constraint(item) === true)
      {
        res.push(item);
      }
    }
    return res;
  };

  /**
   * Implements Linq Any function
   * @param constraint {Function}
   * @return {Boolean}
   * @constructor
   */
  Array.prototype.QAny = function(constraint)
  {
    const array = this;
    if (!array)
    {
      return false;
    }

    if (!constraint)
    {
      return array.length > 0;
    }

    for (let item of array)
    {
      if (constraint(item) === true)
      {
        return true;
      }
    }
    return false;
  };

  /**
   * Implements Linq All function
   * @param constraint {Function}
   * @return {Boolean}
   * @constructor
   */
  Array.prototype.QAll = function(constraint)
  {
    const array = this;
    if (!array)
    {
      return false;
    }

    if (!constraint)
    {
      throw 'Array.QAll() requires a constraint.';
    }

    for (let item of array)
    {
      if (constraint(item) !== true)
      {
        return false;
      }
    }
    return true;
  };

  /**
   * Implements Linq Any function
   * @param constraint {Function}
   * @return {Number}
   * @constructor
   */
  Array.prototype.QCount = function(constraint)
  {
    const array = this;
    if (!array)
    {
      return 0;
    }

    if (!constraint)
    {
      return array.length;
    }

    let i = 0;
    for (let item of array)
    {
      if (constraint(item) === true)
      {
        i++;
      }
    }
    return i;
  };

  /**
   * Implements Linq FirstOrDefault function
   * @param constraint {Function}
   * @return {Boolean}
   * @constructor
   */
  Array.prototype.QFirstOrDefault = function(constraint)
  {
    const array = this;
    if (!array || array.length === 0)
    {
      return null;
    }

    if (!constraint)
    {
      return array[0];
    }

    for (let item of array)
    {
      if (constraint(item) === true)
      {
        return item;
      }
    }
    return null;
  };

  /**
   * Implements Linq FirstOrDefault function that returns index instead of value
   * @param constraint {Function}
   * @return {int}
   * @constructor
   */
  Array.prototype.QFirstIndex = function(constraint)
  {
    const array = this;
    if (!array || array.length === 0)
    {
      return null;
    }

    if (!constraint)
    {
      return null;
    }

    let i = 0;
    for (let item of array)
    {
      if (constraint(item) === true)
      {
        return i;
      }
      i++;
    }
    return null;
  };

  /**
   * Implements Linq OrderBy function
   * @param orderProperty {Function}
   * @param descending {Boolean}
   * @return {Array}
   * @constructor
   */
  Array.prototype.QOrderBy = function(orderProperty, descending = false)
  {
    const array = this;
    let res = [];
    if (!array)
    {
      return res;
    }

    let extractedProperty = [];
    for (let item of array)
    {
      extractedProperty.push(orderProperty(item));
    }
    extractedProperty.sort();
    if (descending)
    {
      extractedProperty.reverse();
    }

    for (let key of extractedProperty)
    {
      for (let item of array)
      {
        if (orderProperty(item) === key)
        {
          res.push(item);
        }
      }
    }
    return res;
  };

  /**
   * Implements Linq RemoveAll function
   * @param constraint {Function}
   * @return {Array}
   * @constructor
   */
  Array.prototype.QRemoveAll = function(constraint)
  {
    const array = this;
    let res = [];
    if (!array)
    {
      return res;
    }

    if (!constraint)
    {
      return array;
    }

    for (let item of array)
    {
      if (constraint(item) !== true)
      {
        res.push(item);
      }
    }

    return res;
  };

})();