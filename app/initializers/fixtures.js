import debateFixture from '../fixtures/debate';
import statementFixture from '../fixtures/statement';

export default {
  name: 'fixtures',

  initialize: function() {
    debateFixture.create();
    statementFixture.create();
  }
};
