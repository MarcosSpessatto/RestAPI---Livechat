import {Meteor} from 'meteor/meteor';
import modules from '../imports/rest-api/modules/index';

Meteor.startup(() => {
  modules(Router, Match, check);
});



