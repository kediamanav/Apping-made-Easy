'use strict';

angular.module('appingApp')
  .factory('Currency',[function(){
    return[
      {'currency':'$'},
      {'currency':'€'},
      {'currency':'£'},
      {'currency':'₹'},
    ];
  }])

  .factory('Documents',[function(){
    return[
      {'doc':'Transcript'},
      {'doc':'Resume'},
      {'doc':'Diversity Essay'},
      {'doc':'SOP'},
      {'doc':'Writing sample'},
      {'doc':'Publication details'},
      {'doc':'Recommendations'}
    ];
  }])

  .factory('Universities', ['$resource',function ($resource) {

    return $resource('/api/universities/:id',null,{
      'update': {method: 'PUT'}
    });
    /*

    var last_id=5;

    var example_products = [
      {_id:1, name:'Stanford University', location: 'California', deadline: '8/12/15'},
      {_id:2, name:'MIT', location: 'Boston', deadline: '10/12/15'},
      {_id:3, name:'Illinois', location: 'Chicago', deadline: '15/12/15'},
      {_id:4, name:'Georgia Tech', location: 'Atlanta', deadline: '1/2/16'},
      {_id:5, name:'UT Austin', location: 'Texas', deadline: '12/12/15'}
    ];
    // Public API here
    return{
      query: function(){
        return example_products;
      },

      get: function(params){
        var result = {};
        angular.forEach(example_products,function(university){
          if(university._id== params.id)
            return this.university = university;
        }, result);
        return result.university;
      },

      delete: function(params){
        angular.forEach(example_products,function(university,index){
          if(university._id== params.id){
            console.log(university, index);
            example_products.splice(index,1);
            return;
          };
        });
      },

      create: function(university){
        university._id = ++last_id;
        example_products.push(university);
      },

      update: function(university){
        var college = this.get(university);
        if(!college) return false;

        item.name = university.name;
        item.location=university.location;
        item.deadline=university.deadline;
        return true;        
      }
    };*/

  }]);
