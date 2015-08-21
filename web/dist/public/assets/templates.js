(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/directives/debate.tpl.html',
    '<a ui-sref="statements.index({ id: debate.id })">\n' +
    '  <div class="debate">\n' +
    '    <div class="debate-score" ng-bind="debate.score"></div>\n' +
    '    <div class="debate-title" ng-bind="debate.title"></div>\n' +
    '  </div>\n' +
    '</a>');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/directives/score-indicator.tpl.html',
    '<div class="score-indicator">\n' +
    '  <div class="indicator-percentage support" ng-style="{ width: supportPercentage + \'%\', left: 0 }"></div>\n' +
    '  <div class="indicator-percentage opposition" ng-style="{ width: oppositionPercentage + \'%\', left: supportPercentage + \'%\' }"></div>\n' +
    '  <div class="indicator-percentage objection" ng-style="{ width: objectionPercentage + \'%\', left: supportPercentage+oppositionPercentage + \'%\' }"></div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/directives/statement.tpl.html',
    '<a ui-sref="responses.index({ id: statement.id, type: \'\' })">\n' +
    '  <div class="statement">\n' +
    '    <div class="statement-info">\n' +
    '      <div class="statement-score" ng-bind="statement.score"></div>\n' +
    '      <div class="response-type {{ statement.type }}" ng-bind="statement.type" ng-show="statement.type"></div>\n' +
    '      <score-indicator scores="statement.scores" />\n' +
    '    </div>\n' +
    '    <div class="statement-body" ng-bind="statement.body"></div>\n' +
    '    <div class="statement-vote">\n' +
    '        <button class="btn btn-primary" ng-class="{support:statement.upvoted}" ng-click="upvote($event)">+1</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</a>');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/pages/debates.tpl.html',
    '<ui-view />\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/pages/responses.tpl.html',
    '<div class="detail">\n' +
    '  <div class="context">\n' +
    '    <debate model="statement.debate"></debate>\n' +
    '    <div class="chain">\n' +
    '      <div ng-repeat="item in statement.chain">\n' +
    '        <statement model="item" />\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <statement model="statement" class="current"></statement>\n' +
    '  </div>\n' +
    '  <div class="controls container-fluid" ng-show="$state.is(\'responses.index\')">\n' +
    '    <div class="response-types">\n' +
    '      <a ui-sref="responses.index({ id: statement.id, type: toggle(\'support\') })" \n' +
    '         class="show-support btn btn-primary" ng-class="{active:responseType===\'support\'}">Supporting</a>\n' +
    '      <a ui-sref="responses.index({ id: statement.id, type: toggle(\'opposition\') })" \n' +
    '         class="show-opposition btn btn-primary" ng-class="{active:responseType===\'opposition\'}">Opposing</a>\n' +
    '      <a ui-sref="responses.index({ id: statement.id, type: toggle(\'objection\') })" \n' +
    '         class="show-objection btn btn-primary" ng-class="{active:responseType===\'objection\'}">Objections</a>\n' +
    '    </div>\n' +
    '    <div class="actions">\n' +
    '      <a ui-sref="responses.new({ id: statement.id, type: responseType })" ui-sref-active="active" \n' +
    '        class="new-response btn btn-primary action">Respond</a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <ui-view />\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/pages/statements.tpl.html',
    '<div class="detail">\n' +
    '  <div class="context">\n' +
    '    <div class="debate">\n' +
    '      <div class="debate-score" ng-bind="debate.score"></div> \n' +
    '      <div class="debate-title" ng-bind="debate.title"></div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="controls" ng-show="$state.is(\'statements.index\')">\n' +
    '    <a ui-sref="statements.index({ id: debate.id })" ui-sref-active="active" class="btn btn-primary">Statements</a>\n' +
    '    <div class="actions">\n' +
    '      <a ui-sref="statements.new({ id: debate.id })" ui-sref-active="active" \n' +
    '        class="new-statement btn btn-primary action">Submit a Statement</a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <ui-view />\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/routes/debates/index.tpl.html',
    '<ul class="clearfix debate-list">\n' +
    '  <li ng-repeat="debate in debates">\n' +
    '    <debate model="debate"></debate>\n' +
    '  </li>\n' +
    '</ul>\n' +
    '<button ui-sref="debates.new" id="new-debate" class="btn btn-primary">New Debate</button>');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/routes/debates/new.tpl.html',
    '<form id="create-debate-form" role="form">\n' +
    '  <input type="text" ng-model="title" class="form-control" id="debate-title" placeholder="new debate topic"></input>\n' +
    '  <button id="cancel-submit" class="btn btn-primary" ng-click="cancel()">Cancel</button>\n' +
    '  <button id="submit-debate" class="btn btn-primary selected" ng-disabled="!title" ng-click="submit()">Create Debate</button>\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/routes/responses/index.tpl.html',
    '<div class="statements">\n' +
    '  <statement model="statement" ng-repeat="statement in responses"></statement>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/routes/responses/new.tpl.html',
    '<form id="create-statement-form" name="NewResponseForm">\n' +
    '  <div class="response-type btn-group">\n' +
    '    <label class="btn btn-primary support" ng-class="{active:responseType==\'support\'}">\n' +
    '      <input type="radio" ng-model="responseType" name="responseType" value="support">Support</input>\n' +
    '    </label>\n' +
    '    <label class="btn btn-primary opposition" ng-class="{active:responseType==\'opposition\'}">\n' +
    '      <input type="radio" ng-model="responseType" name="responseType" value="opposition">Oppose</input>\n' +
    '    </label>\n' +
    '    <label class="btn btn-primary objection" ng-class="{active:responseType==\'objection\'}">\n' +
    '      <input type="radio" ng-model="responseType" name="responseType" value="objection">Object!</input>\n' +
    '    </label>\n' +
    '  </div>\n' +
    '\n' +
    '  <textarea id="statement-body" name="responseBody" ng-model="responseBody" \n' +
    '    placeholder="respond to this statement ..." class="form-control"></textarea>\n' +
    '\n' +
    '  <button id="cancel-submit" class="btn btn-primary" ng-click="cancel()">Cancel</button>\n' +
    '  <button id="submit-statement" class="btn btn-primary selected" \n' +
    '    ng-disabled="!responseType || !responseBody" ng-click="submit(NewResponseForm)">Submit</button>\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/routes/statements/index.tpl.html',
    '<div class="statements">\n' +
    '  <statement model="statement" ng-repeat="statement in debate.statements"></statement>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('thedebate.templates');
} catch (e) {
  module = angular.module('thedebate.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/routes/statements/new.tpl.html',
    '<form id="create-statement-form" class="form">\n' +
    '  <textarea id="statement-body" ng-model="body" placeholder="make a statement in this debate ..." class="form-control"></textarea>\n' +
    '  <button id="cancel-submit" class="btn btn-primary" ng-click="cancel()">Cancel</button>\n' +
    '  <button id="submit-statement" class="btn btn-primary selected" ng-disabled="!body" ng-click="submit()">Submit</button>\n' +
    '</form>');
}]);
})();
