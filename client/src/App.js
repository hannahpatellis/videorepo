import React from 'react';
import { Container, Header, Grid, Button, Icon, Item, Dropdown, Image, Input } from 'semantic-ui-react'
import VideoEntry from './components/VideoEntry';
const moment = require('moment');
const logo = require('./videorepo.png');
const API = require('./util/API');

class App extends React.Component {
  state = {
    repo: [],
    subcategories: [],
    lessons: [],
    classes: [],
    curricula: [],
    selectedSubcategory: '',
    selectedLesson: '',
    selectedClass: '',
    selectedCurriculum: '',
    currentDisplay: [],
    auth: false,
    token: '',
    password: '',
    error: false
  }

  handleChange = (e, data) => {
    this.setState({ [data.dataField]: data.value });
  }

  // handleFilter = () => {
  // }

  handleAuth = () => {
    console.log(this.state.password);
    API.default.preformAuth(this.state.password)
      .then(authData => {
        console.log(authData);
        if (authData.data.auth) {
          API.default.getData(authData.data.token)
            .then(data => {
              const newRepo = this.sortByDate(data.data.repo);
              this.setState({
                repo: data.data.repo,
                subcategories: data.data.subcategories,
                lessons: data.data.lessons,
                classes: data.data.classes,
                curricula: data.data.curricula,
                currentDisplay: newRepo,
                auth: true,
                token: authData.data.token
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.error(authData.data);
          this.setState({ error: true });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handlePasswordChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleAuth();
    }
  }

  sortByDate = (toSort) => {
    let newRepo = toSort;
    newRepo.sort((a, b) => {
      const aDate = moment(a.date, 'YY-MM-DD').format('LL');
      const bDate = moment(b.date, 'YY-MM-DD').format('LL');
      return new Date(bDate) - new Date(aDate);
    });
    return newRepo;
  }

  render() {
    return (
      <div>
        {this.state.auth ? (
          <div>
            <Container>
              <Grid>
                <Grid.Row>
                  <Grid.Column key={1}>
                    <Image src={logo} size='small' centered />
                    <Header as='h2' textAlign='center'>
                      <Header.Content>Hannah Patellis' Coding Video Library</Header.Content>
                    </Header>
                    <p className="center-text">This is the private video library of development instructor Hannah Patellis.<br />Videos in this library include in-class recordings and supplemental videos.</p>
                    <p className="center-text">This page is still in development.</p>
                  </Grid.Column>
                </Grid.Row>

                <hr />

                <Grid.Row>
                  <Grid.Column key={1}>
                    <Header as='h4'>Filter results</Header>
                    <Dropdown placeholder='Class' search selection options={this.state.classes} className='filter-option' dataField='selectedClass' onChange={this.handleChange} />
                    <Dropdown placeholder='Lesson' search selection options={this.state.lessons} className='filter-option' dataField='selectedLesson' onChange={this.handleChange} />
                    <Dropdown placeholder='Subcategory' search selection options={this.state.subcategories} className='filter-option' dataField='selectedSubcategory' onChange={this.handleChange} />
                    <Dropdown placeholder='Curriculum' search selection options={this.state.curricula} className='filter-option' dataField='selectedCurriculum' onChange={this.handleChange} />
                    <Button color='blue' floated='right' icon labelPosition='right'>Filter <Icon name='right chevron' /></Button>
                  </Grid.Column>
                </Grid.Row>

                <hr />

                <Grid.Row>
                  <Grid.Column key={1}>
                    <Item.Group divided>
                      {this.state.currentDisplay.map(e => (
                        <VideoEntry e={e} />
                      ))}
                    </Item.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        ) : (
            <div className="password-holder">
              <Image src={logo} size='small' centered />
              {this.state.error ? (<p>Password is incorrect</p>) : ('')}
              <Input
                className='password-input'
                icon={<Icon name='chevron right' onClick={this.handleAuth} inverted circular link />}
                onChange={this.handlePasswordChange}
                value={this.state.password}
                onKeyPress={this.handleKeyPress}
                name='password'
                type='password'
                placeholder='Password'
              />
            </div>
          )}
      </div>
    );
  }
}

export default App;