'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _summoners = require('./dist/models/summoners');

Object.keys(_summoners).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _summoners[key];
    }
  });
});

var _matchlists = require('./dist/models/matchlists');

Object.keys(_matchlists).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _matchlists[key];
    }
  });
});

var _leagues = require('./dist/models/leagues');

Object.keys(_leagues).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _leagues[key];
    }
  });
});

var _matches = require('./dist/models/matches');

Object.keys(_matches).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _matches[key];
    }
  });
});

var _customResponse = require('./dist/models/custom-response.model');

Object.keys(_customResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _customResponse[key];
    }
  });
});

var _customResponseException = require('./dist/models/custom-response-exception.model');

Object.keys(_customResponseException).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _customResponseException[key];
    }
  });
});