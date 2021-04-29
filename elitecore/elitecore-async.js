'use strict';
(function()
{
  /**
   * Wait for a delay asynchronously.
   * @param delay {int}
   * @return {Promise}
   */
  Promise.Delay = (delay) =>
  {
    return new Promise(resolve => {
      setTimeout(() => { resolve(''); }, delay);
    });
  };

})();