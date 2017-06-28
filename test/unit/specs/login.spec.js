import Vue from 'vue';
import login from '../../../src/components/login/login.vue'

describe('login', () => {
  it('has a created hook', () => {
    expect(typeof login.created).toBe('function');
  });
});
