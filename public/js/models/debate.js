DebateApp.Debate = DS.Model.extend({
  title: DS.attr('string')
});

DebateApp.Debate.FIXTURES = [
  {
    id: 1,
    title: 'vi vs Emacs'
  },
  {
    id: 2,
    title: 'Static vs Dynamic Typing'
  },
  {
    id: 3,
    title: 'Corn or husk?'
  }
];