import { assert } from 'chai';
import awesomeFunction from '../src/awesomeModule';

describe('Awesome test.', () => {
  it('should test awesome function', () => {
    assert(awesomeFunction() === true, 'Not awesome :(');
  });
});
