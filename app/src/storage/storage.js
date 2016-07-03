import angular from 'angular';

class storage {
  getItem (key) {
    return angular.fromJson(localStorage.getItem(key) || []);
  }

  setItem (key, value) {
    localStorage.setItem(key, angular.toJson(value));
  }

  removeItem (key) {
    localStorage.removeItem(key);
  }
}

export default storage;
