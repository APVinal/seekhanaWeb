import React, {Component} from 'react';
import {connect} from 'react-redux';

class Lessons extends Component {
  componentWillMount(){
    //one dispatch to grab the user
    //one dispatch to grab the lessons

  }
  render(){
    return (
      <section>
      <div>
        <a href={'/api/auth/logout'}><button>Log Out</button></a>
      </div>
      <div>
        Lessons will be here
      </div>
      </section>
    );
  }
}

const mapStatetoProps = state => ({

});

export default connect(mapStatetoProps)(Lessons);