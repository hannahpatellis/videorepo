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
    this.setState({ [data.datafield]: data.value });
  }

  handleFilter = () => {
    let selectedSubcategory = this.state.selectedSubcategory;
    let selectedLesson = this.state.selectedLesson.split('.');
    let selectedClass = this.state.selectedClass;
    let selectedCurriculum = this.state.selectedCurriculum;
    let newCurrentDisplay = [];

    if(selectedSubcategory) {
      newCurrentDisplay = this.state.repo.filter(e => e.subcategory.includes(selectedSubcategory));
    } else {
      newCurrentDisplay = this.state.repo;
    }

    if(selectedClass) {
      newCurrentDisplay = newCurrentDisplay.filter(e => e.class === selectedClass);
    }

    if(selectedCurriculum) {
      newCurrentDisplay = newCurrentDisplay.filter(e => e.curriculum === selectedCurriculum);
    }

    if(selectedLesson.length > 1) {
      newCurrentDisplay = newCurrentDisplay.filter(e => e.unit === parseInt(selectedLesson[0]) && e.lesson === parseInt(selectedLesson[1]));
    }

    const newRepo = this.sortByDate(newCurrentDisplay);
    this.setState({ currentDisplay: newRepo });
  }

  handleAuth = () => {
    API.default.preformAuth(this.state.password)
      .then(authData => {
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
              console.error(err);
            });
        } else {
          console.error(authData.data);
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: true });
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
                      <Header.Content>Hannah Patellis' Instructional Video Library</Header.Content>
                    </Header>
                    <p className='center-text'>This is the private video library of web application development and UX/UI instructor Hannah Patellis.<br />Videos in this library include in-class lecture recordings and supplemental videos.</p>
                  </Grid.Column>
                </Grid.Row>

                <hr />

                <Grid.Row>
                  <Grid.Column key={1}>
                    <Header as='h4'>Filter results</Header>
                    <Dropdown 
                      placeholder='Class' 
                      search 
                      selection 
                      clearable
                      options={this.state.classes} 
                      className='filter-option' 
                      datafield='selectedClass' 
                      onChange={this.handleChange} />
                    <Dropdown
                      placeholder='Lesson' 
                      search 
                      selection 
                      clearable
                      options={this.state.lessons} 
                      className='filter-option' 
                      datafield='selectedLesson' 
                      onChange={this.handleChange} />
                    <Dropdown 
                      placeholder='Subcategory' 
                      search 
                      selection 
                      clearable
                      options={this.state.subcategories} 
                      className='filter-option' 
                      datafield='selectedSubcategory' 
                      onChange={this.handleChange} />
                    <Dropdown 
                      placeholder='Curriculum' 
                      search 
                      selection 
                      clearable
                      options={this.state.curricula} 
                      className='filter-option' 
                      datafield='selectedCurriculum'
                      onChange={this.handleChange} />
                    <Button color='blue' floated='right' icon labelPosition='right' onClick={this.handleFilter}>Filter <Icon name='right chevron' /></Button>
                  </Grid.Column>
                </Grid.Row>

                <hr />

                <Grid.Row>
                  <Grid.Column key={1}>
                    <Item.Group divided>
                      {this.state.currentDisplay.length > 0 ? this.state.currentDisplay.map(e => (
                        <VideoEntry e={e} key={e._id} />
                      )) : (
                        <p className='center-text'>Nothing matching those filters was found.</p>
                      )}
                    </Item.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        ) : (
            <div className='password-holder'>
              <Image src={logo} size='small' centered />
              {this.state.error ? (<p style={{color:'red'}}>Password is incorrect</p>) : ('')}
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