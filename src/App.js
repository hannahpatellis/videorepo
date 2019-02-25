import React from 'react';
import { Container, Header, Grid, Button, Icon, Item, Dropdown } from 'semantic-ui-react'
import VideoEntry from './components/VideoEntry';
const moment = require('moment');
const repo = require('./repo.json');
const classes = require('./classes.json');
const lessons = require('./lessons.json');
const subcategories = require('./subcategories.json');

class App extends React.Component {
  state = {
    repo: repo,
    subcategories: subcategories,
    lessons: lessons,
    classes: classes
  }

  componentDidMount() {
    // let newRepo = this.state.repo;
    // newRepo.sort((a,b) => {
    //   const aDate = moment(a.date, 'YY-MM-DD').format('x');
    //   const bDate = moment(b.date, 'YY-MM-DD').format('x');
    //   return new Date(bDate) - new Date(aDate);
    // });
    // console.log(newRepo);
    // this.setState({ repo: newRepo });

  }


  render() {
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column key={1}>
                <Header as='h2' icon textAlign='center'>
                  <Icon name='lab' circular color='blue' />
                  <Header.Content>Hannah Patellis' Coding Video Library</Header.Content>
                </Header>
                <p className="center-text">This is the private video library of development instructor Hannah Patellis. Videos in this library include in-class recordings and supplemental videos.</p>
                <p className="center-text">This page is currently in development and one class is missing.</p>
                {/* <p className="center-text">You are currently viewing all videos in revere chronological order.</p> */}
              </Grid.Column>
            </Grid.Row>

            <hr />

            <Grid.Row>
              <Grid.Column key={1}>
              <Header as='h4'>Filter results</Header>
                <Dropdown placeholder='Class' search selection options={this.state.classes} className='filter-option' />
                <Dropdown placeholder='Lesson' search selection options={this.state.lessons} className='filter-option' />
                <Dropdown placeholder='Subcategory' search selection options={this.state.subcategories} className='filter-option' />
                <Button color='blue' floated='right' icon labelPosition='right'>Filter <Icon name='right chevron' /></Button>
              </Grid.Column>
            </Grid.Row>

            <hr />

            <Grid.Row>
              <Grid.Column key={1}>
                <Item.Group divided>
                  {this.state.repo.map(e => (
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