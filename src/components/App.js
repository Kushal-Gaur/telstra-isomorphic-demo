import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { IndexPage } from './IndexPage';
import { AthletePage } from './AthletePage';
import { NotFoundPage } from './NotFoundPage';
import athletes from '../data/athletes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [], dataEmpty: 0, flag: false
    };
  }

  RecallIncident(){
     $.ajax({
       type: 'GET',
       url: 'http://localhost:4000/incidents',
       dataType: 'json',
       success: function(res) {
         console.log(`Data received ${res}`);
         this.setState({incidents: res, dataEmpty: res.length, flag: true });
       }.bind(this),
       async: true,
       error: function() {
      }
    });
  };

  componentDidMount(){
  this.RecallIncident();
  };

  render() {
         return(
           <div>

            <div>              
             <Link to="/createIncident"></Link>
              {this.state.incidents}
             </div>
             
           </div>
           );
    }
}

// export const App = () => (
//   <Layout>
//     <Switch>
//       <Route exact path="/" render={renderIndex} />
//       <Route exact path="/athlete/:id" render={renderAthlete} />
//       <Route component={NotFoundPage} />
//     </Switch>
//   </Layout>
// );

export default App;
