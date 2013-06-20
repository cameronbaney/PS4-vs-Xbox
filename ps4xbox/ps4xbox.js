Votes = new Meteor.Collection("votes");

if (Meteor.isClient) {
  Template.voting.votes = function () {
    return Votes.find();
  };

  Template.voting.events({
    'click .vote' : function () {
      Votes.update(this._id, {$inc: {score: 1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Votes.find().count() === 0) {
      var names = ["PS4","Xbox"];
      for (var i = 0; i < names.length; i++)
        Votes.insert({name: names[i], score: 0});
    }
  });
}