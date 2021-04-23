'use strict';
(function()
{  
  // private convert anything to nullable
  const Nullable = (obj) =>
  {
    if (obj === null || obj === undefined)
    {
      return null;
    }
    return obj;
  };

  /**
   * Extracts a name from function pointer to allow refactoring.
   * @return {string}
   */
  Function.prototype.NameOf = function()
  {
    const parts = this.name?.split(' ');
    return parts[parts.length - 1];
  };

  /**
   * Returns true is a string is whitespace, empty or invalid
   * @param str {string}
   * @return {boolean}
   */
  String.IsNullOrWhitespace = (str) =>
  {    
    const whiteSpaceRegex = new RegExp('\\s+');
    const sstr = Nullable(str);
    if (sstr === null || (typeof sstr) !== 'string')
    {
      return true;
    }
    let ws = sstr.match(whiteSpaceRegex);

    return (sstr.length === 0 ||
        (ws && ws.length === sstr.length));
  };

  /**
   * Returns true is a string is empty or invalid
   * @param str {string}
   * @return {boolean}
   */
  String.IsNullOrEmpty = (str) =>
  {    
    const sstr = Nullable(str);
    if (sstr === null || (typeof sstr) !== 'string')
    {
      return true;
    }

    return (sstr.length === 0);
  };

  /**
   * Returns true is variable is null or invalid
   * @param str {string}
   * @return {boolean}
   */
  String.IsNull = (str) =>
  {    
    const sstr = Nullable(str);
    return sstr === null;
  };

  /**
   * Returns null if string is empty or invalid, otherwise returns the string
   * @param str {string}
   * @return {string|null}
   */
  String.EmptyToNull = (str) =>
  {
    if (String.IsNullOrEmpty(str))
    {
      return null;
    }
    return str;
  };

  /**
   * Returns null if string is empty, whitespace or invalid, otherwise returns the string
   * @param str {string}
   * @return {string|null}
   */
  String.WhitespaceToNull = (str) =>
  {
    if (String.IsNullOrWhitespace(str))
    {
      return null;
    }
    return str;
  };

  /**
   * Concatenates string values treating null values as empty strings
   * @param strs {array<string>}
   * @return {string}
   */
  String.Concat = (...strs) =>
  {
    if (!strs)
    {
      return '';
    }

    let res = '';
    for (let str of strs)
    {
      if (!str)
      {
        res += str.toString();
      }
    }
    return res;
  };

  /**
   * Compares two objects for equality but treats non-valid objects as null. Optional case-insensitive comparism for strings.
   * @param str {string}
   * @param other {string}
   * @param caseInsensitive {boolean}
   * @return {boolean}
   */
  String.Equals = (str, other, caseInsensitive = false) =>
  {    
    const sobj = Nullable(str);
    const sother = Nullable(other);

    if (typeof sobj !== typeof sother)
    {
      return false;
    }

    if (sobj === null && sother === null)
    {
      return false;
    }

    if (typeof sobj === 'string' && typeof sother === 'string')
    {
      if (caseInsensitive === true)
      {
        return sobj.toUpperCase() === sother.toUpperCase();
      }
      return sobj === sother;
    }

    return sobj === sother;
  };

  /**
   * Converts a standard date or datetime in US, ISO or EU format to javascript timestamp.
   * @param date {String}
   * @return {Number|null}
   */
  String.ToDateStamp = (date) =>
  {
    if (date instanceof Number)
    {
      return date;
    }

    const myregexp = /\d*[-./]\d*[-./]\d*/m;
    date = date.replace(' ', '');
    const match = myregexp.exec(date);
    if (match)
    {
      date = match[0];
    }
    else
    {
      console.warn('Date not detected in [' + date + '].');
      return null;
    }

    let parts = date.split('-');
    let format = 'iso';
    if (parts.length < 3)
    {
      parts = date.split('.');
      if (parts.length < 3)
      {
        parts = date.split('/');
        if (parts.length < 3)
        {
          console.warn('Date needs to have at least 3 parts.');
          return null;
        }
        else
        {
          format = 'us';
        }
      }
      else
      {
        format = 'eu';
      }
    }

    let y;
    let m;
    let d;

    if ((format === 'iso') || (format === 'eu'))
    {
      if (parts[0].length === 4)
      {
        y = parts[0];
        m = ('00' + parts[1]).slice(-2);
        d = ('00' + parts[2]).slice(-2);
      }
      else if (parts[2].length === 4)
      {
        y = parts[2];
        m = ('00' + parts[1]).slice(-2);
        d = ('00' + parts[0]).slice(-2);
      }
    }
    else if (format === 'us')
    {
      if (parts[0].length === 4)
      {
        y = parts[0];
        m = ('00' + parts[1]).slice(-2);
        d = ('00' + parts[2]).slice(-2);
      }
      else if (parts[2].length === 4)
      {
        y = parts[2];
        m = ('00' + parts[0]).slice(-2);
        d = ('00' + parts[1]).slice(-2);
      }
    }

    // modern browsers
    let pd = Date.parse(y + '-' + m + '-' + d + 'T00:00:00Z');
    if (!pd)
    {
      // ie8
      pd = Date.parse(m + '-' + d + '-' + y + 'Z');
    }
    return pd.valueOf();
  };

  /**
   * Parses an arbitrary string to one of thge supported types (string, int, long, float, decimal, double, guid, timestamp, date, datetime). Returns null if conversion is not possible.
   * @param type {String}
   * @param str {String}
   * @return {int|Number|string|null}
   */
  String.TryParse = (type, str) =>
  {        
    const s = Nullable(str);

    if (s === null)
    {
      return null;
    }

    if (String.Equals(type, 'int', true))
    {
      const intval = parseInt(s, 10);
      return isNaN(intval) ? null : intval;
    }

    if (String.Equals(type, 'long', true))
    {
      const intval = Number(s);
      return isNaN(intval) ? null : intval;
    }

    if (String.Equals(type, 'float', true) || String.Equals(type, 'decimal', true) || String.Equals(type, 'double', true))
    {
      const intval = Number(s);
      return isNaN(intval) ? null : intval;
    }

    if (String.Equals(type, 'guid', true))
    {
      const guid = s.replace(/([0-z]{8})([0-z]{4})([0-z]{4})([0-z]{4})([0-z]{12})/, '$1-$2-$3-$4-$5');
      return String.IsNullOrEmpty(guid) || (guid.length !== 36) ? null : guid;
    }

    if (String.Equals(type, 'timestamp', true))
    {
      const date = String.ToDateStamp(s);
      return String.IsNullOrEmpty(date) ? null : date;
    }
    
    if (String.Equals(type, 'date', true) || String.Equals(type, 'datetime', true))
    {
      const date = String.ToDateStamp(s);
      return String.IsNullOrEmpty(date) ? null : new Date(date);
    }

    throw `Could not convert value [${s}] to type [${type}].`;
  };

})();