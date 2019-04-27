import React from 'react';
import { Button, Icon, Item, Label } from 'semantic-ui-react'
const moment = require('moment');

const VideoEntry = (e) => {

  let curriculum = '';
  let host = '';

  switch (e.e.curriculum) {
    case 'FSF':
      curriculum = 'Full-Stack Flex';
      break;
    case 'FSF-FT':
      curriculum = 'Full-Stack Flex Full-Time';
      break;
    case 'ENT':
      curriculum = 'Full-Stack Flex Other';
      break;
    default:
      curriculum = 'Other';
  }

  switch (e.e.host) {
    case 'panopto':
      host = 'Panopto';
      break;
    case 'youtube':
      host = 'YouTube';
      break;
    default:
      host = '';
      break;
  }

  const parting = () => {
    if(e.e.parts) {
      let ret = e.e.parts.map((part, index) => {
        return (
            <a href={e.e.parts[index]} key={index}>
              <Button inverted color='blue' floated='right' icon labelPosition='right'>Part {index+2} <Icon name='right chevron' /></Button>
            </a>
        );
      });
      return (
        <span>
          {ret.reverse()}
          <a href={e.e.url}>
            <Button inverted color='blue' floated='right' icon labelPosition='right'>Part 1 {host === '' ? '' : `on ${host}`} <Icon name='right chevron' /></Button>
          </a>
        </span>
      );
    } else {
      return (
        <a href={e.e.url}>
          <Button inverted color='blue' floated='right' icon labelPosition='right'>Watch {host === '' ? '' : `on ${host}`} <Icon name='right chevron' /></Button>
        </a>
      );
    }
  }

  return (
    <Item>
      <Item.Content>
        <Item.Header as='a' href={e.e.url}>{e.e.name}</Item.Header>
        <Item.Meta>
          {e.e.unit === 0 ? (
            <span><Icon color='purple' name='map marker alternate' /> <span className="extra-note">Supplemental Video</span></span>
          ) : (
              <span><Icon color='purple' name='map marker alternate' /> <span className="extra-note">Unit {e.e.unit}, Lesson {e.e.lesson}</span></span>
          )}
          {e.e.class === 'GEN' ? (
            <span className='nopad'></span>
          ) : (
            <span><Icon color='purple' name='graduation cap' /> <span className="extra-note">{e.e.class}</span></span>
          )}
          {curriculum === 'Other' ? (
            <span className='nopad'></span>
          ) : (
            <span><Icon color='purple' name='book' /> <span className="extra-note">{curriculum}</span></span>
          )}
          <Icon color='purple' name='calendar alternate' /> <span className="extra-note">{moment(e.e.date, 'YY-MM-DD').format('MMMM Do, YYYY')}</span>
        </Item.Meta>
        <Item.Extra>
          {e.e.subcategory.map(subcategory => (
            <Label key={subcategory}>{subcategory}</Label>
          ))}
          {parting()}
        </Item.Extra>
      </Item.Content>
    </Item>
  )
};

export default VideoEntry;