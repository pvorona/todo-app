import angular from 'angular';

const key = 'todos';

class storage {
  get todos () {
    return angular.fromJson(localStorage.getItem(key) || []);
  }

  set todos (newTodos) {
    localStorage.setItem(key, angular.toJson(newTodos));
  }
}

export default storage;
