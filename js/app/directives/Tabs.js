var tab = {
  bindings: {
    label: '@'
  },
  require: {
    tabs: '^^tabs'
  },
  transclude: true,
  template: `
    <div class="tabs__content" ng-if="$ctrl.tab.selected">
      <div ng-transclude></div>
    </div>
  `,
  controller: function () {
    this.tab = {
      label: this.label,
      selected: false
    };
    this.$onInit = function () {
      this.tabs.addTab(this.tab);
    }
  }
};


var tabs = {
  bindings: {},
  transclude: true,
  controller: function () {
    this.tabs = [];
    this.addTab = function addTab(tab) {
      this.tabs.push(tab);
    };
    this.selectTab = function selectTab(index) {
      for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].selected = false;
      }
      this.tabs[index].selected = true;
    };
    this.$postLink = function () {
      this.selectTab(0);
    };
  },
  template: `
    <div class="tabs">
      <ul class="tabs__list">
        <li ng-repeat="tab in $ctrl.tabs">
          <a href="" 
            ng-bind="tab.label" 
            ng-click="$ctrl.selectTab($index);"></a>
        </li>
      </ul>
      <div class="tabs__content" ng-transclude></div>
    </div>
  `
};

angular
  .module('app')
  .component('tab', tab)
  .component('tabs', tabs);







