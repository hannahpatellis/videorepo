import React from 'react';
import { Container, Header, Grid, Button, Icon, Item, Dropdown, Image } from 'semantic-ui-react'
import VideoEntry from './components/VideoEntry';
const moment = require('moment');
const repo = require('./repo.json');
const classes = require('./classes.json');
const lessons = require('./lessons.json');
const subcategories = require('./subcategories.json');
const curricula = require('./curricula.json');
const logo = require('./videorepo.png');

class App extends React.Component {
  state = {
    repo: repo,
    subcategories: subcategories,
    lessons: lessons,
    classes: classes,
    curricula: curricula,
    selectedSubcategory: '',
    selectedLesson: '',
    selectedClass: '',
    selectedCurriculum: '',
    currentDisplay: repo,
    auth: false
  }

  handleChange = (e, data) => {
    this.setState({ [data.dataField]: data.value });
  }

  handleFilter = () => {
  }

  sortByDate = (toSort) => {
    let newRepo = toSort;
    newRepo.sort((a, b) => {
      const aDate = moment(a.date, 'YY-MM-DD').format('LL');
      const bDate = moment(b.date, 'YY-MM-DD').format('LL');
      return new Date(bDate) - new Date(aDate);
    });
    this.setState({ currentDisplay: newRepo });
  }

  componentDidMount() {
    this.sortByDate(this.state.currentDisplay);
  }

  render() {
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column key={1}>
                <Image src={logo} verticalAlign='center' size='small' centered />
                <Header as='h2' textAlign='center'>
                  <Header.Content>Hannah Patellis' Coding Video Library</Header.Content>
                </Header>
                <p className="center-text">This is the private video library of development instructor Hannah Patellis.<br />Videos in this library include in-class recordings and supplemental videos.</p>
              </Grid.Column>
            </Grid.Row>

            <hr />

            {/* <Grid.Row>
              <Grid.Column key={1}>
                <Header as='h4'>Filter results</Header>
                <Dropdown placeholder='Class' search selection options={this.state.classes} className='filter-option' dataField='selectedClass' onChange={this.handleChange} />
                <Dropdown placeholder='Lesson' search selection options={this.state.lessons} className='filter-option' dataField='selectedLesson' onChange={this.handleChange} />
                <Dropdown placeholder='Subcategory' search selection options={this.state.subcategories} className='filter-option' dataField='selectedSubcategory' onChange={this.handleChange} />
                <Dropdown placeholder='Curriculum' search selection options={this.state.curricula} className='filter-option' dataField='selectedCurriculum' onChange={this.handleChange} />
                <Button color='blue' floated='right' icon labelPosition='right'>Filter <Icon name='right chevron' /></Button>
              </Grid.Column>
            </Grid.Row>

            <hr /> */}

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
    );
  }
}

export default App;