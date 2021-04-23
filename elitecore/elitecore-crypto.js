'use strict';
(function()
{    
  /**
   * Create a cryptographically-strong random number
   * @param min {int}
   * @param max {int}
   * @return {int}
   */
  Crypto.RandomInt = (min, max) =>
  {
    const byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    const range = max - min + 1;
    const max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
      return Crypto.RandomInt(min, max);
    return min + (byteArray[0] % range);
  } 

})();